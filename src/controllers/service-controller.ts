import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserEntity } from "../entities/user-entity";
import { ServiceEntity } from "../entities/service-entity";
import { AddressEntity } from "../entities/address-entity";
import { RatingEntity } from "../entities/rating-entity";


class ServiceController{

    static newService = async (req: Request, res: Response) => {
      
      let { providerId, street, zipcode, city, country } = req.body;

      const userRepository = getRepository(UserEntity);
    
      let provider;
      try { provider = await userRepository.findOneOrFail(providerId);} catch (error) { res.status(404).send("Provider not found"); return }
      
      let address = new AddressEntity();

      address.street = street;
      address.zipcode = zipcode;
      address.city = city;
      address.country = country;

      const addressRepository = getRepository(AddressEntity);

      try {
        await addressRepository.save(address);
      } catch (e) {
        res.status(409).send(e);
        return;
      }

      let service = new ServiceEntity();
      service.provider = provider; 
      service.address = address;

      const serviceRepository = getRepository(ServiceEntity);

      try {
        await serviceRepository.save(service);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
    
      res.status(201).send();
    };

    static getAllServices = async (req: Request, res: Response) => {
      
      const serviceRepository = getRepository(ServiceEntity);

      try{
      let services = await serviceRepository.find({ relations: ['ratings', 'address', 'customers', 'provider'] });
      res.send(services);
      }
      catch(error)
      {
        res.status(404).send();
        return;
      }    
    };

    static rateService = async (req: Request, res: Response) => {

      let { serviceId, customerId, category, rating } = req.body;
      
      let service: ServiceEntity;
      const serviceRepository = getRepository(ServiceEntity);

      try { service = await serviceRepository.findOneOrFail(serviceId, 
        { relations: ['ratings'] });} catch (error) { res.status(404).send("Service not found"); return }

      const userRepository = getRepository(UserEntity);
    
      let customer;
      try { customer = await userRepository.findOneOrFail(customerId);} catch (error) { res.status(404).send("Customer not found"); return }
      
      let newRating = new RatingEntity();

      newRating.category = category;
      newRating.rating = rating;
      newRating.customer = customer;
      newRating.service = service;

      const RatingRepository = getRepository(RatingEntity);

      try {
        await RatingRepository.save(newRating);
      } catch (e) {
        res.status(409).send(e);
        return;
      }

      service.ratings.push(newRating);

      try {
        await serviceRepository.save(service);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
    
      res.status(201).send();
    };
}
    
export default ServiceController;