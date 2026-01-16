import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const footerLinks = {
    Company: ['About', 'Services', 'Careers', 'Contact'],
    Resources: ['Case Studies', 'Blog', 'Documentation', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏' },
    { name: 'LinkedIn', icon: 'in' },
    { name: 'GitHub', icon: '⚡' },
    { name: 'Email', icon: '✉' },
  ];

  return (
    <footer style={getFooterStyle(windowWidth)}>
      <div style={getContainerStyle(windowWidth)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={brandSection}
        >
          <h3 style={brandName}>Nexoris</h3>
          <p style={brandTagline}>
            Global Digital Transformation Leader
          </p>
          <div style={socialContainer}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                style={socialLink}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
          <motion.div
            key={category}
            style={linkSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <h4 style={categoryTitle}>{category}</h4>
            <ul style={linkList}>
              {links.map((link, linkIndex) => (
                <motion.li
                  key={link}
                  style={listItem}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                >
                  <motion.a
                    href="#"
                    style={linkStyle}
                    whileHover={{ color: '#00F5D4', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={getBottomBarStyle(windowWidth)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p style={copyright}>
          © {currentYear} Nexoris Corporation. All rights reserved.
        </p>
        <div style={badges}>
          <span style={badge}>ISO 27001</span>
          <span style={badge}>SOC 2</span>
          <span style={badge}>GDPR Compliant</span>
        </div>
      </motion.div>
    </footer>
  );
}

const getFooterStyle = (width) => {
  if (width <= 768) {
    return {
      background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
      borderTop: '1px solid rgba(0, 245, 212, 0.1)',
      padding: '50px 20px 30px',
      color: '#fff',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
      borderTop: '1px solid rgba(0, 245, 212, 0.1)',
      padding: '60px 5vw 35px',
      color: '#fff',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
    borderTop: '1px solid rgba(0, 245, 212, 0.1)',
    padding: '80px 10vw 40px',
    color: '#fff',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  };
};

const getContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      marginBottom: '40px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      marginBottom: '50px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '60px',
    marginBottom: '60px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const footer = {
  background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
  borderTop: '1px solid rgba(0, 245, 212, 0.1)',
  padding: '80px 10vw 40px',
  color: '#fff',
};

const container = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: '60px',
  marginBottom: '60px',
};

const brandSection = {
  maxWidth: '300px',
};

const brandName = {
  fontSize: '2rem',
  fontWeight: 800,
  margin: '0 0 15px 0',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const brandTagline = {
  fontSize: '1rem',
  color: '#888',
  marginBottom: '30px',
  lineHeight: '1.6',
};

const socialContainer = {
  display: 'flex',
  gap: '15px',
};

const socialLink = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  color: '#00F5D4',
  textDecoration: 'none',
  cursor: 'pointer',
};

const linkSection = {};

const categoryTitle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  margin: '0 0 20px 0',
  color: '#fff',
};

const linkList = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const listItem = {};

const linkStyle = {
  color: '#888',
  textDecoration: 'none',
  fontSize: '0.95rem',
  transition: 'color 0.3s ease',
  display: 'inline-block',
};

const getBottomBarStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '30px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      flexWrap: 'wrap',
      gap: '15px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '40px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    flexWrap: 'wrap',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const bottomBar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '40px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  flexWrap: 'wrap',
  gap: '20px',
};

const copyright = {
  margin: 0,
  color: '#666',
  fontSize: '0.9rem',
};

const badges = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const badge = {
  padding: '6px 14px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#00F5D4',
};
