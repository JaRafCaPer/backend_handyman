import {
  assignWorkOrder as assignWorkOrderService,
  updateWorkOrderStatus as updateWorkOrderStatusService,
  getWorkOrdersByUser as getWorkOrdersByUserService,
  getWorkOrdersByTechnician as getWorkOrdersByTechnicianService,
  createWorkOrder as createWorkOrderService
} from '../services/workOrder.services.js';
import { AssignWorkOrderDTO, UpdateWorkOrderStatusDTO, CreateWorkOrderDTO } from '../dto/workOrder.dto.js';

export const createWorkOrder = async (req, res) => {
  try {
    const createWorkOrderDTO = new CreateWorkOrderDTO(req.body);
    const workOrderData = {
      ...createWorkOrderDTO,
      userId: req.user._id,
      workOrderNumber: `WO-${Date.now()}`
    };
    const workOrder = await createWorkOrderService(workOrderData);
    res.status(201).send(workOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const assignWorkOrder = async (req, res) => {
  try {
    const assignWorkOrderDTO = new AssignWorkOrderDTO(req.body);
    const workOrder = await assignWorkOrderService(req.params.id, assignWorkOrderDTO.technicianId, assignWorkOrderDTO.eta);
    res.send(workOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const updateWorkOrderStatus = async (req, res) => {
  try {
    const updateWorkOrderStatusDTO = new UpdateWorkOrderStatusDTO(req.body);
    const workOrder = await updateWorkOrderStatusService(req.params.id, updateWorkOrderStatusDTO.status, req.user._id, updateWorkOrderStatusDTO.notes, updateWorkOrderStatusDTO.photos);
    res.send(workOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getWorkOrdersByUser = async (req, res) => {
  try {
    const workOrders = await getWorkOrdersByUserService(req.user._id);
    res.send(workOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getWorkOrdersByTechnician = async (req, res) => {
  try {
    const workOrders = await getWorkOrdersByTechnicianService(req.user._id);
    res.send(workOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};