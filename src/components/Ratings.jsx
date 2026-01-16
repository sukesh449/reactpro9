import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Ratings() {
  const [ratings, setRatings] = useState([]);
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
    const fetchRatings = async () => {
      try {
        const response = await apiService.getRatings();
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setRatings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <section style={section}>
        <h2 style={heading}>Company Ratings</h2>
        <div style={grid}>Loading...</div>
      </section>
    );
  }

  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 4.5;

  return (
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={getHeadingStyle(windowWidth)}>Company Ratings</h2>
        <p style={getSubheadingStyle(windowWidth)}>
          Rated {averageRating.toFixed(1)}/5 by enterprise clients across
          platforms
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={getIntroTextStyle(windowWidth)}
        >
          Our consistent high ratings reflect our commitment to excellence. With {ratings.reduce((sum, r) => sum + r.reviews, 0).toLocaleString()}+ verified reviews
          from real enterprise clients, we've earned the trust of industry leaders worldwide.
        </motion.p>
      </motion.div>

      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {ratings.map((rating) => (
          <motion.div
            key={rating.id}
            variants={cardVariants}
            whileHover={{ y: windowWidth > 768 ? -10 : 0, scale: windowWidth > 768 ? 1.05 : 1 }}
            style={getCardStyle(windowWidth)}
          >
            <div style={getPlatformStyle(windowWidth)}>{rating.platform}</div>
            <motion.div
              style={getRatingContainerStyle(windowWidth)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <span style={getRatingValueStyle(windowWidth)}>{rating.rating}</span>
              <span style={getRatingMaxStyle(windowWidth)}>/5</span>
            </motion.div>
            <div style={getStarsStyle(windowWidth)}>
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  style={{
                    ...star,
                    opacity: i < Math.round(rating.rating) ? 1 : 0.3,
                  }}
                  animate={{
                    scale: i < Math.round(rating.rating) ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 0.3,
                  }}
                >
                  {rating.icon}
                </motion.span>
              ))}
            </div>
            <div style={getReviewsStyle(windowWidth)}>{rating.reviews.toLocaleString()} reviews</div>
            <div style={getRatingDescriptionStyle(windowWidth)}>
              {rating.platform === 'G2' && 'Leading B2B software review platform'}
              {rating.platform === 'Trustpilot' && 'Trusted by millions of consumers'}
              {rating.platform === 'Clutch' && 'Top B2B ratings and reviews platform'}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={getCertificationsSectionStyle(windowWidth)}
      >
        <h3 style={getCertificationsTitleStyle(windowWidth)}>Certifications & Compliance</h3>
        <div style={getCertificationsGridStyle(windowWidth)}>
          {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'HIPAA Certified', 'PCI DSS Level 1', 'AWS Advanced Partner'].map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              style={getCertificationBadgeStyle(windowWidth)}
              whileHover={{ scale: windowWidth > 768 ? 1.1 : 1 }}
            >
              <span style={certIcon}>✓</span>
              <span style={certText}>{cert}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '60px 20px',
      background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    padding: '100px 10vw',
    background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a1a 100%)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '40px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
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
      transition: 'all 0.3s ease',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '50px 40px',
    borderRadius: '32px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getPlatformStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.2rem',
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

const getRatingContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: '4px',
      marginBottom: '15px',
    };
  }
  return {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '5px',
    marginBottom: '20px',
  };
};

const getRatingValueStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      fontWeight: 800,
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
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    wordWrap: 'break-word',
  };
};

const getRatingMaxStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.3rem',
      color: '#666',
      fontWeight: 600,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '2rem',
    color: '#666',
    fontWeight: 600,
    wordWrap: 'break-word',
  };
};

const getStarsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      justifyContent: 'center',
      gap: '6px',
      marginBottom: '15px',
      flexWrap: 'wrap',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  };
};

const getReviewsStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      color: '#888',
      fontWeight: 500,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1rem',
    color: '#888',
    fontWeight: 500,
    wordWrap: 'break-word',
  };
};

const getRatingDescriptionStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.75rem',
      color: '#666',
      marginTop: '8px',
      fontStyle: 'italic',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '10px',
    fontStyle: 'italic',
    wordWrap: 'break-word',
  };
};

const getCertificationsSectionStyle = (width) => {
  if (width <= 768) {
    return {
      marginTop: '50px',
      textAlign: 'center',
      padding: '0 10px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    marginTop: '80px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getCertificationsTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '30px',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '40px',
    wordWrap: 'break-word',
  };
};

const getCertificationsGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getCertificationBadgeStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 18px',
      background: 'rgba(0, 245, 212, 0.1)',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      borderRadius: '20px',
      cursor: 'pointer',
      wordWrap: 'break-word',
    };
  }
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: 'rgba(0, 245, 212, 0.1)',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    borderRadius: '25px',
    cursor: 'pointer',
    wordWrap: 'break-word',
  };
};

const section = {
  padding: '100px 10vw',
  background: 'linear-gradient(180deg, #0b0b0b 0%, #1a1a1a 100%)',
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

const ratingDescription = {
  fontSize: '0.85rem',
  color: '#666',
  marginTop: '10px',
  fontStyle: 'italic',
};

const certificationsSection = {
  marginTop: '80px',
  textAlign: 'center',
};

const certificationsTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '40px',
};

const certificationsGrid = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
};

const certificationBadge = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 24px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '25px',
  cursor: 'pointer',
};

const certIcon = {
  fontSize: '1.2rem',
  color: '#00F5D4',
  fontWeight: 800,
};

const certText = {
  fontSize: '0.95rem',
  color: '#fff',
  fontWeight: 600,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginTop: '40px',
};

const card = {
  padding: '50px 40px',
  borderRadius: '32px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const platform = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '25px',
};

const ratingContainer = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  gap: '5px',
  marginBottom: '20px',
};

const ratingValue = {
  fontSize: '4rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const ratingMax = {
  fontSize: '2rem',
  color: '#666',
  fontWeight: 600,
};

const stars = {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginBottom: '20px',
};

const star = {
  fontSize: '2rem',
  color: '#FFD700',
  transition: 'all 0.3s ease',
};

const reviews = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};
