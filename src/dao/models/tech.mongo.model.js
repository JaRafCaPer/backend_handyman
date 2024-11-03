import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const TechnicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['technician'],
    default: 'technician'
  },
  workfields: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workfield'
  }],
  notes: [{
    workOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkOrder'
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
    workOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkOrder'
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
  }
});

TechnicianSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

TechnicianSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Validate the maximum number of workfields
TechnicianSchema.path('workfields').validate(function (value) {
  return value.length <= 3;
}, 'A technician can have a maximum of 3 workfields.');

export default mongoose.model('Technician', TechnicianSchema);