import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

export default function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={heading}>Investor Confidence</h2>
        <p style={subheading}>Backed by leading global institutions</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={introText}
        >
          We're proud to be backed by top-tier venture capital firms and strategic investors who share
          our vision of transforming businesses through technology. Their confidence in our team and
          solutions has enabled us to scale globally and innovate continuously.
        </motion.p>
      </motion.div>

      <motion.div
        style={grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {investors.map((investor) => (
          <motion.div
            key={investor.id}
            variants={cardVariants}
            whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
            style={card}
          >
            <div style={logoContainer}>
              <img
                src={investor.logo}
                alt={investor.name}
                style={logo}
                loading="lazy"
              />
            </div>
            <div style={content}>
              <h3 style={name}>{investor.name}</h3>
              <span style={type}>{investor.type}</span>
              <span style={investment}>{investor.investment}</span>
              <div style={investorDescription}>
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
        style={fundingSection}
      >
        <h3 style={fundingTitle}>Total Funding</h3>
        <div style={fundingAmount}>$150M+</div>
        <p style={fundingDescription}>
          Combined funding across Series A, B, and C rounds from leading investors
        </p>
        <div style={fundingStats}>
          <div style={fundingStatItem}>
            <div style={fundingStatLabel}>Series A</div>
            <div style={fundingStatValue}>$25M</div>
          </div>
          <div style={fundingStatItem}>
            <div style={fundingStatLabel}>Series B</div>
            <div style={fundingStatValue}>$50M</div>
          </div>
          <div style={fundingStatItem}>
            <div style={fundingStatLabel}>Series C</div>
            <div style={fundingStatValue}>$75M</div>
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
