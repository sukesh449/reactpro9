import { motion } from 'framer-motion';

export default function GrowthChart() {
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
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={heading}>Revenue Growth</h2>
        <p style={subheading}>Steady growth trajectory over the years</p>
      </motion.div>

      <motion.div
        style={chartContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div style={chartWrapper}>
          {data.map((item, index) => (
            <motion.div key={item.year} style={barWrapper}>
              <motion.div
                custom={item.value}
                variants={barVariants}
                style={bar}
                whileHover={{ scale: 1.1 }}
              >
                <div style={barValue}>{item.value}%</div>
              </motion.div>
              <div style={barLabel}>{item.label}</div>
            </motion.div>
          ))}
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
