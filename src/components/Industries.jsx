import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
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
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={getHeadingStyle(windowWidth)}>Industries We Serve</h2>
        <p style={getSubheadingStyle(windowWidth)}>
          Transforming businesses across sectors with cutting-edge technology solutions
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={getIntroTextStyle(windowWidth)}
        >
          With deep domain expertise across 6 major industries, we've delivered 228+ successful projects
          that drive innovation, efficiency, and growth. Our industry-specific solutions are tailored to
          meet unique challenges and regulatory requirements.
        </motion.p>
      </motion.div>

      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {industries.map((industry) => (
          <motion.div
            key={industry.id}
            variants={cardVariants}
            whileHover={{ y: windowWidth > 768 ? -12 : 0, scale: windowWidth > 768 ? 1.05 : 1, rotateY: windowWidth > 768 ? 5 : 0 }}
            style={getCardStyle(windowWidth)}
          >
            <div style={getImageWrapperStyle(windowWidth)}>
              <img
                src={industry.image}
                alt={industry.name}
                style={getImageStyle(windowWidth)}
                loading="lazy"
              />
              <div style={getImageOverlayStyle(windowWidth)} />
              <div style={getIconContainerStyle(windowWidth)}>
                <span style={getIconStyle(windowWidth)}>{industry.icon}</span>
              </div>
            </div>
            <div style={getContentStyle(windowWidth)}>
              <h3 style={getNameStyle(windowWidth)}>{industry.name}</h3>
              <p style={getDescriptionStyle(windowWidth)}>{industry.description}</p>
              <div style={getIndustryFeaturesStyle(windowWidth)}>
                {industry.name === 'Healthcare' && ['HIPAA Compliance', 'Telemedicine', 'EHR Systems'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
                {industry.name === 'Finance' && ['Security', 'Compliance', 'FinTech'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
                {industry.name === 'Retail' && ['E-commerce', 'Inventory', 'POS Systems'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
                {industry.name === 'Manufacturing' && ['IoT', 'Automation', 'Industry 4.0'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
                {industry.name === 'Education' && ['LMS', 'E-Learning', 'Student Portals'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
                {industry.name === 'Energy' && ['Smart Grid', 'Monitoring', 'Analytics'].map((feat, idx) => (
                  <span key={idx} style={getFeatureTagStyle(windowWidth)}>{feat}</span>
                ))}
              </div>
              <div style={getProjectsStyle(windowWidth)}>
                <span style={getProjectCountStyle(windowWidth)}>{industry.projects}+</span>
                <span style={getProjectLabelStyle(windowWidth)}>Projects Completed</span>
              </div>
            </div>
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
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    padding: '100px 10vw',
    background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  };
};

const getHeadingStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
      padding: '0 10px',
      textAlign: 'center',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getSubheadingStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
      color: '#888',
      marginBottom: '1rem',
      wordWrap: 'break-word',
      textAlign: 'center',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.2rem',
    color: '#888',
    marginBottom: '1rem',
    wordWrap: 'break-word',
  };
};

const getIntroTextStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.95rem',
      color: '#aaa',
      lineHeight: '1.7',
      maxWidth: '100%',
      margin: '0 auto 2rem',
      textAlign: 'center',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '1.05rem',
      color: '#aaa',
      lineHeight: '1.75',
      maxWidth: '100%',
      margin: '0 auto 2.5rem',
      textAlign: 'center',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.1rem',
    color: '#aaa',
    lineHeight: '1.8',
    maxWidth: '900px',
    margin: '0 auto 3rem',
    textAlign: 'center',
    wordWrap: 'break-word',
  };
};

const getGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '25px',
      marginTop: '30px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px',
      marginTop: '35px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '35px',
    marginTop: '40px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getCardStyle = (width) => {
  if (width <= 768) {
    return {
      borderRadius: '24px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      perspective: '1000px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    borderRadius: '28px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    perspective: '1000px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getContentStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '25px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '30px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getNameStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: '0 0 12px 0',
      color: '#fff',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 12px 0',
    color: '#fff',
    wordWrap: 'break-word',
  };
};

const getDescriptionStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      lineHeight: '1.6',
      color: '#aaa',
      marginBottom: '20px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#aaa',
    marginBottom: '20px',
    wordWrap: 'break-word',
  };
};

const getIndustryFeaturesStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginBottom: '15px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getFeatureTagStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '5px 10px',
      background: 'rgba(0, 245, 212, 0.1)',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      borderRadius: '16px',
      fontSize: '0.75rem',
      color: '#00F5D4',
      fontWeight: 500,
      wordWrap: 'break-word',
    };
  }
  return {
    padding: '6px 14px',
    background: 'rgba(0, 245, 212, 0.1)',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#00F5D4',
    fontWeight: 500,
    wordWrap: 'break-word',
  };
};

const getProjectsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      alignItems: 'baseline',
      gap: '6px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      flexWrap: 'wrap',
    };
  }
  return {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  };
};

const getProjectCountStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#00F5D4',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#00F5D4',
    wordWrap: 'break-word',
  };
};

const getProjectLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.8rem',
      color: '#888',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.9rem',
    color: '#888',
    wordWrap: 'break-word',
  };
};

const getImageWrapperStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'relative',
      width: '100%',
      height: '150px',
      overflow: 'hidden',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };
};

const getImageStyle = (width) => {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  };
};

const getImageOverlayStyle = (width) => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.3) 0%, rgba(123, 44, 191, 0.3) 100%)',
  };
};

const getIconContainerStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '40px',
      height: '40px',
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
    };
  }
  return {
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
};

const getIconStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
    };
  }
  return {
    fontSize: '2rem',
  };
};

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
