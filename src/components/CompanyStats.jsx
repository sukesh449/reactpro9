import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function CompanyStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <section style={getSectionStyle(windowWidth)}>
        <div style={getGridStyle(windowWidth)}>Loading...</div>
      </section>
    );
  }

  return (
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ scale: windowWidth > 768 ? 1.1 : 1, rotate: windowWidth > 768 ? 2 : 0 }}
            style={getCardStyle(windowWidth)}
          >
            <motion.div
              style={getIconStyle(windowWidth)}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {stat.icon}
            </motion.div>
            <motion.h2
              style={getValueStyle(windowWidth)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {stat.value}
            </motion.h2>
            <p style={getLabelStyle(windowWidth)}>{stat.label}</p>
            {stat.trend && (
              <motion.span
                style={getTrendStyle(windowWidth)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stat.trend}
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    padding: '100px 10vw',
    background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  };
};

const getGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '30px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const section = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px',
  padding: '100px 10vw',
  background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)',
};

const grid = {
  display: 'contents',
};

const getCardStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '35px 25px',
      borderRadius: '24px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      textAlign: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '50px 30px',
    borderRadius: '32px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getIconStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      marginBottom: '15px',
      display: 'block',
    };
  }
  return {
    fontSize: '3.5rem',
    marginBottom: '20px',
    display: 'block',
  };
};

const getValueStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      fontWeight: 800,
      margin: '10px 0',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '3.5rem',
    fontWeight: 800,
    margin: '10px 0',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    wordWrap: 'break-word',
  };
};

const getLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.95rem',
      color: '#aaa',
      margin: '15px 0 0 0',
      fontWeight: 500,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.1rem',
    color: '#aaa',
    margin: '15px 0 0 0',
    fontWeight: 500,
    wordWrap: 'break-word',
  };
};

const getTrendStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'inline-block',
      marginTop: '10px',
      padding: '4px 10px',
      background: 'rgba(0, 245, 212, 0.2)',
      borderRadius: '18px',
      fontSize: '0.75rem',
      color: '#00F5D4',
      fontWeight: 600,
      wordWrap: 'break-word',
    };
  }
  return {
    display: 'inline-block',
    marginTop: '10px',
    padding: '4px 12px',
    background: 'rgba(0, 245, 212, 0.2)',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#00F5D4',
    fontWeight: 600,
    wordWrap: 'break-word',
  };
};

const card = {
  padding: '50px 30px',
  borderRadius: '32px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
};

const icon = {
  fontSize: '3.5rem',
  marginBottom: '20px',
  display: 'block',
};

const value = {
  fontSize: '3.5rem',
  fontWeight: 800,
  margin: '10px 0',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const label = {
  fontSize: '1.1rem',
  color: '#aaa',
  margin: '15px 0 0 0',
  fontWeight: 500,
};

const trend = {
  display: 'inline-block',
  marginTop: '10px',
  padding: '4px 12px',
  background: 'rgba(0, 245, 212, 0.2)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#00F5D4',
  fontWeight: 600,
};
