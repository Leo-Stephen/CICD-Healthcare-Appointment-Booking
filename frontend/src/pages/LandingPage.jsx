import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  Clock,
  Shield,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Star,
  HeartPulse
} from 'lucide-react';

export const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 overflow-hidden">
      {/* Navbar Placeholder (if not global) */}

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-medical-400/20 blur-[100px] animate-float" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-medical-600/10 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-50 dark:bg-medical-900/30 border border-medical-100 dark:border-medical-800 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-medical-500"></span>
                </span>
                <span className="text-sm font-medium text-medical-700 dark:text-medical-300">
                  #1 Healthcare Management Platform
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold tracking-tight text-secondary-900 dark:text-white mb-6 leading-[1.1]">
                Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-medical-400">Reimagined</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-secondary-600 dark:text-secondary-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the future of medical care. Book appointments with top specialists, manage your health records, and get instant consultations—all in one secure platform.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="btn btn-primary text-lg px-8 py-4 shadow-medical-500/25 hover:shadow-medical-500/40">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/login" className="btn btn-secondary text-lg px-8 py-4">
                  Sign In
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-secondary-950 bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center text-xs font-bold">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-secondary-950 bg-medical-50 dark:bg-medical-900 flex items-center justify-center text-xs font-bold text-medical-600 dark:text-medical-400">
                    +2k
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Trusted by <span className="font-bold text-secondary-900 dark:text-white">2,000+</span> patients
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white dark:bg-secondary-800 rounded-3xl shadow-2xl shadow-medical-500/20 p-6 border border-secondary-100 dark:border-secondary-700 max-w-md mx-auto rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                {/* Mock UI Card */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-medical-100 dark:bg-medical-900/50 flex items-center justify-center text-medical-600 dark:text-medical-400">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-secondary-500">Cardiologist • Top Rated</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold">
                      Available
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-secondary-100 dark:bg-secondary-700 rounded-full" />
                  <div className="h-2 w-1/2 bg-secondary-100 dark:bg-secondary-700 rounded-full" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-secondary-50 dark:bg-secondary-900/50 text-center">
                    <p className="text-xs text-secondary-500 mb-1">Patients</p>
                    <p className="font-bold text-lg">1.2k+</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary-50 dark:bg-secondary-900/50 text-center">
                    <p className="text-xs text-secondary-500 mb-1">Experience</p>
                    <p className="font-bold text-lg">15 Yrs</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full btn btn-primary py-2 text-sm">Book Appointment</button>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-10 bg-white dark:bg-secondary-800 p-4 rounded-2xl shadow-xl border border-secondary-100 dark:border-secondary-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">100% Secure</p>
                    <p className="text-[10px] text-secondary-500">HIPAA Compliant</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-white dark:bg-secondary-800 p-4 rounded-2xl shadow-xl border border-secondary-100 dark:border-secondary-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">4.9/5 Rating</p>
                    <p className="text-[10px] text-secondary-500">From 500+ Reviews</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-secondary-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HealthCare?</h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              We combine advanced technology with compassionate care to provide the best medical experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: '24/7 Availability',
                desc: 'Book appointments anytime, anywhere. Our digital doors are always open.',
                color: 'text-blue-500',
                bg: 'bg-blue-50 dark:bg-blue-900/20'
              },
              {
                icon: Users,
                title: 'Expert Doctors',
                desc: 'Access a network of board-certified specialists from top medical institutions.',
                color: 'text-purple-500',
                bg: 'bg-purple-50 dark:bg-purple-900/20'
              },
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                desc: 'AI-powered scheduling system that finds the perfect slot for your needs.',
                color: 'text-orange-500',
                bg: 'bg-orange-50 dark:bg-orange-900/20'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                desc: 'Bank-grade encryption ensures your medical records remain confidential.',
                color: 'text-green-500',
                bg: 'bg-green-50 dark:bg-green-900/20'
              },
              {
                icon: Activity,
                title: 'Health Tracking',
                desc: 'Monitor your vitals and health progress with intuitive analytics dashboards.',
                color: 'text-red-500',
                bg: 'bg-red-50 dark:bg-red-900/20'
              },
              {
                icon: CheckCircle2,
                title: 'Instant Results',
                desc: 'Get your lab reports and prescriptions delivered digitally instantly.',
                color: 'text-teal-500',
                bg: 'bg-teal-50 dark:bg-teal-900/20'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-secondary-50 dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 hover:shadow-xl hover:shadow-medical-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-medical-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Patients', value: '10k+' },
              { label: 'Expert Doctors', value: '500+' },
              { label: 'Consultations', value: '50k+' },
              { label: 'Patient Satisfaction', value: '99%' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
                <p className="text-medical-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-custom">
          <div className="relative rounded-[2.5rem] bg-secondary-900 dark:bg-medical-900 overflow-hidden px-6 py-20 text-center">
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-medical-500/20 blur-[120px]" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Health?
              </h2>
              <p className="text-xl text-secondary-300 mb-10">
                Join thousands of satisfied patients who have taken control of their healthcare journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn bg-white text-secondary-900 hover:bg-secondary-100 px-8 py-4 text-lg shadow-xl">
                  Create Free Account
                </Link>
                <Link to="/login" className="btn bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 pt-16 pb-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-medical-600 flex items-center justify-center text-white font-bold">
                  H
                </div>
                <span className="text-xl font-bold">HealthCare</span>
              </div>
              <p className="text-secondary-600 dark:text-secondary-400 max-w-sm">
                Making healthcare accessible, secure, and efficient for everyone. Connect with top doctors and manage your health journey with ease.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-secondary-600 dark:text-secondary-400">
                <li><Link to="#" className="hover:text-medical-600">Find Doctors</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Book Appointment</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Consultations</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Health Records</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-secondary-600 dark:text-secondary-400">
                <li><Link to="#" className="hover:text-medical-600">About Us</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Careers</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-medical-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-200 dark:border-secondary-800 pt-8 text-center text-secondary-500 text-sm">
            © 2024 HealthCare Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
