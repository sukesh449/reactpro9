import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyStats from '../components/CompanyStats';
import GrowthChart from '../components/GrowthChart';
import Industries from '../components/Industries';
import CaseStudies from '../components/CaseStudies';
import Ratings from '../components/Ratings';
import Testimonials from '../components/Testimonials';
import Investors from '../components/Investors';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <section style={getHeroSectionStyle(windowWidth)}>
        {/* Animated Gradient Background */}
        <div style={backgroundContainer}>
          {/* Animated Gradient Background */}
          <motion.div
            style={animatedBackground}
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0,245,212,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(123,44,191,0.15) 100%)',
                'radial-gradient(circle at 80% 50%, rgba(123,44,191,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(0,245,212,0.15) 100%)',
                'radial-gradient(circle at 50% 20%, rgba(0,245,212,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(123,44,191,0.15) 100%)',
                'radial-gradient(circle at 20% 50%, rgba(0,245,212,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(123,44,191,0.15) 100%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Animated Particles/Orbs Background */}
          <div style={particlesContainer}>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  ...particle,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0.1, 0.8, 0.1],
                  scale: [0.3, 1.5, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Grid Pattern Overlay */}
          <div style={gridPattern} />
        </div>
        <div style={getOverlayStyle(windowWidth)}>
          {/* Animated Background Elements */}
          <motion.div
            style={animatedCircle1}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            style={animatedCircle2}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            style={getHeroContentStyle(windowWidth)}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              style={getHeroTitleStyle(windowWidth)}
              animate={{
                textShadow: [
                  '0 0 20px rgba(0,245,212,0.5)',
                  '0 0 40px rgba(123,44,191,0.5)',
                  '0 0 20px rgba(0,245,212,0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Powering Global Digital Transformation
            </motion.h1>
            <motion.p variants={itemVariants} style={getHeroSubtitleStyle(windowWidth)}>
              Trusted by Fortune 500 companies worldwide. We deliver cutting-edge technology solutions that drive innovation, accelerate growth, and transform businesses across 50+ countries.
            </motion.p>
            <motion.div variants={itemVariants} style={getHeroStatsStyle(windowWidth)}>
              <div style={getHeroStatItemStyle(windowWidth)}>
                <div style={getHeroStatNumberStyle(windowWidth)}>20+</div>
                <div style={getHeroStatLabelStyle(windowWidth)}>Years Experience</div>
              </div>
              <div style={getHeroStatItemStyle(windowWidth)}>
                <div style={getHeroStatNumberStyle(windowWidth)}>2,500+</div>
                <div style={getHeroStatLabelStyle(windowWidth)}>Team Members</div>
              </div>
              <div style={getHeroStatItemStyle(windowWidth)}>
                <div style={getHeroStatNumberStyle(windowWidth)}>1,200+</div>
                <div style={getHeroStatLabelStyle(windowWidth)}>Projects Delivered</div>
              </div>
              <div style={getHeroStatItemStyle(windowWidth)}>
                <div style={getHeroStatNumberStyle(windowWidth)}>500+</div>
                <div style={getHeroStatLabelStyle(windowWidth)}>Global Clients</div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} style={getCtaContainerStyle(windowWidth)}>
              <motion.button
                style={getCtaStyle(windowWidth)}
                whileHover={{ scale: windowWidth > 768 ? 1.05 : 1, boxShadow: windowWidth > 768 ? '0 20px 40px rgba(0, 245, 212, 0.4)' : 'none' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document
                    .querySelector('#case-studies')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Our Impact
                <motion.span
                  style={arrow}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              <motion.button
                style={getCtaSecondaryStyle(windowWidth)}
                whileHover={{ scale: windowWidth > 768 ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/services';
                }}
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* <CompanyStats />
      <GrowthChart />
       */}
      {/* Why Choose Us Section */}
      <section style={getWhyChooseSectionStyle(windowWidth)}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={whyChooseHeader}
        >
          <h2 style={getWhyChooseTitleStyle(windowWidth)}>Why Choose Nexoris?</h2>
          <p style={getWhyChooseSubtitleStyle(windowWidth)}>
            We combine expertise, innovation, and dedication to deliver exceptional results
          </p>
        </motion.div>
        <div style={getWhyChooseGridStyle(windowWidth)}>
          {[
            {
              icon: '🚀',
              title: 'Innovation First',
              description: 'We stay ahead of technology trends, leveraging cutting-edge tools and methodologies to solve complex challenges.',
            },
            {
              icon: '⚡',
              title: 'Rapid Delivery',
              description: 'Agile development processes ensure faster time-to-market without compromising quality or reliability.',
            },
            {
              icon: '🌍',
              title: 'Global Expertise',
              description: 'With teams across 50+ countries, we bring diverse perspectives and local market knowledge to every project.',
            },
            {
              icon: '🎯',
              title: 'Results-Driven',
              description: 'Our success metrics speak for themselves - 95% client satisfaction rate and 98% project delivery on time.',
            },
            {
              icon: '🔒',
              title: 'Enterprise Security',
              description: 'Bank-level security protocols and compliance with ISO 27001, SOC 2, and GDPR standards.',
            },
            {
              icon: '💎',
              title: 'Quality Assurance',
              description: 'Rigorous testing and quality control processes ensure robust, scalable, and maintainable solutions.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={getWhyChooseCardStyle(windowWidth)}
              whileHover={{ y: windowWidth > 768 ? -10 : 0, scale: windowWidth > 768 ? 1.02 : 1 }}
            >
              <div style={getWhyChooseIconStyle(windowWidth)}>{item.icon}</div>
              <h3 style={getWhyChooseCardTitleStyle(windowWidth)}>{item.title}</h3>
              <p style={getWhyChooseCardDescStyle(windowWidth)}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Industries />
      <div id="case-studies">
        <CaseStudies />
      </div>
      <Ratings />
      <Testimonials />
      <Investors />
    </>
  );
}

// Responsive style functions for Home page
const getHeroSectionStyle = (width) => {
  return {
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const getHeroContentStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '20px 0',
      maxWidth: '100%',
      zIndex: 1,
      marginTop: '60px',
      marginBottom: '80px',
      width: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '20px 0',
    maxWidth: '800px',
    zIndex: 1,
    marginTop: '90px',
    marginBottom: '130px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getHeroTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.8rem',
      fontWeight: 800,
      lineHeight: '1.2',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #fff 0%, #00F5D4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '2.2rem',
      fontWeight: 800,
      lineHeight: '1.1',
      marginBottom: '1.8rem',
      background: 'linear-gradient(135deg, #fff 0%, #00F5D4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '2.5rem',
    fontWeight: 800,
    lineHeight: '1.1',
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #fff 0%, #00F5D4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getHeroSubtitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#ccc',
      marginBottom: '2rem',
      lineHeight: '1.6',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: '#ccc',
      marginBottom: '2.2rem',
      lineHeight: '1.6',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.5rem',
    fontWeight: 400,
    color: '#ccc',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    wordWrap: 'break-word',
  };
};

const getHeroStatsStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '2rem',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      padding: '0 10px',
    };
  }
  return {
    display: 'flex',
    gap: '40px',
    marginBottom: '2.5rem',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
  };
};

const getHeroStatItemStyle = (width) => {
  if (width <= 768) {
    return {
      textAlign: 'center',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    textAlign: 'center',
    flex: '1',
    minWidth: '120px',
  };
};

const getHeroStatNumberStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.8rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
    };
  }
  return {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
  };
};

