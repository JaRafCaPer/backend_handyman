export class CreateWorkOrderDTO {
  constructor({ description, userId, technicianId, workfieldId, location, expectedCompletionDate, specialInstructions }) {
    this.description = description;
    this.userId = userId;
    this.technicianId = technicianId;
    this.workfieldId = workfieldId;
    this.location = location;
    this.expectedCompletionDate = expectedCompletionDate;
    this.specialInstructions = specialInstructions;
  }
}
export class AssignWorkOrderDTO {
  constructor({ technicianId, eta }) {
    this.technicianId = technicianId;
    this.eta = eta;
  }
}
export class UpdateWorkOrderStatusDTO {
  constructor({ status, notes, photos }) {
    this.status = status;
    this.notes = notes;
    this.photos = photos;
  }
}