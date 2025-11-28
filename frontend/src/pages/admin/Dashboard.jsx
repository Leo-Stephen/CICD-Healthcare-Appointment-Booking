import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';
import {
  Users,
  UserPlus,
  Trash2,
  BarChart3,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    qualification: '',
    experienceYears: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
    loadUsers();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminAPI.createDoctor(newDoctor);
      toast.success('Doctor added successfully!');
      setIsAddModalOpen(false);
      setNewDoctor({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        specialization: '',
        qualification: '',
        experienceYears: '',
      });
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await adminAPI.deleteUser(id);
      toast.success('User deleted');
      loadUsers();
      loadAnalytics();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 pb-12">
      {/* Top Stats Bar */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 pt-24 pb-8 mb-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-secondary-500 dark:text-secondary-400 mt-1">System overview and user management.</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="mt-4 md:mt-0 flex items-center gap-2 shadow-lg shadow-medical-500/20">
              <UserPlus className="h-5 w-5" />
              Add New Doctor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 font-medium mb-1">Total Patients</p>
                  <h3 className="text-3xl font-bold">{analytics.totalPatients || 0}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
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
                  <p className="text-purple-100 font-medium mb-1">Total Doctors</p>
                  <h3 className="text-3xl font-bold">{analytics.totalDoctors || 0}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Stethoscope className="w-6 h-6 text-white" />
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
                  <p className="text-medical-100 font-medium mb-1">Total Appointments</p>
                  <h3 className="text-3xl font-bold">{analytics.totalAppointments || 0}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 flex items-center justify-between"
            >
              <div>
                <p className="text-secondary-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.pendingAppointments || 0}</p>
              </div>
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600">
                <Clock className="w-5 h-5" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 flex items-center justify-between"
            >
              <div>
                <p className="text-secondary-500 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.approvedAppointments || 0}</p>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 flex items-center justify-between"
            >
              <div>
                <p className="text-secondary-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600">{analytics.completedAppointments || 0}</p>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Users Table */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-medical-500" />
              All Users
            </h2>
            <span className="text-sm text-secondary-500 bg-secondary-100 dark:bg-secondary-700 px-3 py-1 rounded-full">
              {users.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 dark:bg-secondary-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-secondary-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-300 font-bold text-xs">
                          {user.fullName.charAt(0)}
                        </div>
                        <span className="font-medium text-secondary-900 dark:text-white">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'DOCTOR' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' :
                          user.role === 'PATIENT' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                            'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.isActive ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                        }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {user.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-secondary-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center gap-3 mb-4">
            <div className="p-2 bg-white dark:bg-secondary-800 rounded-lg text-blue-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-secondary-900 dark:text-white">Create Doctor Account</p>
              <p className="text-xs text-secondary-500">Enter the details below to register a new specialist.</p>
            </div>
          </div>

          <Input
            label="Full Name"
            value={newDoctor.fullName}
            onChange={(e) => setNewDoctor({ ...newDoctor, fullName: e.target.value })}
            required
            placeholder="Dr. John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            required
            placeholder="doctor@hospital.com"
          />
          <Input
            label="Password"
            type="password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
            required
            placeholder="••••••••"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              value={newDoctor.phone}
              onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
            <Input
              label="Experience (years)"
              type="number"
              value={newDoctor.experienceYears}
              onChange={(e) => setNewDoctor({ ...newDoctor, experienceYears: e.target.value })}
              placeholder="e.g. 10"
            />
          </div>

          <Input
            label="Specialization"
            value={newDoctor.specialization}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
            required
            placeholder="e.g. Cardiology"
          />
          <Input
            label="Qualification"
            value={newDoctor.qualification}
            onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
            placeholder="e.g. MBBS, MD"
          />

          <div className="flex space-x-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" loading={loading}>
              Create Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
