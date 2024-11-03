import {
    registerUser as registerUserService
  } from '../services/user.services.js';
  import { RegisterUserDTO } from '../dto/user.dto.js';
  
  export const registerAdmin = async (req, res) => {
    try {
      const registerUserDTO = new RegisterUserDTO({ ...req.body, role: 'admin' });
      const user = await registerUserService(registerUserDTO);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };