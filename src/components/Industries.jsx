import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await apiService.getIndustries();
        setIndustries(response.data);
      } catch (error) {
        console.error('Error fetching industries:', error);
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <section style={section}>
        <h2 style={heading}>Industries We Serve</h2>
        <div style={grid}>Loading...</div>
      </section>
    );
  }

  return (
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={heading}>Industries We Serve</h2>
        <p style={subheading}>
          Transforming businesses across sectors with cutting-edge technology solutions
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={introText}
        >
          With deep domain expertise across 6 major industries, we've delivered 228+ successful projects
          that drive innovation, efficiency, and growth. Our industry-specific solutions are tailored to
          meet unique challenges and regulatory requirements.
        </motion.p>
      </motion.div>

      <motion.div
        style={grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {industries.map((industry) => (
          <motion.div
            key={industry.id}
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.05, rotateY: 5 }}
            style={card}
          >
            <div style={imageWrapper}>
              <img
                src={industry.image}
                alt={industry.name}
                style={image}
                loading="lazy"
              />
              <div style={imageOverlay} />
              <div style={iconContainer}>
                <span style={icon}>{industry.icon}</span>
              </div>
            </div>
            <div style={content}>
              <h3 style={name}>{industry.name}</h3>
              <p style={description}>{industry.description}</p>
              <div style={industryFeatures}>
                {industry.name === 'Healthcare' && ['HIPAA Compliance', 'Telemedicine', 'EHR Systems'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
                {industry.name === 'Finance' && ['Security', 'Compliance', 'FinTech'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
                {industry.name === 'Retail' && ['E-commerce', 'Inventory', 'POS Systems'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
                {industry.name === 'Manufacturing' && ['IoT', 'Automation', 'Industry 4.0'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
                {industry.name === 'Education' && ['LMS', 'E-Learning', 'Student Portals'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
                {industry.name === 'Energy' && ['Smart Grid', 'Monitoring', 'Analytics'].map((feat, idx) => (
                  <span key={idx} style={featureTag}>{feat}</span>
                ))}
              </div>
              <div style={projects}>
                <span style={projectCount}>{industry.projects}+</span>
                <span style={projectLabel}>Projects Completed</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const section = {
  padding: '100px 10vw',
  background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
};

const heading = {
  fontSize: '3.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subheading = {
  fontSize: '1.2rem',
  color: '#888',
  marginBottom: '1rem',
};

const introText = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  maxWidth: '900px',
  margin: '0 auto 3rem',
  textAlign: 'center',
};

const industryFeatures = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const featureTag = {
  padding: '6px 14px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#00F5D4',
  fontWeight: 500,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '35px',
  marginTop: '40px',
};

const card = {
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.1)',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  perspective: '1000px',
};

const imageWrapper = {
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
};

const image = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
};

const imageOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.3) 0%, rgba(123, 44, 191, 0.3) 100%)',
};

const iconContainer = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  background: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
};

const icon = {
  fontSize: '2rem',
};

const content = {
  padding: '30px',
};

const name = {
  fontSize: '1.8rem',
  fontWeight: 700,
  margin: '0 0 12px 0',
  color: '#fff',
};

const description = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#aaa',
  marginBottom: '20px',
};

const projects = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const projectCount = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#00F5D4',
};

const projectLabel = {
  fontSize: '0.9rem',
  color: '#888',
};
