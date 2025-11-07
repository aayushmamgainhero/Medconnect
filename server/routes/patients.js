const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.id })
      .populate('userId', 'name email phone gender dateOfBirth address')
      .populate('medications.prescribedBy', 'specialty');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check authorization
    if (req.user._id.toString() !== req.params.id && 
        req.user.role !== 'doctor' && 
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this profile' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/patients/:id
// @desc    Update patient profile
// @access  Private (Patient/Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    let patient = await Patient.findOne({ userId: req.params.id });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check authorization
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    patient = await Patient.findOneAndUpdate(
      { userId: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Patient profile updated successfully', patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/patients/:id/history
// @desc    Get patient medical history
// @access  Private (Patient/Doctor/Admin)
router.get('/:id/history', auth, authorize('patient', 'doctor', 'admin'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.id })
      .select('medicalHistory medications allergies bloodGroup')
      .populate('medications.prescribedBy', 'specialty userId');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
