import WorkOrder from '../dao/models/workOrder.mongo.model.js';
import Technician from '../dao/models/tech.mongo.model.js';
import User from '../dao/models/user.mongo.models.js';

export const createWorkOrder = async (workOrderData) => {
  const workOrder = new WorkOrder(workOrderData);
  await workOrder.save();
  return workOrder;
};

export const assignWorkOrder = async (workOrderId, technicianId, eta) => {
  const workOrder = await WorkOrder.findById(workOrderId);
  if (!workOrder) {
    throw new Error('Work Order not found');
  }

  const technician = await Technician.findById(technicianId);
  if (!technician) {
    throw new Error('Technician not found');
  }

  // Check if the work order is already assigned
  if (workOrder.technicianId) {
    if (workOrder.technicianId.toString() === technicianId.toString()) {
      throw new Error('You cannot assign the same order again to yourself.');
    } else {
      throw new Error('This work order is already taken.');
    }
  }

  // Check if the technician has the same workfield as the work order
  if (!technician.workfields.includes(workOrder.workfieldId)) {
    throw new Error('Technician does not have the required workfield');
  }

  // Check if the technician is in the same location as the work order
  if (technician.location !== workOrder.location) {
    throw new Error('Technician is not in the same location as the work order');
  }

  workOrder.technicianId = technicianId;
  workOrder.status = 'assigned';
  workOrder.eta = eta;
  await workOrder.save();
  return workOrder;
};

export const updateWorkOrderStatus = async (workOrderId, status, technicianId, notes, photos) => {
  const workOrder = await WorkOrder.findById(workOrderId);
  if (!workOrder) {
    throw new Error('Work Order not found');
  }

  if (workOrder.technicianId && workOrder.technicianId.toString() !== technicianId.toString()) {
    throw new Error('Technician not authorized to update this Work Order');
  }

  const validStatusTransitions = {
    'assigned': 'dispatched',
    'dispatched': 'on site',
    'on site': 'completed'
  };

  if (validStatusTransitions[workOrder.status] !== status) {
    throw new Error(`Invalid status transition from ${workOrder.status} to ${status}`);
  }

  workOrder.status = status;
  if (notes) workOrder.notes = notes;
  if (photos) workOrder.photos = photos;
  await workOrder.save();
  return workOrder;
};

export const getWorkOrdersByUser = async (userId) => {
  const workOrders = await WorkOrder.find({ userId });
  return workOrders;
};

export const getWorkOrdersByTechnician = async (technicianId) => {
  const workOrders = await WorkOrder.find({ technicianId });
  return workOrders;
};