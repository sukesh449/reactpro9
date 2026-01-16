import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.svg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    {
      label: 'Services',
      path: '/services',
      dropdown: [
        { label: 'Cloud Solutions', path: '/services#cloud' },
        { label: 'AI & Machine Learning', path: '/services#ai' },
        { label: 'Cybersecurity', path: '/services#security' },
        { label: 'Digital Transformation', path: '/services#transformation' },
        { label: 'Data Analytics', path: '/services#analytics' },
        { label: 'Mobile Development', path: '/services#mobile' },
      ],
    },
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'Our Story', path: '/about#story' },
        { label: 'Leadership Team', path: '/about#team' },
        { label: 'Our Values', path: '/about#values' },
        { label: 'Awards & Recognition', path: '/about#awards' },
        { label: 'Global Presence', path: '/about#global' },
      ],
    },
    {
      label: 'Careers',
      path: '/careers',
      dropdown: [
        { label: 'Open Positions', path: '/careers#positions' },
        { label: 'Benefits', path: '/careers#benefits' },
        { label: 'Culture', path: '/careers#culture' },
        { label: 'Internships', path: '/careers#internships' },
      ],
    },
    { path: '/contact', label: 'Contact' },
  ];

  // Add Sign Up button
  const showSignUp = location.pathname !== '/signup';

  const isMobile = windowWidth <= 768;

  return (
    <motion.nav
      style={{
        ...getNavStyle(windowWidth),
        background: scrolled
          ? 'rgba(0, 0, 0, 0.95)'
          : 'rgba(0, 0, 0, 0.7)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(14px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        whileHover={{ scale: isMobile ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" style={logoLink}>
          <img src={Logo} alt="logo" height={isMobile ? 32 : 42} />
        </Link>
      </motion.div>

      {isMobile ? (
        <>
          <motion.button
            style={mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </motion.button>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={mobileMenu}
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path || link.label}
                      to={link.path}
                      style={{
                        ...mobileLinkStyle,
                        color: isActive ? '#00F5D4' : '#fff',
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {showSignUp && (
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button
                      style={mobileSignUpButton}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div style={links}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const hasDropdown = link.dropdown;

          return (
            <div
              key={link.path || link.label}
              style={linkContainer}
              onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  to={link.path}
                  style={{
                    ...linkStyle,
                    color: isActive ? '#00F5D4' : '#fff',
                    borderBottom: isActive
                      ? '2px solid #00F5D4'
                      : '2px solid transparent',
                  }}
                >
                  {link.label}
                  {hasDropdown && (
                    <motion.span
                      animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={dropdownArrow}
                    >
                      ▼
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={activeIndicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>

              <AnimatePresence>
                {hasDropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={dropdown}
                  >
                    {link.dropdown.map((item, idx) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link
                          to={item.path}
                          style={dropdownItem}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(0, 245, 212, 0.1)';
                            e.target.style.borderLeftColor = '#00F5D4';
                            e.target.style.color = '#00F5D4';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderLeftColor = 'transparent';
                            e.target.style.color = '#fff';
                          }}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        {showSignUp && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/signup">
              <motion.button
                style={signUpButton}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 245, 212, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
      )}
    </motion.nav>
  );
}

const getNavStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    transition: 'all 0.3s ease',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const nav = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 50px',
  position: 'sticky',
  top: 0,
  zIndex: 999,
  transition: 'all 0.3s ease',
};

const mobileMenuButton = {
  padding: '10px 15px',
  borderRadius: '8px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  background: 'rgba(0, 245, 212, 0.1)',
  color: '#00F5D4',
  fontSize: '1.5rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '44px',
  minHeight: '44px',
};

const mobileMenu = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.98)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  borderRadius: '0 0 16px 16px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '100%',
  boxSizing: 'border-box',
  zIndex: 1000,
};

const mobileLinkStyle = {
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  color: '#fff',
  padding: '15px 20px',
  borderRadius: '12px',
  background: 'rgba(0, 245, 212, 0.05)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  transition: 'all 0.3s ease',
  display: 'block',
  textAlign: 'center',
};

const mobileSignUpButton = {
  padding: '15px 30px',
  borderRadius: '30px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 5px 20px rgba(0, 245, 212, 0.3)',
  marginTop: '10px',
};

const logoLink = {
  textDecoration: 'none',
  display: 'inline-block',
};

const links = {
  display: 'flex',
  gap: '32px',
  alignItems: 'center',
};

const linkContainer = {
  position: 'relative',
};

const linkStyle = {
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  color: '#fff',
  position: 'relative',
  padding: '8px 0',
  transition: 'all 0.3s ease',
  borderBottom: '2px solid transparent',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const dropdownArrow = {
  fontSize: '0.7rem',
  display: 'inline-block',
  transition: 'transform 0.3s ease',
};

const activeIndicator = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '2px',
  background: 'linear-gradient(90deg, #00F5D4, #7B2CBF)',
  borderRadius: '2px',
};

const signUpButton = {
  padding: '12px 32px',
  borderRadius: '30px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: '0 5px 20px rgba(0, 245, 212, 0.3)',
};

const dropdown = {
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '10px',
  background: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  borderRadius: '16px',
  padding: '12px 0',
  minWidth: '220px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
};

const dropdownItem = {
  display: 'block',
  padding: '12px 24px',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  borderLeft: '3px solid transparent',
};
