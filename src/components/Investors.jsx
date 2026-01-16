import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Investors() {
  const [investors, setInvestors] = useState([]);
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
    const fetchInvestors = async () => {
      try {
        const response = await apiService.getInvestors();
        setInvestors(response.data);
      } catch (error) {
        console.error('Error fetching investors:', error);
        setInvestors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
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
    hidden: { opacity: 0, scale: 0.8, y: 50 },
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
        <h2 style={heading}>Investor Confidence</h2>
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
        <h2 style={getHeadingStyle(windowWidth)}>Investor Confidence</h2>
        <p style={getSubheadingStyle(windowWidth)}>Backed by leading global institutions</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={getIntroTextStyle(windowWidth)}
        >
          We're proud to be backed by top-tier venture capital firms and strategic investors who share
          our vision of transforming businesses through technology. Their confidence in our team and
          solutions has enabled us to scale globally and innovate continuously.
        </motion.p>
      </motion.div>

      <motion.div
        style={getGridStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {investors.map((investor) => (
          <motion.div
            key={investor.id}
            variants={cardVariants}
            whileHover={{ y: windowWidth > 768 ? -15 : 0, scale: windowWidth > 768 ? 1.05 : 1, rotateY: windowWidth > 768 ? 5 : 0 }}
            style={getCardStyle(windowWidth)}
          >
            <div style={getLogoContainerStyle(windowWidth)}>
              <img
                src={investor.logo}
                alt={investor.name}
                style={getLogoStyle(windowWidth)}
                loading="lazy"
              />
            </div>
            <div style={getContentStyle(windowWidth)}>
              <h3 style={getNameStyle(windowWidth)}>{investor.name}</h3>
              <span style={getTypeStyle(windowWidth)}>{investor.type}</span>
              <span style={getInvestmentStyle(windowWidth)}>{investor.investment}</span>
              <div style={getInvestorDescriptionStyle(windowWidth)}>
                {investor.type === 'VC Firm' && 'Strategic venture capital partner'}
                {investor.type === 'Private Equity' && 'Growth-focused private equity'}
                {investor.type === 'Strategic Investor' && 'Industry-leading strategic partner'}
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
        style={getFundingSectionStyle(windowWidth)}
      >
        <h3 style={getFundingTitleStyle(windowWidth)}>Total Funding</h3>
        <div style={getFundingAmountStyle(windowWidth)}>$150M+</div>
        <p style={getFundingDescriptionStyle(windowWidth)}>
          Combined funding across Series A, B, and C rounds from leading investors
        </p>
        <div style={getFundingStatsStyle(windowWidth)}>
          <div style={getFundingStatItemStyle(windowWidth)}>
            <div style={getFundingStatLabelStyle(windowWidth)}>Series A</div>
            <div style={getFundingStatValueStyle(windowWidth)}>$25M</div>
          </div>
          <div style={getFundingStatItemStyle(windowWidth)}>
            <div style={getFundingStatLabelStyle(windowWidth)}>Series B</div>
            <div style={getFundingStatValueStyle(windowWidth)}>$50M</div>
          </div>
          <div style={getFundingStatItemStyle(windowWidth)}>
            <div style={getFundingStatLabelStyle(windowWidth)}>Series C</div>
            <div style={getFundingStatValueStyle(windowWidth)}>$75M</div>
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
      padding: '30px 25px',
      borderRadius: '24px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      perspective: '1000px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '40px',
    borderRadius: '28px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    perspective: '1000px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getContentStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getNameStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#fff',
      margin: 0,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    wordWrap: 'break-word',
  };
};

const getTypeStyle = (width) => {
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

const getInvestmentStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'inline-block',
      padding: '6px 14px',
      background: 'rgba(0, 245, 212, 0.2)',
      border: '1px solid rgba(0, 245, 212, 0.3)',
      borderRadius: '18px',
      fontSize: '0.85rem',
      fontWeight: 600,
      color: '#00F5D4',
      marginTop: '8px',
      wordWrap: 'break-word',
    };
  }
  return {
    display: 'inline-block',
    padding: '8px 18px',
    background: 'rgba(0, 245, 212, 0.2)',
    border: '1px solid rgba(0, 245, 212, 0.3)',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#00F5D4',
    marginTop: '10px',
    wordWrap: 'break-word',
  };
};

const getInvestorDescriptionStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.75rem',
      color: '#666',
      marginTop: '6px',
      fontStyle: 'italic',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '8px',
    fontStyle: 'italic',
    wordWrap: 'break-word',
  };
};

const getFundingSectionStyle = (width) => {
  if (width <= 768) {
    return {
      marginTop: '50px',
      textAlign: 'center',
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
    textAlign: 'center',
    padding: '60px',
    background: 'rgba(0, 245, 212, 0.05)',
    borderRadius: '32px',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getFundingTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '15px',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '20px',
    wordWrap: 'break-word',
  };
};

const getFundingAmountStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '15px',
      lineHeight: '1',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '4.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '20px',
    lineHeight: '1',
    wordWrap: 'break-word',
  };
};

const getFundingDescriptionStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.95rem',
      color: '#aaa',
      marginBottom: '30px',
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.1rem',
    color: '#aaa',
    marginBottom: '40px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    wordWrap: 'break-word',
  };
};

const getFundingStatsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      width: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getFundingStatItemStyle = (width) => {
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

const getFundingStatLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      color: '#888',
      marginBottom: '8px',
      fontWeight: 500,
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1rem',
    color: '#888',
    marginBottom: '10px',
    fontWeight: 500,
    wordWrap: 'break-word',
  };
};

const getFundingStatValueStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.8rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
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

const investorDescription = {
  fontSize: '0.85rem',
  color: '#666',
  marginTop: '8px',
  fontStyle: 'italic',
};

const fundingSection = {
  marginTop: '80px',
  textAlign: 'center',
  padding: '60px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '32px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const fundingTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '20px',
};

const fundingAmount = {
  fontSize: '4.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '20px',
  lineHeight: '1',
};

const fundingDescription = {
  fontSize: '1.1rem',
  color: '#aaa',
  marginBottom: '40px',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const fundingStats = {
  display: 'flex',
  justifyContent: 'center',
  gap: '60px',
  flexWrap: 'wrap',
};

const fundingStatItem = {
  textAlign: 'center',
};

const fundingStatLabel = {
  fontSize: '1rem',
  color: '#888',
  marginBottom: '10px',
  fontWeight: 500,
};

const fundingStatValue = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginTop: '40px',
};

const card = {
  padding: '40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  perspective: '1000px',
};

const getLogoContainerStyle = (width) => {
  if (width <= 768) {
    return {
      width: '100%',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '25px',
      background: 'rgba(0, 245, 212, 0.05)',
      borderRadius: '16px',
      padding: '15px',
      boxSizing: 'border-box',
    };
  }
  return {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    background: 'rgba(0, 245, 212, 0.05)',
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box',
  };
};

const getLogoStyle = (width) => {
  if (width <= 768) {
    return {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.9,
      width: 'auto',
      height: 'auto',
    };
  }
  return {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
    opacity: 0.9,
    width: 'auto',
    height: 'auto',
  };
};

const logoContainer = {
  width: '100%',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '20px',
  padding: '20px',
};

const logo = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  filter: 'brightness(0) invert(1)',
  opacity: 0.9,
};

const content = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
};

const name = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  margin: 0,
};

const type = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const investment = {
  display: 'inline-block',
  padding: '8px 18px',
  background: 'rgba(0, 245, 212, 0.2)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#00F5D4',
  marginTop: '10px',
};
