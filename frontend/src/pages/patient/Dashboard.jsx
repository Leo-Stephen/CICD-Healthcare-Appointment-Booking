import { useState, useEffect } from 'react';
import { patientAPI } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useWebSocket } from '../../hooks/useWebSocket';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  User,
  X,
  Search,
  Filter,
  MapPin,
  Star,
  Activity,
  CalendarCheck,
  Stethoscope
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);

  useWebSocket();

  useEffect(() => {
    loadDoctors();
    loadSpecializations();
    loadAppointments();
  }, [selectedSpecialization]);

  const loadDoctors = async () => {
    try {
      const response = await patientAPI.getDoctors(selectedSpecialization);
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  const loadSpecializations = async () => {
    try {
      const response = await patientAPI.getSpecializations();
      setSpecializations(response.data);
    } catch (error) {
      console.error('Failed to load specializations:', error);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await patientAPI.getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await patientAPI.bookAppointment({
        doctorId: selectedDoctor.id,
        ...bookingData,
      });
      toast.success('Appointment request sent!');
      setIsBookingModalOpen(false);
      setBookingData({ appointmentDate: '', appointmentTime: '', reason: '' });
      loadAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await patientAPI.cancelAppointment(id);
      toast.success('Appointment cancelled');
      loadAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 pb-12">
      {/* Top Stats Bar */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 pt-24 pb-8 mb-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Patient Dashboard</h1>
              <p className="text-secondary-500 dark:text-secondary-400 mt-1">Welcome back! Manage your health journey.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <div className="px-4 py-2 bg-medical-50 dark:bg-medical-900/20 rounded-lg border border-medical-100 dark:border-medical-800 flex items-center gap-2 text-medical-700 dark:text-medical-300">
                <Activity className="w-4 h-4" />
                <span className="font-medium">Health Score: 98%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 font-medium mb-1">Total Appointments</p>
                  <h3 className="text-3xl font-bold">{appointments.length}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CalendarCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 font-medium mb-1">Upcoming</p>
                  <h3 className="text-3xl font-bold">
                    {appointments.filter(a => a.status === 'APPROVED' || a.status === 'PENDING').length}
                  </h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-600 text-white shadow-lg shadow-medical-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medical-100 font-medium mb-1">Available Doctors</p>
                  <h3 className="text-3xl font-bold">{doctors.length}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Browse Doctors */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-medical-500" />
                Find a Doctor
              </h2>
              <div className="relative">
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="pl-10 pr-8 py-2 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm focus:ring-2 focus:ring-medical-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">All Specialists</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <Filter className="w-4 h-4 text-secondary-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence>
                {doctors.map((doctor, idx) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-secondary-800 rounded-2xl p-5 border border-secondary-100 dark:border-secondary-700 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-medical-100 to-medical-200 dark:from-medical-900 dark:to-medical-800 flex items-center justify-center text-medical-700 dark:text-medical-300 font-bold text-xl group-hover:scale-110 transition-transform">
                        {doctor.user.fullName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-secondary-900 dark:text-white truncate">{doctor.user.fullName}</h3>
                        <p className="text-sm text-medical-600 dark:text-medical-400 font-medium">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-secondary-500">4.9 (120 reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-secondary-500">Experience</p>
                        <p className="text-sm font-semibold text-secondary-900 dark:text-white">{doctor.experienceYears} Years</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Consultation</p>
                        <p className="text-sm font-semibold text-secondary-900 dark:text-white">${doctor.consultationFee}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleBookAppointment(doctor)}
                      className="w-full mt-4 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 hover:bg-secondary-800 dark:hover:bg-secondary-100"
                    >
                      Book Appointment
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Appointments */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-medical-500" />
              Your Schedule
            </h2>

            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700 border-dashed">
                  <Calendar className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-500">No appointments yet</p>
                  <p className="text-xs text-secondary-400">Book your first visit!</p>
                </div>
              ) : (
                appointments.map((appointment, idx) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-secondary-800 p-4 rounded-2xl border border-secondary-100 dark:border-secondary-700 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-secondary-900 dark:text-white text-sm">{appointment.doctor.user.fullName}</h4>
                        <p className="text-xs text-secondary-500">{appointment.doctor.specialization}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-secondary-600 dark:text-secondary-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-secondary-600 dark:text-secondary-400">
                        <Clock className="w-3.5 h-3.5" />
                        {appointment.appointmentTime}
                      </div>
                    </div>

                    {(appointment.status === 'PENDING' || appointment.status === 'APPROVED') && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="w-full py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Cancel Visit
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} title="Book Appointment">
        {selectedDoctor && (
          <form onSubmit={submitBooking} className="space-y-5">
            <div className="p-4 bg-medical-50 dark:bg-medical-900/20 rounded-xl border border-medical-100 dark:border-medical-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-secondary-800 flex items-center justify-center text-medical-600 font-bold text-lg shadow-sm">
                {selectedDoctor.user.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-secondary-900 dark:text-white">{selectedDoctor.user.fullName}</p>
                <p className="text-sm text-medical-600 dark:text-medical-400">{selectedDoctor.specialization}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={bookingData.appointmentDate}
                onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                required
              />
              <Input
                label="Time"
                type="time"
                value={bookingData.appointmentTime}
                onChange={(e) => setBookingData({ ...bookingData, appointmentTime: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Reason for visit</label>
              <textarea
                className="input min-h-[100px] resize-none"
                value={bookingData.reason}
                onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                placeholder="Describe your symptoms..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setIsBookingModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" loading={loading}>
                Confirm Booking
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
