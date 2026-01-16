import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    agreeToTerms: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
    { id: 1, title: 'Account', icon: '👤' },
    { id: 2, title: 'Company', icon: '🏢' },
    { id: 3, title: 'Verify', icon: '✅' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        phone: '',
        agreeToTerms: false,
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section style={getSectionStyle(windowWidth)}>
      {/* Animated Background */}
      <div style={backgroundContainer}>
        <motion.div
          style={animatedCircle1}
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={animatedCircle2}
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={animatedCircle3}
          animate={{
            x: [0, 150, 0],
            y: [0, -150, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div style={contentContainer}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={header}
        >
          <Link to="/" style={logoLink}>
            <motion.div
              style={logo}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              ⚡
            </motion.div>
            <h1 style={logoText}>Nexoris</h1>
          </Link>
          <h2 style={title}>Create Your Account</h2>
          <p style={subtitle}>Join thousands of companies transforming their business</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          style={stepsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {steps.map((step, index) => (
            <div key={step.id} style={stepItem}>
              <motion.div
                style={{
                  ...stepCircle,
                  ...(currentStep >= step.id ? activeStepCircle : {}),
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span style={stepIcon}>{step.icon}</span>
              </motion.div>
              <span style={stepTitle}>{step.title}</span>
              {index < steps.length - 1 && (
                <motion.div
                  style={stepLine}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: currentStep > step.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          style={formContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={successMessage}
              >
                <motion.div
                  style={successIcon}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 1 }}
                >
                  ✓
                </motion.div>
                <h3 style={successTitle}>Account Created Successfully!</h3>
                <p style={successText}>
                  Welcome to Nexoris! Check your email to verify your account.
                </p>
                <Link to="/">
                  <motion.button
                    style={successButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key={currentStep}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                style={form}
              >
                {currentStep === 1 && (
                  <>
                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Full Name</label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={input}
                        required
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Email Address</label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        style={input}
                        required
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Password</label>
                      <motion.input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        style={input}
                        required
                        minLength={8}
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Confirm Password</label>
                      <motion.input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        style={input}
                        required
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={handleNext}
                      style={nextButton}
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 245, 212, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue
                      <span style={arrow}>→</span>
                    </motion.button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Company Name</label>
                      <motion.input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                        style={input}
                        required
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} style={inputGroup}>
                      <label style={label}>Phone Number</label>
                      <motion.input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        style={input}
                        whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      style={checkboxGroup}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        style={checkbox}
                        required
                      />
                      <label style={checkboxLabel}>
                        I agree to the{' '}
                        <a href="#" style={link}>
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" style={link}>
                          Privacy Policy
                        </a>
                      </label>
                    </motion.div>

                    <div style={buttonGroup}>
                      <motion.button
                        type="button"
                        onClick={handlePrevious}
                        style={backButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ← Back
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        style={nextButton}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 245, 212, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue
                        <span style={arrow}>→</span>
                      </motion.button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <motion.div variants={itemVariants} style={verifySection}>
                      <div style={verifyIcon}>📧</div>
                      <h3 style={verifyTitle}>Verify Your Email</h3>
                      <p style={verifyText}>
                        We've sent a verification link to {formData.email}. Please
                        check your inbox and click the link to verify your account.
                      </p>
                    </motion.div>

                    <div style={buttonGroup}>
                      <motion.button
                        type="button"
                        onClick={handlePrevious}
                        style={backButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ← Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        style={submitButton}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 245, 212, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Complete Sign Up
                        <span style={arrow}>✓</span>
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          <motion.div
            style={loginLink}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account?{' '}
            <Link to="/contact" style={link}>
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Responsive style functions for SignUp page
const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'relative',
      minHeight: '100vh',
      padding: '60px 20px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      overflow: 'hidden',
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      position: 'relative',
      minHeight: '100vh',
      padding: '80px 5vw',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      overflow: 'hidden',
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'relative',
    minHeight: '100vh',
    padding: '120px 10vw 80px',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
    overflow: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const section = {
  position: 'relative',
  minHeight: '100vh',
  padding: '60px 20px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const backgroundContainer = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 0,
};

const animatedCircle1 = {
  position: 'absolute',
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,245,212,0.2) 0%, transparent 70%)',
  top: '-200px',
  left: '-200px',
  filter: 'blur(40px)',
};

const animatedCircle2 = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(123,44,191,0.2) 0%, transparent 70%)',
  bottom: '-250px',
  right: '-250px',
  filter: 'blur(50px)',
};

const animatedCircle3 = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%)',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  filter: 'blur(30px)',
};

const contentContainer = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center',
  marginBottom: '50px',
};

const logoLink = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '15px',
  textDecoration: 'none',
  marginBottom: '30px',
};

const logo = {
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
};

const logoText = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  margin: 0,
};

const title = {
  fontSize: '3rem',
  fontWeight: 800,
  color: '#fff',
  marginBottom: '15px',
};

const subtitle = {
  fontSize: '1.2rem',
  color: '#888',
};

const stepsContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '50px',
  position: 'relative',
  padding: '0 20px',
};

const stepItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  flex: 1,
  position: 'relative',
};

const stepCircle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.8rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const activeStepCircle = {
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  borderColor: 'transparent',
  boxShadow: '0 0 30px rgba(0, 245, 212, 0.5)',
};

const stepIcon = {
  display: 'block',
};

const stepTitle = {
  fontSize: '0.9rem',
  color: '#888',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const stepLine = {
  position: 'absolute',
  top: '30px',
  left: '50%',
  width: '100%',
  height: '2px',
  background: 'linear-gradient(90deg, #00F5D4, #7B2CBF)',
  transformOrigin: 'left',
  zIndex: -1,
};

const formContainer = {
  background: 'rgba(26, 26, 26, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  padding: '50px',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const label = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
};

const input = {
  padding: '18px 24px',
  borderRadius: '16px',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  background: 'rgba(0, 0, 0, 0.3)',
  color: '#fff',
  fontSize: '1rem',
  fontFamily: 'inherit',
  transition: 'all 0.3s ease',
  outline: 'none',
};

const checkboxGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
};

const checkbox = {
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  accentColor: '#00F5D4',
};

const checkboxLabel = {
  fontSize: '0.95rem',
  color: '#aaa',
  cursor: 'pointer',
};

const link = {
  color: '#00F5D4',
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
};

const buttonGroup = {
  display: 'flex',
  gap: '20px',
  marginTop: '10px',
};

const nextButton = {
  flex: 1,
  padding: '18px 40px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
};

const backButton = {
  padding: '18px 40px',
  borderRadius: '50px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  background: 'rgba(0, 245, 212, 0.05)',
  color: '#00F5D4',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
};

const submitButton = {
  flex: 1,
  padding: '18px 40px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
};

const arrow = {
  fontSize: '1.5rem',
};

const verifySection = {
  textAlign: 'center',
  padding: '40px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '24px',
  border: '2px solid rgba(0, 245, 212, 0.2)',
};

const verifyIcon = {
  fontSize: '4rem',
  marginBottom: '20px',
};

const verifyTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const verifyText = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};

const successMessage = {
  textAlign: 'center',
  padding: '60px 40px',
};

const successIcon = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '4rem',
  color: '#000',
  margin: '0 auto 30px',
  fontWeight: 800,
};

const successTitle = {
  fontSize: '2.5rem',
  fontWeight: 800,
  color: '#fff',
  marginBottom: '20px',
};

const successText = {
  fontSize: '1.2rem',
  color: '#aaa',
  marginBottom: '40px',
  lineHeight: '1.8',
};

const successButton = {
  padding: '18px 50px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.2rem',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
};

const loginLink = {
  textAlign: 'center',
  marginTop: '30px',
  fontSize: '1rem',
  color: '#888',
};
