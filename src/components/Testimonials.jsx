import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
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
    const fetchTestimonials = async () => {
      try {
        const response = await apiService.getTestimonials();
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to empty array
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <section style={section}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={heading}
        >
          Client Testimonials
        </motion.h2>
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
        <h2 style={getHeadingStyle(windowWidth)}>Client Testimonials</h2>
        <p style={getSubheadingStyle(windowWidth)}>Hear from our satisfied clients</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={getIntroTextStyle(windowWidth)}
        >
          Don't just take our word for it. Read what C-level executives and technology leaders from
          Fortune 500 companies have to say about working with Nexoris. Our clients consistently praise
          our expertise, responsiveness, and ability to deliver exceptional results.
        </motion.p>
      </motion.div>

      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover={{ y: windowWidth > 768 ? -10 : 0, scale: windowWidth > 768 ? 1.02 : 1 }}
            style={getCardStyle(windowWidth)}
          >
            <div style={getRatingContainerStyle(windowWidth)}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={getStarStyle(windowWidth)}>⭐</span>
              ))}
            </div>
            <p style={getQuoteStyle(windowWidth)}>"{testimonial.text}"</p>
            <div style={getAuthorContainerStyle(windowWidth)}>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={getAvatarStyle(windowWidth)}
                loading="lazy"
              />
              <div>
                <h4 style={getAuthorNameStyle(windowWidth)}>{testimonial.name}</h4>
                <p style={getAuthorRoleStyle(windowWidth)}>
                  {testimonial.role} • {testimonial.company}
                </p>
              </div>
            </div>
            <div style={getTestimonialDateStyle(windowWidth)}>
              {new Date(testimonial.date).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={getTestimonialsStatsStyle(windowWidth)}
      >
        <div style={getTestimonialStatItemStyle(windowWidth)}>
          <div style={getTestimonialStatNumberStyle(windowWidth)}>{testimonials.length}+</div>
          <div style={getTestimonialStatLabelStyle(windowWidth)}>Client Testimonials</div>
        </div>
        <div style={getTestimonialStatItemStyle(windowWidth)}>
          <div style={getTestimonialStatNumberStyle(windowWidth)}>5.0</div>
          <div style={getTestimonialStatLabelStyle(windowWidth)}>Average Rating</div>
        </div>
        <div style={getTestimonialStatItemStyle(windowWidth)}>
          <div style={getTestimonialStatNumberStyle(windowWidth)}>95%</div>
          <div style={getTestimonialStatLabelStyle(windowWidth)}>Would Recommend</div>
        </div>
        <div style={getTestimonialStatItemStyle(windowWidth)}>
          <div style={getTestimonialStatNumberStyle(windowWidth)}>100%</div>
          <div style={getTestimonialStatLabelStyle(windowWidth)}>Satisfaction Rate</div>
        </div>
      </motion.div>
    </section>
  );
}

const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '60px 20px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    padding: '100px 10vw',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
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
      gap: '25px',
      marginTop: '35px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getCardStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '25px 20px',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '35px',
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getQuoteStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.95rem',
      lineHeight: '1.7',
      color: '#e0e0e0',
      marginBottom: '20px',
      fontStyle: 'italic',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#e0e0e0',
    marginBottom: '25px',
    fontStyle: 'italic',
    wordWrap: 'break-word',
  };
};

const getAuthorContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getAvatarStyle = (width) => {
  if (width <= 768) {
    return {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #00F5D4',
      flexShrink: 0,
    };
  }
  return {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #00F5D4',
    flexShrink: 0,
  };
};

const getAuthorNameStyle = (width) => {
  if (width <= 768) {
    return {
      margin: 0,
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#fff',
      wordWrap: 'break-word',
    };
  }
  return {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    wordWrap: 'break-word',
  };
};

const getAuthorRoleStyle = (width) => {
  if (width <= 768) {
    return {
      margin: '4px 0 0 0',
      fontSize: '0.8rem',
      color: '#888',
      wordWrap: 'break-word',
    };
  }
  return {
    margin: '4px 0 0 0',
    fontSize: '0.85rem',
    color: '#888',
    wordWrap: 'break-word',
  };
};

const getRatingContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      gap: '3px',
      marginBottom: '15px',
      justifyContent: 'center',
    };
  }
  return {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px',
  };
};

const getStarStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
    };
  }
  return {
    fontSize: '1.2rem',
  };
};

const getTestimonialDateStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.75rem',
      color: '#666',
      marginTop: '12px',
      textAlign: 'right',
      fontStyle: 'italic',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '15px',
    textAlign: 'right',
    fontStyle: 'italic',
    wordWrap: 'break-word',
  };
};

const getTestimonialsStatsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      marginTop: '50px',
      padding: '40px 25px',
      background: 'rgba(0, 245, 212, 0.05)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      width: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      marginTop: '60px',
      padding: '50px 40px',
      background: 'rgba(0, 245, 212, 0.05)',
      borderRadius: '28px',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    marginTop: '80px',
    padding: '60px',
    background: 'rgba(0, 245, 212, 0.05)',
    borderRadius: '32px',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    flexWrap: 'wrap',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getTestimonialStatItemStyle = (width) => {
  if (width <= 768) {
    return {
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    textAlign: 'center',
    minWidth: '120px',
  };
};

const getTestimonialStatNumberStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
      lineHeight: '1',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '3rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
    lineHeight: '1',
    wordWrap: 'break-word',
  };
};

const getTestimonialStatLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.85rem',
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

const section = {
  padding: '100px 10vw',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
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

const testimonialDate = {
  fontSize: '0.85rem',
  color: '#666',
  marginTop: '15px',
  textAlign: 'right',
  fontStyle: 'italic',
};

const testimonialsStats = {
  display: 'flex',
  justifyContent: 'center',
  gap: '60px',
  marginTop: '80px',
  padding: '60px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '32px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  flexWrap: 'wrap',
};

const testimonialStatItem = {
  textAlign: 'center',
};

const testimonialStatNumber = {
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
  lineHeight: '1',
};

const testimonialStatLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '30px',
  marginTop: '40px',
};

const card = {
  padding: '35px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

const ratingContainer = {
  display: 'flex',
  gap: '4px',
  marginBottom: '20px',
};

const star = {
  fontSize: '1.2rem',
};

const quote = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  color: '#e0e0e0',
  marginBottom: '25px',
  fontStyle: 'italic',
};

const authorContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const avatar = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #00F5D4',
};

const authorName = {
  margin: 0,
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
};

const authorRole = {
  margin: '4px 0 0 0',
  fontSize: '0.85rem',
  color: '#888',
};
