import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService,
    getUserProfile as getUserProfileService
  } from '../services/user.services.js';
  import { RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from '../dto/user.dto.js';
  
  export const registerUser = async (req, res) => {
    try {
      const registerUserDTO = new RegisterUserDTO(req.body);
      const user = await registerUserService(registerUserDTO);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const loginUser = async (req, res) => {
    try {
      const loginUserDTO = new LoginUserDTO(req.body);
      const token = await loginUserService(loginUserDTO.email, loginUserDTO.password);
      res.send({ token });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  };
  
  export const updateUser = async (req, res) => {
    try {
      const updateUserDTO = new UpdateUserDTO(req.body);
      const user = await updateUserService(req.user.email, updateUserDTO);
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const user = await deleteUserService(req.user.email);
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const getUserProfile = async (req, res) => {
    try {
      const user = await getUserProfileService(req.user.email);
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };