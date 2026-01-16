import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
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
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={getHeadingStyle(windowWidth)}>Case Studies</h2>
        <p style={getSubheadingStyle(windowWidth)}>Real-world impact and measurable results</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={getIntroTextStyle(windowWidth)}
        >
          Explore how we've helped Fortune 500 companies and leading enterprises transform their
          operations, reduce costs, and achieve remarkable growth. Each case study demonstrates our
          commitment to delivering measurable business outcomes through innovative technology solutions.
        </motion.p>
      </motion.div>

      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {caseStudies.map((caseStudy) => (
          <motion.div
            key={caseStudy.id}
            variants={cardVariants}
            whileHover={{ y: windowWidth > 768 ? -15 : 0, scale: windowWidth > 768 ? 1.03 : 1 }}
            style={getCardStyle(windowWidth)}
          >
            <div style={getImageContainerStyle(windowWidth)}>
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                style={getImageStyle(windowWidth)}
                loading="lazy"
              />
              <div style={getOverlayStyle(windowWidth)} />
              <div style={getTagsContainerStyle(windowWidth)}>
                {caseStudy.tags.map((tag, idx) => (
                  <span key={idx} style={getTagStyle(windowWidth)}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={getContentStyle(windowWidth)}>
              <span style={getIndustryStyle(windowWidth)}>{caseStudy.industry}</span>
              <h3 style={getTitleStyle(windowWidth)}>{caseStudy.title}</h3>
              <p style={getDescriptionStyle(windowWidth)}>{caseStudy.description}</p>
              <div style={getResultsStyle(windowWidth)}>
                {Object.entries(caseStudy.results).map(([key, value], idx) => (
                  <div key={idx} style={getResultItemStyle(windowWidth)}>
                    <span style={getResultValueStyle(windowWidth)}>{value}</span>
                    <span style={getResultLabelStyle(windowWidth)}>
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
              <div style={getClientInfoStyle(windowWidth)}>
                <div style={getClientStyle(windowWidth)}>Client: {caseStudy.client}</div>
                <div style={getYearStyle(windowWidth)}>Year: {caseStudy.year}</div>
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
        style={getStatsSectionStyle(windowWidth)}
      >
        <div style={getStatsGridStyle(windowWidth)}>
          <div style={getStatItemStyle(windowWidth)}>
            <div style={getStatNumberStyle(windowWidth)}>100+</div>
            <div style={getStatLabelStyle(windowWidth)}>Case Studies</div>
          </div>
          <div style={getStatItemStyle(windowWidth)}>
            <div style={getStatNumberStyle(windowWidth)}>$2.5B+</div>
            <div style={getStatLabelStyle(windowWidth)}>Cost Savings Delivered</div>
          </div>
          <div style={getStatItemStyle(windowWidth)}>
            <div style={getStatNumberStyle(windowWidth)}>98%</div>
            <div style={getStatLabelStyle(windowWidth)}>Project Success Rate</div>
          </div>
          <div style={getStatItemStyle(windowWidth)}>
            <div style={getStatNumberStyle(windowWidth)}>45+</div>
            <div style={getStatLabelStyle(windowWidth)}>Industry Verticals</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '60px 20px',
      background: '#0a0a0a',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: '#0a0a0a',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    };
  }
  return {
    padding: '100px 10vw',
    background: '#0a0a0a',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
      borderRadius: '24px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
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

const getIndustryStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'inline-block',
      padding: '5px 12px',
      background: 'rgba(123, 44, 191, 0.2)',
      borderRadius: '18px',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: '#7B2CBF',
      marginBottom: '12px',
      wordWrap: 'break-word',
    };
  }
  return {
    display: 'inline-block',
    padding: '6px 14px',
    background: 'rgba(123, 44, 191, 0.2)',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#7B2CBF',
    marginBottom: '15px',
    wordWrap: 'break-word',
  };
};

const getTitleStyle = (width) => {
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
    margin: '0 0 15px 0',
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
    lineHeight: '1.7',
    color: '#aaa',
    marginBottom: '25px',
    wordWrap: 'break-word',
  };
};

const getResultsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      padding: '15px',
      background: 'rgba(0, 245, 212, 0.05)',
      borderRadius: '14px',
      marginBottom: '15px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '20px',
    padding: '20px',
    background: 'rgba(0, 245, 212, 0.05)',
    borderRadius: '16px',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getResultItemStyle = (width) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
};

const getResultValueStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#00F5D4',
      marginBottom: '3px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#00F5D4',
    marginBottom: '5px',
    wordWrap: 'break-word',
  };
};

const getResultLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.7rem',
      color: '#888',
      textAlign: 'center',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.75rem',
    color: '#888',
    textAlign: 'center',
    wordWrap: 'break-word',
  };
};

const getImageContainerStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'relative',
      width: '100%',
      height: '180px',
      overflow: 'hidden',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'relative',
    width: '100%',
    height: '250px',
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

const getOverlayStyle = (width) => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
  };
};

const getTagsContainerStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'absolute',
      bottom: '10px',
      left: '15px',
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
    };
  }
  return {
    position: 'absolute',
    bottom: '15px',
    left: '20px',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  };
};

const getTagStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '5px 10px',
      background: 'rgba(0, 245, 212, 0.2)',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      borderRadius: '16px',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: '#00F5D4',
    };
  }
  return {
    padding: '6px 14px',
    background: 'rgba(0, 245, 212, 0.2)',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#00F5D4',
  };
};

const getClientInfoStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getClientStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.85rem',
      color: '#aaa',
      fontWeight: 600,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.95rem',
    color: '#aaa',
    fontWeight: 600,
    wordWrap: 'break-word',
  };
};

const getYearStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.85rem',
      color: '#00F5D4',
      fontWeight: 600,
      padding: '4px 10px',
      background: 'rgba(0, 245, 212, 0.1)',
      borderRadius: '10px',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.95rem',
    color: '#00F5D4',
    fontWeight: 600,
    padding: '4px 12px',
    background: 'rgba(0, 245, 212, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    wordWrap: 'break-word',
  };
};

const getStatsSectionStyle = (width) => {
  if (width <= 768) {
    return {
      marginTop: '50px',
      padding: '40px 25px',
      background: 'rgba(0, 245, 212, 0.05)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    marginTop: '80px',
    padding: '60px',
    background: 'rgba(0, 245, 212, 0.05)',
    borderRadius: '32px',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getStatsGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px',
      width: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '40px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getStatItemStyle = (width) => {
  if (width <= 768) {
    return {
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getStatNumberStyle = (width) => {
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

const getStatLabelStyle = (width) => {
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
