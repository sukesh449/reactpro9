import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

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
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={getHeaderStyle(windowWidth)}
      >
        <h1 style={getTitleStyle(windowWidth)}>Get In Touch</h1>
        <p style={getSubtitleStyle(windowWidth)}>
          Let's discuss how we can transform your business
        </p>
      </motion.div>

      <div style={getContentGridStyle(windowWidth)}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={getFormSectionStyle(windowWidth)}
        >
          <motion.h2 variants={itemVariants} style={getSectionTitleStyle(windowWidth)}>
            Send us a message
          </motion.h2>
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            style={getFormStyle(windowWidth)}
          >
            <motion.input
              variants={itemVariants}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={getInputStyle(windowWidth)}
              required
              whileFocus={{ scale: windowWidth > 768 ? 1.02 : 1, borderColor: '#00F5D4' }}
            />
            <motion.input
              variants={itemVariants}
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              style={getInputStyle(windowWidth)}
              required
              whileFocus={{ scale: windowWidth > 768 ? 1.02 : 1, borderColor: '#00F5D4' }}
            />
            <motion.input
              variants={itemVariants}
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              style={getInputStyle(windowWidth)}
              whileFocus={{ scale: windowWidth > 768 ? 1.02 : 1, borderColor: '#00F5D4' }}
            />
            <motion.textarea
              variants={itemVariants}
              name="message"
              placeholder="Project Details"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              style={{ ...getInputStyle(windowWidth), resize: 'vertical' }}
              required
              whileFocus={{ scale: windowWidth > 768 ? 1.02 : 1, borderColor: '#00F5D4' }}
            />
            <motion.button
              type="submit"
              style={getSubmitButtonStyle(windowWidth)}
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
          <div style={getOfficesGridStyle(windowWidth)}>
            {offices.map((office, idx) => (
              <motion.div
                key={office.city}
                variants={itemVariants}
                style={getOfficeCardStyle(windowWidth)}
                whileHover={{ y: windowWidth > 768 ? -10 : 0, scale: windowWidth > 768 ? 1.02 : 1 }}
              >
                <div style={getOfficeFlagStyle(windowWidth)}>{office.flag}</div>
                <h3 style={getOfficeCityStyle(windowWidth)}>{office.city}</h3>
                <p style={getOfficeAddressStyle(windowWidth)}>{office.address}</p>
                <p style={getOfficeContactStyle(windowWidth)}>📞 {office.phone}</p>
                <p style={getOfficeContactStyle(windowWidth)}>✉ {office.email}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            style={getSocialSectionStyle(windowWidth)}
          >
            <h3 style={getSocialTitleStyle(windowWidth)}>Follow Us</h3>
            <div style={getSocialLinksStyle(windowWidth)}>
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  style={getSocialLinkStyle(windowWidth)}
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

// Responsive style functions for Contact page
const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '80px 20px 60px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      padding: '100px 5vw 70px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '120px 10vw 80px',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
    minHeight: '100vh',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const getTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '15px',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getSubtitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.1rem',
      color: '#888',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.5rem',
    color: '#888',
  };
};

const getContentGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      maxWidth: '100%',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'visible',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '50px',
      maxWidth: '100%',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'visible',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'visible',
  };
};

const getFormSectionStyle = (width) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getSectionTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.8rem',
      fontWeight: 700,
      marginBottom: '30px',
      color: '#fff',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '40px',
    color: '#fff',
    wordWrap: 'break-word',
  };
};

const getFormStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getInputStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '15px 20px',
      borderRadius: '14px',
      border: '2px solid rgba(0, 245, 212, 0.2)',
      background: 'rgba(0, 0, 0, 0.3)',
      color: '#fff',
      fontSize: '0.95rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      outline: 'none',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '18px 24px',
    borderRadius: '16px',
    border: '2px solid rgba(0, 245, 212, 0.2)',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    outline: 'none',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getSubmitButtonStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '16px 32px',
      borderRadius: '50px',
      border: 'none',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      color: '#000',
      fontWeight: 700,
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '10px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '18px 40px',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    color: '#000',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getOfficeCardStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '25px 20px',
      borderRadius: '18px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '30px',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getOfficeFlagStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      marginBottom: '12px',
      color: '#00F5D4',
    };
  }
  return {
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: '#00F5D4',
  };
};

const getOfficeCityStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '8px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '10px',
    wordWrap: 'break-word',
  };
};

const getOfficeAddressStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      color: '#aaa',
      marginBottom: '10px',
      lineHeight: '1.5',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.95rem',
    color: '#aaa',
    marginBottom: '12px',
    lineHeight: '1.6',
    wordWrap: 'break-word',
  };
};

const getOfficeContactStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.85rem',
      color: '#888',
      marginBottom: '6px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '8px',
    wordWrap: 'break-word',
  };
};

const getSocialSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '30px 20px',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '40px',
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getSocialTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '20px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '25px',
    wordWrap: 'break-word',
  };
};

const getSocialLinksStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    };
  }
  return {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  };
};

const getSocialLinkStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '10px 20px',
      borderRadius: '30px',
      background: 'rgba(0, 245, 212, 0.1)',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      color: '#00F5D4',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
      cursor: 'pointer',
      wordWrap: 'break-word',
    };
  }
  return {
    padding: '12px 24px',
    borderRadius: '30px',
    background: 'rgba(0, 245, 212, 0.1)',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    color: '#00F5D4',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    wordWrap: 'break-word',
  };
};

const getOfficesGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '25px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const section = {
  padding: '120px 10vw 80px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
};

const getHeaderStyle = (width) => {
  if (width <= 768) {
    return {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '0 20px',
    };
  }
  return {
    textAlign: 'center',
    marginBottom: '60px',
  };
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
