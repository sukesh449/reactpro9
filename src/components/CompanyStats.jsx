import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function CompanyStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section style={section}>
        <div style={grid}>Loading...</div>
      </section>
    );
  }

  return (
    <section style={section}>
      <motion.div
        style={grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 2 }}
            style={card}
          >
            <motion.div
              style={icon}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {stat.icon}
            </motion.div>
            <motion.h2
              style={value}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {stat.value}
            </motion.h2>
            <p style={label}>{stat.label}</p>
            {stat.trend && (
              <motion.span
                style={trend}
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