const getHeroStatLabelStyle = (width) => {
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

const getCtaContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '100%',
      padding: '0 10px',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    gap: '20px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getCtaStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '14px 32px',
      borderRadius: '40px',
      border: 'none',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      color: '#000',
      fontWeight: 700,
      fontSize: '0.95rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      boxShadow: '0 8px 25px rgba(0, 245, 212, 0.3)',
      transition: 'all 0.3s ease',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '18px 48px',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    color: '#000',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
    transition: 'all 0.3s ease',
    width: 'auto',
    boxSizing: 'border-box',
  };
};

const getCtaSecondaryStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '14px 32px',
      borderRadius: '40px',
      border: '2px solid rgba(0, 245, 212, 0.5)',
      background: 'transparent',
      color: '#00F5D4',
      fontWeight: 600,
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '18px 48px',
    borderRadius: '50px',
    border: '2px solid rgba(0, 245, 212, 0.5)',
    background: 'transparent',
    color: '#00F5D4',
    fontWeight: 600,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: 'auto',
    boxSizing: 'border-box',
  };
};

const getWhyChooseSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '60px 20px',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      padding: '80px 5vw',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '120px 10vw',
    background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const getWhyChooseTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      fontWeight: 800,
      marginBottom: '15px',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '3rem',
    fontWeight: 800,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getWhyChooseSubtitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
      color: '#888',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.2rem',
    color: '#888',
    wordWrap: 'break-word',
  };
};

const getWhyChooseGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '20px',
      marginTop: '40px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px',
      marginTop: '60px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    marginTop: '80px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getWhyChooseCardStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '30px 20px',
      borderRadius: '24px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      textAlign: 'center',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'visible',
    };
  }
  return {
    padding: '40px 30px',
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'visible',
  };
};

const getWhyChooseIconStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '3rem',
      marginBottom: '20px',
      display: 'block',
    };
  }
  return {
    fontSize: '4rem',
    marginBottom: '25px',
    display: 'block',
  };
};

const getWhyChooseCardTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '15px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '15px',
    wordWrap: 'break-word',
  };
};

const getWhyChooseCardDescStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      color: '#aaa',
      lineHeight: '1.6',
      wordWrap: 'break-word',
      maxWidth: '100%',
    };
  }
  return {
    fontSize: '1rem',
    color: '#aaa',
    lineHeight: '1.7',
    wordWrap: 'break-word',
    maxWidth: '100%',
  };
};

const heroSection = {
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};

const backgroundContainer = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
  background: '#0a0a0a',
};

const animatedBackground = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
};

const gridPattern = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px',
  zIndex: 1,
  pointerEvents: 'none',
};


const particlesContainer = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  pointerEvents: 'none',
  overflow: 'hidden',
};

const particle = {
  position: 'absolute',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,245,212,0.8) 0%, rgba(123,44,191,0.4) 50%, transparent 100%)',
  boxShadow: '0 0 20px rgba(0,245,212,0.6), 0 0 40px rgba(123,44,191,0.4)',
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
};

const getOverlayStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 20px',
      color: '#fff',
      zIndex: 2,
      overflow: 'hidden',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 5vw',
      color: '#fff',
      zIndex: 2,
      overflow: 'hidden',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 10vw',
    color: '#fff',
    zIndex: 2,
    overflow: 'hidden',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const overlay = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 10vw',
  color: '#fff',
  zIndex: 2,
  overflow: 'hidden',
};

const animatedCircle1 = {
  position: 'absolute',
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%)',
  top: '-200px',
  right: '-200px',
  filter: 'blur(40px)',
  pointerEvents: 'none',
};

const animatedCircle2 = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(123,44,191,0.15) 0%, transparent 70%)',
  bottom: '-150px',
  left: '-150px',
  filter: 'blur(40px)',
  pointerEvents: 'none',
};

const heroContent = {
  padding:'20px 0',
  maxWidth: '800px',
  zIndex: 1,
  marginTop: '90px',
  marginBottom: '130px',
};

const heroTitle = {
  fontSize: '2.5rem',
  fontWeight: 800,
  lineHeight: '1.1',
  marginBottom: '2rem',
  background: 'linear-gradient(135deg, #fff 0%, #00F5D4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
 
};

const heroSubtitle = {
  fontSize: '1.5rem',
  fontWeight: 400,
  color: '#ccc',
  marginBottom: '2.5rem',
  lineHeight: '1.6',
};

const cta = {
  padding: '18px 48px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
  transition: 'all 0.3s ease',
};

const arrow = {
  fontSize: '1.5rem',
  display: 'inline-block',
};


const heroStats = {
  display: 'flex',
  gap: '40px',
  marginBottom: '40px',
  flexWrap: 'wrap',
};

const heroStatItem = {
  textAlign: 'center',
};

const heroStatNumber = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '5px',
  lineHeight: '1',
};

const heroStatLabel = {
  fontSize: '0.9rem',
  color: '#aaa',
  fontWeight: 500,
};

const ctaContainer = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '130px',
};

const ctaSecondary = {
  padding: '18px 48px',
  borderRadius: '50px',
  border: '2px solid rgba(0, 245, 212, 0.5)',
  background: 'transparent',
  color: '#00F5D4',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const whyChooseSection = {
  padding: '120px',
  background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
};

const whyChooseHeader = {
  textAlign: 'center',
  marginBottom: '80px',
};

const whyChooseTitle = {
  fontSize: '3.5rem',
  fontWeight: 800,
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const whyChooseSubtitle = {
  fontSize: '1.3rem',
  color: '#888',
  maxWidth: '700px',
  margin: '0 auto',
};

const whyChooseGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '40px',
};

const whyChooseCard = {
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(26,26,26,0.9) 0%, rgba(15,15,15,0.9) 100%)',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const whyChooseIcon = {
  fontSize: '4rem',
  marginBottom: '25px',
  filter: 'drop-shadow(0 10px 20px rgba(0, 245, 212, 0.3))',
};

const whyChooseCardTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '20px',
};

const whyChooseCardDesc = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};
