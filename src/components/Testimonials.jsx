import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={heading}>Client Testimonials</h2>
        <p style={subheading}>Hear from our satisfied clients</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={introText}
        >
          Don't just take our word for it. Read what C-level executives and technology leaders from
          Fortune 500 companies have to say about working with Nexoris. Our clients consistently praise
          our expertise, responsiveness, and ability to deliver exceptional results.
        </motion.p>
      </motion.div>

      <motion.div
        style={grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            style={card}
          >
            <div style={ratingContainer}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={star}>⭐</span>
              ))}
            </div>
            <p style={quote}>"{testimonial.text}"</p>
            <div style={authorContainer}>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={avatar}
                loading="lazy"
              />
              <div>
                <h4 style={authorName}>{testimonial.name}</h4>
                <p style={authorRole}>
                  {testimonial.role} • {testimonial.company}
                </p>
              </div>
            </div>
            <div style={testimonialDate}>
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
        style={testimonialsStats}
      >
        <div style={testimonialStatItem}>
          <div style={testimonialStatNumber}>{testimonials.length}+</div>
          <div style={testimonialStatLabel}>Client Testimonials</div>
        </div>
        <div style={testimonialStatItem}>
          <div style={testimonialStatNumber}>5.0</div>
          <div style={testimonialStatLabel}>Average Rating</div>
        </div>
        <div style={testimonialStatItem}>
          <div style={testimonialStatNumber}>95%</div>
          <div style={testimonialStatLabel}>Would Recommend</div>
        </div>
        <div style={testimonialStatItem}>
          <div style={testimonialStatNumber}>100%</div>
          <div style={testimonialStatLabel}>Satisfaction Rate</div>
        </div>
      </motion.div>
    </section>
  );
}

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
