const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  allergies: [{
    type: String
  }],
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    status: {
      type: String,
      enum: ['active', 'resolved', 'chronic']
    },
    notes: String
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    }
  }],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  insurance: {
    provider: String,
    policyNumber: String,
    validUntil: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);
