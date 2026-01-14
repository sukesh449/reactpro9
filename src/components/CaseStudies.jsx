import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await apiService.getCaseStudies();
        setCaseStudies(response.data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <section style={section}>
        <h2 style={heading}>Case Studies</h2>
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
        <h2 style={heading}>Case Studies</h2>
        <p style={subheading}>Real-world impact and measurable results</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={introText}
        >
          Explore how we've helped Fortune 500 companies and leading enterprises transform their
          operations, reduce costs, and achieve remarkable growth. Each case study demonstrates our
          commitment to delivering measurable business outcomes through innovative technology solutions.
        </motion.p>
      </motion.div>

      <motion.div
        style={grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {caseStudies.map((caseStudy) => (
          <motion.div
            key={caseStudy.id}
            variants={cardVariants}
            whileHover={{ y: -15, scale: 1.03 }}
            style={card}
          >
            <div style={imageContainer}>
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                style={image}
                loading="lazy"
              />
              <div style={overlay} />
              <div style={tagsContainer}>
                {caseStudy.tags.map((tag, idx) => (
                  <span key={idx} style={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={content}>
              <span style={industry}>{caseStudy.industry}</span>
              <h3 style={title}>{caseStudy.title}</h3>
              <p style={description}>{caseStudy.description}</p>
              <div style={results}>
                {Object.entries(caseStudy.results).map(([key, value], idx) => (
                  <div key={idx} style={resultItem}>
                    <span style={resultValue}>{value}</span>
                    <span style={resultLabel}>
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
              <div style={clientInfo}>
                <div style={client}>Client: {caseStudy.client}</div>
                <div style={year}>Year: {caseStudy.year}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={statsSection}
      >
        <div style={statsGrid}>
          <div style={statItem}>
            <div style={statNumber}>100+</div>
            <div style={statLabel}>Case Studies</div>
          </div>
          <div style={statItem}>
            <div style={statNumber}>$2.5B+</div>
            <div style={statLabel}>Cost Savings Delivered</div>
          </div>
          <div style={statItem}>
            <div style={statNumber}>98%</div>
            <div style={statLabel}>Project Success Rate</div>
          </div>
          <div style={statItem}>
            <div style={statNumber}>45+</div>
            <div style={statLabel}>Industry Verticals</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const section = {
  padding: '100px 10vw',
  background: '#0a0a0a',
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

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
  gap: '40px',
  marginTop: '40px',
};

const card = {
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.1)',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const imageContainer = {
  position: 'relative',
  width: '100%',
  height: '250px',
  overflow: 'hidden',
};

const image = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
};

const overlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
};

const tagsContainer = {
  position: 'absolute',
  bottom: '15px',
  left: '20px',
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const tag = {
  padding: '6px 14px',
  background: 'rgba(0, 245, 212, 0.2)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#00F5D4',
};

const content = {
  padding: '30px',
};

const industry = {
  display: 'inline-block',
  padding: '6px 14px',
  background: 'rgba(123, 44, 191, 0.2)',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#7B2CBF',
  marginBottom: '15px',
};

const title = {
  fontSize: '1.8rem',
  fontWeight: 700,
  margin: '0 0 15px 0',
  color: '#fff',
};

const description = {
  fontSize: '1rem',
  lineHeight: '1.7',
  color: '#aaa',
  marginBottom: '25px',
};

const results = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: '20px',
  padding: '20px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '16px',
  marginBottom: '20px',
};

const resultItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const resultValue = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#00F5D4',
  marginBottom: '5px',
};

const resultLabel = {
  fontSize: '0.75rem',
  color: '#888',
  textAlign: 'center',
};

const clientInfo = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const client = {
  fontSize: '0.95rem',
  color: '#aaa',
  fontWeight: 600,
};

const year = {
  fontSize: '0.95rem',
  color: '#00F5D4',
  fontWeight: 600,
  padding: '4px 12px',
  background: 'rgba(0, 245, 212, 0.1)',
  borderRadius: '12px',
  border: '1px solid rgba(0, 245, 212, 0.3)',
};

const statsSection = {
  marginTop: '80px',
  padding: '60px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '32px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '40px',
};

const statItem = {
  textAlign: 'center',
};

const statNumber = {
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
  lineHeight: '1',
};

const statLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};
