const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialty, minRating } = req.query;
    
    let query = {};
    if (specialty) {
      query.specialty = new RegExp(specialty, 'i');
    }
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone')
      .sort({ rating: -1 });

    res.json({ count: doctors.length, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone gender address');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/doctors/specialty/:specialty
// @desc    Get doctors by specialty
// @access  Public
router.get('/specialty/:specialty', async (req, res) => {
  try {
    const doctors = await Doctor.find({ 
      specialty: new RegExp(req.params.specialty, 'i') 
    }).populate('userId', 'name email phone');

    res.json({ count: doctors.length, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/doctors
// @desc    Create doctor profile
// @access  Private (Doctor/Admin)
router.post('/', auth, authorize('doctor', 'admin'), async (req, res) => {
  try {
    const {
      specialty,
      qualifications,
      experience,
      licenseNumber,
      consultationFee,
      availability,
      bio
    } = req.body;

    // Check if doctor profile already exists
    let doctor = await Doctor.findOne({ userId: req.user._id });
    if (doctor) {
      return res.status(400).json({ message: 'Doctor profile already exists' });
    }

    doctor = new Doctor({
      userId: req.user._id,
      specialty,
      qualifications,
      experience,
      licenseNumber,
      consultationFee,
      availability,
      bio
    });

    await doctor.save();

    res.status(201).json({ message: 'Doctor profile created successfully', doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/doctors/:id
// @desc    Update doctor profile
// @access  Private (Doctor/Admin)
router.put('/:id', auth, authorize('doctor', 'admin'), async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the user is the owner or admin
    if (doctor.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Doctor profile updated successfully', doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
