const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/appointments
// @desc    Get all appointments (filtered by user role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (doctor) {
        query.doctorId = doctor._id;
      }
    }
    // Admin can see all appointments (no filter)

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'name email phone'
        }
      })
      .sort({ appointmentDate: -1 });

    res.json({ count: appointments.length, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'name email phone'
        }
      });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    const doctor = await Doctor.findOne({ userId: req.user._id });
    const isAuthorized = 
      appointment.patientId._id.toString() === req.user._id.toString() ||
      (doctor && appointment.doctorId._id.toString() === doctor._id.toString()) ||
      req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private (Patient)
router.post('/', auth, authorize('patient'), async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason, notes } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if time slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
      notes
    });

    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patientId', 'name email phone')
      .populate({
        path: 'doctorId',
        populate: {
          path: 'userId',
          select: 'name email phone'
        }
      });

    res.status(201).json({ 
      message: 'Appointment created successfully', 
      appointment: populatedAppointment 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    const doctor = await Doctor.findOne({ userId: req.user._id });
    const isAuthorized = 
      appointment.patientId.toString() === req.user._id.toString() ||
      (doctor && appointment.doctorId.toString() === doctor._id.toString()) ||
      req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    .populate('patientId', 'name email phone')
    .populate({
      path: 'doctorId',
      populate: {
        path: 'userId',
        select: 'name email phone'
      }
    });

    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel appointment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    const doctor = await Doctor.findOne({ userId: req.user._id });
    const isAuthorized = 
      appointment.patientId.toString() === req.user._id.toString() ||
      (doctor && appointment.doctorId.toString() === doctor._id.toString()) ||
      req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    // Update status to cancelled instead of deleting
    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
