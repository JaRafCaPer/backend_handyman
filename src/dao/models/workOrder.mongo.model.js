import mongoose from 'mongoose';

const WorkOrderSchema = new mongoose.Schema({
  workOrderNumber: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: false
  },
  workfieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workfield',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Not assigned', 'assigned', 'dispatched', 'on site', 'completed'],
    default: 'Not assigned'
  },
  expectedCompletionDate: {
    type: Date,
    required: true
  },
  specialInstructions: {
    type: String,
    required: false
  },
  eta: {
    type: Date,
    required: false
  },
  notes: [{
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technician'
    },
    note: {
      type: String,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  photos: [{
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technician'
    },
    photoUrl: {
      type: String,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

WorkOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('WorkOrder', WorkOrderSchema);