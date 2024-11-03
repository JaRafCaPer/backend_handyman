import Technician from '../dao/models/tech.mongo.model.js';
import jwt from 'jsonwebtoken';

export const registerTechnician = async (technicianData) => {
  if (technicianData.workfields && technicianData.workfields.length > 3) {
    throw new Error('A technician can have a maximum of 3 workfields.');
  }

  const existingTechnician = await Technician.findOne({ email: technicianData.email });
  if (existingTechnician) {
    throw new Error('Technician already exists');
  }
  const technician = new Technician(technicianData);
  await technician.save();
  return technician;
};

export const updateTechnician = async (email, updateData) => {
  if (updateData.workfields && updateData.workfields.length > 3) {
    throw new Error('A technician can have a maximum of 3 workfields.');
  }

  const technician = await Technician.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
  if (!technician) {
    throw new Error('Technician not found');
  }
  return technician;
};

export const loginTechnician = async (email, password) => {
  const technician = await Technician.findOne({ email });
  if (!technician || !(await technician.isValidPassword(password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ _id: technician._id, role: 'technician' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};