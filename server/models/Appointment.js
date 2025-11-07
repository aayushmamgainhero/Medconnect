const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please provide appointment date']
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    required: [true, 'Please provide reason for appointment']
  },
  notes: {
    type: String
  },
  prescription: {
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String
    }],
    instructions: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
