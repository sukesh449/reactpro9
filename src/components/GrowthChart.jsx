import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GrowthChart() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const data = [
    { year: '2020', value: 20, label: '2020' },
    { year: '2021', value: 35, label: '2021' },
    { year: '2022', value: 55, label: '2022' },
    { year: '2023', value: 75, label: '2023' },
    { year: '2024', value: 95, label: '2024' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (custom) => ({
      height: `${custom}%`,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: custom * 0.05,
      },
    }),
  };

  return (
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={getHeadingStyle(windowWidth)}>Revenue Growth</h2>
        <p style={getSubheadingStyle(windowWidth)}>Steady growth trajectory over the years</p>
      </motion.div>

      <motion.div
        style={getChartContainerStyle(windowWidth)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div style={getChartWrapperStyle(windowWidth)}>
          {data.map((item, index) => (
            <motion.div key={item.year} style={barWrapper}>
              <motion.div
                custom={item.value}
                variants={barVariants}
                style={getBarStyle(windowWidth)}
                whileHover={{ scale: windowWidth > 768 ? 1.1 : 1 }}
              >
                <div style={getBarValueStyle(windowWidth)}>{item.value}%</div>
              </motion.div>
              <div style={getBarLabelStyle(windowWidth)}>{item.label}</div>
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
      marginBottom: '2rem',
      wordWrap: 'break-word',
      textAlign: 'center',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.2rem',
    color: '#888',
    marginBottom: '3rem',
    wordWrap: 'break-word',
  };
};

const getChartContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginTop: '40px',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'auto',
      padding: '0 10px',
    };
  }
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: '60px',
    width: '100%',
    boxSizing: 'border-box',
  };
};

const getChartWrapperStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      gap: '15px',
      alignItems: 'flex-end',
      height: '300px',
      width: '100%',
      maxWidth: '100%',
      justifyContent: 'space-around',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-end',
      height: '350px',
      width: '100%',
      maxWidth: '100%',
      justifyContent: 'space-around',
      boxSizing: 'border-box',
    };
  }
  return {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-end',
    height: '400px',
    width: '100%',
    maxWidth: '800px',
    justifyContent: 'space-around',
    boxSizing: 'border-box',
  };
};

const getBarStyle = (width) => {
  if (width <= 768) {
    return {
      width: '100%',
      maxWidth: '50px',
      background: 'linear-gradient(180deg, #00F5D4 0%, #7B2CBF 100%)',
      borderRadius: '10px 10px 0 0',
      position: 'relative',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(0, 245, 212, 0.3)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10px',
      boxSizing: 'border-box',
    };
  }
  return {
    width: '100%',
    maxWidth: '80px',
    background: 'linear-gradient(180deg, #00F5D4 0%, #7B2CBF 100%)',
    borderRadius: '12px 12px 0 0',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0 10px 40px rgba(0, 245, 212, 0.3)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15px',
    boxSizing: 'border-box',
  };
};

const getBarValueStyle = (width) => {
  if (width <= 768) {
    return {
      color: '#fff',
      fontWeight: 700,
      fontSize: '0.85rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      wordWrap: 'break-word',
    };
  }
  return {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    wordWrap: 'break-word',
  };
};

const getBarLabelStyle = (width) => {
  if (width <= 768) {
    return {
      marginTop: '12px',
      color: '#888',
      fontSize: '0.85rem',
      fontWeight: 600,
      wordWrap: 'break-word',
    };
  }
  return {
    marginTop: '15px',
    color: '#888',
    fontSize: '1rem',
    fontWeight: 600,
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
  marginBottom: '3rem',
};

const chartContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  marginTop: '60px',
};

const chartWrapper = {
  display: 'flex',
  gap: '30px',
  alignItems: 'flex-end',
  height: '400px',
  width: '100%',
  maxWidth: '800px',
  justifyContent: 'space-around',
};

const barWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  height: '100%',
};

const bar = {
  width: '100%',
  maxWidth: '80px',
  background: 'linear-gradient(180deg, #00F5D4 0%, #7B2CBF 100%)',
  borderRadius: '12px 12px 0 0',
  position: 'relative',
  cursor: 'pointer',
  boxShadow: '0 10px 40px rgba(0, 245, 212, 0.3)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '15px',
};

const barValue = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const barLabel = {
  marginTop: '15px',
  color: '#888',
  fontSize: '1rem',
  fontWeight: 600,
};
