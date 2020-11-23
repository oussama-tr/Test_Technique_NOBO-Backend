import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { UserEntity } from "../entities/user-entity";
import config from "../common/jwt-config";

class AuthController {
    static login = async (req: Request, res: Response) => {
      //Check if email and password are set
      let { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send();
      }
      //Get user from database
      const userRepository = getRepository(UserEntity);
      let user: UserEntity;
      try {
        user = await userRepository.findOneOrFail({ where: { email }});
      } catch (error) {
        res.status(404).send();
      }
  
      //Check if encrypted password match
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(404).send();
        return;
      }
  
      //Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );
  
      //Send the jwt in the response
      res.send({user: user, token: token});
    };
  }
  export default AuthController;