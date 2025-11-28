import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(formData);
      toast.success(`Welcome back, ${user.fullName}!`);

      // Navigate based on role
      switch (user.role) {
        case 'PATIENT':
          navigate('/patient/dashboard');
          break;
        case 'DOCTOR':
          navigate('/doctor/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-50 via-white to-medical-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="glass-panel p-8 rounded-2xl animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-medical-600 dark:text-medical-400 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p><strong>Patient:</strong> john.doe@email.com / patient123</p>
              <p><strong>Doctor:</strong> dr.sarah.johnson@healthcare.com / doctor123</p>
              <p><strong>Admin:</strong> admin@healthcare.com / admin123</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-medical-600 dark:hover:text-medical-400">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
