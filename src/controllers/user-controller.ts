import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { UserEntity } from "../entities/user-entity";
import * as jwt from "jsonwebtoken";
import config from "../common/jwt-config";

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

      //Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
    
      //If all ok, send 201 response
      res.status(201).send({user: user, token: token});
    };
}
    
export default UserController;