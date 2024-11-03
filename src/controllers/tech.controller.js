import {
  registerTechnician as registerTechnicianService,
  loginTechnician as loginTechnicianService,
  updateTechnician as updateTechnicianService
} from '../services/tech.services.js';
import { RegisterTechnicianDTO, LoginTechnicianDTO, UpdateTechnicianDTO } from '../dto/tech.dto.js';

export const registerTechnician = async (req, res) => {
  try {
    const registerTechnicianDTO = new RegisterTechnicianDTO(req.body);
    const technician = await registerTechnicianService(registerTechnicianDTO);
    res.status(201).send(technician);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const loginTechnician = async (req, res) => {
  try {
    const loginTechnicianDTO = new LoginTechnicianDTO(req.body);
    const token = await loginTechnicianService(loginTechnicianDTO.email, loginTechnicianDTO.password);
    res.send({ token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export const updateTechnician = async (req, res) => {
  try {
    const updateTechnicianDTO = new UpdateTechnicianDTO(req.body);
    const technician = await updateTechnicianService(req.user.email, updateTechnicianDTO);
    res.send(technician);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};