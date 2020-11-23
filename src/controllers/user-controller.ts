import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { UserEntity } from "../entities/user-entity";
 
class UserController{

    static newUser = async (req: Request, res: Response) => {
      //Get parameters from the body

      let { firstname, lastname, email, password, role } = req.body;
      let user = new UserEntity();
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.password = password;
      user.role = role;

      //Validade if the parameters are ok
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
    
      //Try to save. If fails, the email is already in use
      const userRepository = getRepository(UserEntity);
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
    
      //If all ok, send 201 response
      res.status(200).send({user: user});
    };
}
    
export default UserController;