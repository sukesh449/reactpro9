import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market St, Suite 400',
      phone: '+1 (555) 123-4567',
      email: 'sf@nexoris.com',
      flag: '🇺🇸',
    },
    {
      city: 'London',
      address: '45 King Street, EC2V 8EA',
      phone: '+44 20 7123 4567',
      email: 'london@nexoris.com',
      flag: '🇬🇧',
    },
    {
      city: 'Singapore',
      address: '10 Marina Boulevard',
      phone: '+65 6123 4567',
      email: 'singapore@nexoris.com',
      flag: '🇸🇬',
    },
    {
      city: 'Bangalore',
      address: 'IT Park, Whitefield',
      phone: '+91 80 4123 4567',
      email: 'bangalore@nexoris.com',
      flag: '🇮🇳',
    },
  ];

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
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={header}
      >
        <h1 style={title}>Get In Touch</h1>
        <p style={subtitle}>
          Let's discuss how we can transform your business
        </p>
      </motion.div>

      <div style={contentGrid}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={formSection}
        >
          <motion.h2 variants={itemVariants} style={sectionTitle}>
            Send us a message
          </motion.h2>
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            style={form}
          >
            <motion.input
              variants={itemVariants}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={input}
              required
              whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
            />
            <motion.input
              variants={itemVariants}
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              style={input}
              required
              whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
            />
            <motion.input
              variants={itemVariants}
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              style={input}
              whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
            />
            <motion.textarea
              variants={itemVariants}
              name="message"
              placeholder="Project Details"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              style={{ ...input, resize: 'vertical' }}
              required
              whileFocus={{ scale: 1.02, borderColor: '#00F5D4' }}
            />
            <motion.button
              type="submit"
              style={submitButton}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0, 245, 212, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={infoSection}
        >
          <motion.h2 variants={itemVariants} style={sectionTitle}>
            Our Offices
          </motion.h2>
          <div style={officesGrid}>
            {offices.map((office, idx) => (
              <motion.div
                key={office.city}
                variants={itemVariants}
                style={officeCard}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div style={officeFlag}>{office.flag}</div>
                <h3 style={officeCity}>{office.city}</h3>
                <p style={officeAddress}>{office.address}</p>
                <p style={officeContact}>📞 {office.phone}</p>
                <p style={officeContact}>✉ {office.email}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            style={socialSection}
          >
            <h3 style={socialTitle}>Follow Us</h3>
            <div style={socialLinks}>
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  style={socialLink}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const section = {
  padding: '120px 10vw 80px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
};

const header = {
  textAlign: 'center',
  marginBottom: '80px',
};

const title = {
  fontSize: '4rem',
  fontWeight: 800,
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitle = {
  fontSize: '1.5rem',
  color: '#888',
};

const contentGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  maxWidth: '1400px',
  margin: '0 auto',
};

const formSection = {
  display: 'flex',
  flexDirection: 'column',
};

const sectionTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '40px',
  color: '#fff',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
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

const submitButton = {
  padding: '18px 40px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginTop: '10px',
};

const infoSection = {
  display: 'flex',
  flexDirection: 'column',
  gap: '50px',
};

const officesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '25px',
};

const officeCard = {
  padding: '30px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
};

const officeFlag = {
  fontSize: '2.5rem',
  marginBottom: '15px',
  color: '#00F5D4',
};

const officeCity = {
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '10px',
};

const officeAddress = {
  fontSize: '0.95rem',
  color: '#aaa',
  marginBottom: '12px',
  lineHeight: '1.6',
};

const officeContact = {
  fontSize: '0.9rem',
  color: '#888',
  marginBottom: '8px',
};

const socialSection = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const socialTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '25px',
};

const socialLinks = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
};

const socialLink = {
  padding: '12px 24px',
  borderRadius: '30px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  color: '#00F5D4',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  cursor: 'pointer',
};
