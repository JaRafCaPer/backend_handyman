import Workfield from '../dao/models/workfield.mongo.model.js';

export const createWorkfield = async (workfieldData) => {
  const workfield = new Workfield(workfieldData);
  await workfield.save();
  return workfield;
};

export const updateWorkfield = async (workfieldId, updateData) => {
  const workfield = await Workfield.findByIdAndUpdate(workfieldId, updateData, { new: true, runValidators: true });
  if (!workfield) {
    throw new Error('Workfield not found');
  }
  return workfield;
};

export const deleteWorkfield = async (workfieldId) => {
  const workfield = await Workfield.findByIdAndDelete(workfieldId);
  if (!workfield) {
    throw new Error('Workfield not found');
  }
  return workfield;
};

export const getWorkfields = async () => {
  const workfields = await Workfield.find();
  return workfields;
};