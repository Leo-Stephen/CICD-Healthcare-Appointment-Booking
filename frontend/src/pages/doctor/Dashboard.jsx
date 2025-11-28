import { useState, useEffect } from 'react';
import { doctorAPI } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { useWebSocket } from '../../hooks/useWebSocket';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Activity,
  Users,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, pending: 0, today: 0 });

  useWebSocket();

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    try {
      const response = await doctorAPI.getAppointments(filter === 'all' ? null : filter);
      setAppointments(response.data);

      // Calculate stats
      const pending = response.data.filter(a => a.status === 'PENDING').length;
      const today = response.data.filter(a =>
        a.appointmentDate === new Date().toISOString().split('T')[0]
      ).length;
      setStats({ total: response.data.length, pending, today });
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await doctorAPI.approveAppointment(id);
      toast.success('Appointment approved!');
      loadAppointments();
    } catch (error) {
      toast.error('Failed to approve appointment');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this appointment?')) return;

    try {
      await doctorAPI.rejectAppointment(id);
      toast.success('Appointment rejected');
      loadAppointments();
    } catch (error) {
      toast.error('Failed to reject appointment');
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
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Doctor Dashboard</h1>
              <p className="text-secondary-500 dark:text-secondary-400 mt-1">Manage your schedule and patient appointments.</p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex items-center gap-2 text-green-700 dark:text-green-300">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Status: Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-600 text-white shadow-lg shadow-medical-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medical-100 font-medium mb-1">Total Appointments</p>
                  <h3 className="text-3xl font-bold">{stats.total}</h3>
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
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-yellow-100 font-medium mb-1">Pending Requests</p>
                  <h3 className="text-3xl font-bold">{stats.pending}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 font-medium mb-1">Today's Schedule</p>
                  <h3 className="text-3xl font-bold">{stats.today}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'today'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${filter === f
                  ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/30'
                  : 'bg-white dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 border border-secondary-200 dark:border-secondary-700'
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {appointments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-16 bg-white dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700 border-dashed"
              >
                <Calendar className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                <p className="text-lg text-secondary-500 font-medium">No appointments found</p>
                <p className="text-secondary-400">Try changing the filter or check back later</p>
              </motion.div>
            ) : (
              appointments.map((appointment, idx) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-secondary-800 rounded-2xl p-6 border border-secondary-100 dark:border-secondary-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-300 font-bold text-lg">
                        {appointment.patient.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-secondary-900 dark:text-white">{appointment.patient.fullName}</h3>
                        <p className="text-sm text-secondary-500">{appointment.patient.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary-50 dark:bg-secondary-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-secondary-800 rounded-lg text-medical-600 dark:text-medical-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Date</p>
                        <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                          {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-secondary-800 rounded-lg text-medical-600 dark:text-medical-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Time</p>
                        <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                          {appointment.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {appointment.reason && (
                    <div className="mb-6">
                      <p className="text-xs text-secondary-500 mb-1 uppercase tracking-wider font-bold">Reason for Visit</p>
                      <p className="text-sm text-secondary-700 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-900/30 p-3 rounded-lg border border-secondary-100 dark:border-secondary-800">
                        {appointment.reason}
                      </p>
                    </div>
                  )}

                  {appointment.status === 'PENDING' && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-green-500/20"
                        onClick={() => handleApprove(appointment.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 dark:bg-secondary-800 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20 shadow-none"
                        onClick={() => handleReject(appointment.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
