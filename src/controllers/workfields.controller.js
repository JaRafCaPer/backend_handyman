import {
    createWorkfield as createWorkfieldService,
    updateWorkfield as updateWorkfieldService,
    deleteWorkfield as deleteWorkfieldService,
    getWorkfields as getWorkfieldsService
  } from '../services/workfield.services.js';
  
  export const createWorkfield = async (req, res) => {
    try {
        console.log("workfield to create", req.body);
      const workfield = await createWorkfieldService(req.body);
      res.status(201).send(workfield);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const updateWorkfield = async (req, res) => {
    try {
      const workfield = await updateWorkfieldService(req.params.id, req.body);
      res.send(workfield);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const deleteWorkfield = async (req, res) => {
    try {
      const workfield = await deleteWorkfieldService(req.params.id);
      res.send(workfield);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  export const getWorkfields = async (req, res) => {
    try {
      const workfields = await getWorkfieldsService();
      res.send(workfields);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };