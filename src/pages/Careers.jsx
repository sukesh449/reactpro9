import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';

export default function Careers() {
  const [activeTab, setActiveTab] = useState('positions');
  const [jobs, setJobs] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, benefitsRes] = await Promise.all([
          apiService.getJobs(),
          apiService.getBenefits(),
        ]);
        setJobs(jobsRes.data || []);
        setBenefits(benefitsRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setJobs([]);
        setBenefits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { id: 'positions', label: 'Open Positions', icon: '💼' },
    { id: 'benefits', label: 'Benefits', icon: '🎁' },
    { id: 'culture', label: 'Culture', icon: '🌟' },
    { id: 'internships', label: 'Internships', icon: '🎓' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <section style={section}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={header}
      >
        <h1 style={title}>Join Our Team</h1>
        <p style={subtitle}>
          Build the future of digital transformation with 2,500+ professionals
          worldwide
        </p>
      </motion.div>

      <div style={tabsContainer}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...tabButton,
              ...(activeTab === tab.id ? activeTabButton : {}),
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={tabIcon}>{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={content}
        >
          {activeTab === 'positions' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={positionsHeader}>
                <h2 style={sectionTitle}>Open Positions</h2>
                <p style={positionsSubtitle}>
                  Explore exciting career opportunities across departments
                </p>
              </div>

              <motion.div
                variants={itemVariants}
                style={positionsIntroSection}
              >
                <p style={positionsIntroText}>
                  At Nexoris, we're always looking for talented individuals who are passionate about technology 
                  and innovation. Our open positions span across engineering, design, data science, security, 
                  and business development. Whether you're a seasoned professional or just starting your career, 
                  we offer opportunities to work on cutting-edge projects with Fortune 500 clients.
                </p>
                <p style={positionsIntroText}>
                  We believe in hiring for potential and growth mindset, not just experience. Our hiring process 
                  is designed to be transparent, fair, and efficient. We value diverse perspectives and welcome 
                  candidates from all backgrounds. Most positions offer flexible work arrangements, including 
                  remote and hybrid options.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                style={positionsInfoCards}
              >
                <motion.div
                  style={infoCard}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div style={infoCardIcon}>🌍</div>
                  <h4 style={infoCardTitle}>Global Opportunities</h4>
                  <p style={infoCardText}>
                    Work with teams across 15+ countries. Remote and hybrid options available for most positions.
                  </p>
                </motion.div>
                <motion.div
                  style={infoCard}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div style={infoCardIcon}>📈</div>
                  <h4 style={infoCardTitle}>Career Growth</h4>
                  <p style={infoCardText}>
                    Clear career paths with mentorship programs, skill development, and promotion opportunities.
                  </p>
                </motion.div>
                <motion.div
                  style={infoCard}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div style={infoCardIcon}>⚡</div>
                  <h4 style={infoCardTitle}>Fast Hiring Process</h4>
                  <p style={infoCardText}>
                    Our streamlined process typically takes 2-3 weeks from application to offer.
                  </p>
                </motion.div>
              </motion.div>

              <div style={jobsGrid}>
                {jobs
                  .filter((job) => job.type === 'Full-time')
                  .map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      style={jobCard}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div style={jobHeader}>
                        <h3 style={jobTitle}>{job.title}</h3>
                        <span style={jobType}>{job.type}</span>
                      </div>
                      <div style={jobMeta}>
                        <span style={jobLocation}>📍 {job.location}</span>
                        <span style={jobExperience}>💼 {job.experience}</span>
                      </div>
                      <p style={jobDescription}>{job.description}</p>
                      <div style={jobRequirements}>
                        {job.requirements && job.requirements.length > 0 ? (
                          job.requirements.slice(0, 3).map((req, idx) => (
                            <span key={idx} style={requirementTag}>
                              {req}
                            </span>
                          ))
                        ) : null}
                      </div>
                      <motion.button
                        style={applyButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now →
                      </motion.button>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'benefits' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={benefitsHeader}>
                <h2 style={sectionTitle}>Employee Benefits</h2>
                <p style={benefitsSubtitle}>
                  Comprehensive benefits package designed to support your well-being and growth
                </p>
              </div>

              <motion.div
                variants={itemVariants}
                style={benefitsIntroSection}
              >
                <p style={benefitsIntroText}>
                  We understand that our team members are our greatest asset, and we're committed to providing 
                  a benefits package that supports both your professional and personal well-being. Our comprehensive 
                  benefits are designed to help you thrive at work and in life, covering everything from health 
                  and wellness to professional development and financial security.
                </p>
                <p style={benefitsIntroText}>
                  All full-time employees are eligible for our complete benefits package from day one. We regularly 
                  review and enhance our benefits based on employee feedback to ensure we're meeting the evolving 
                  needs of our diverse, global team.
                </p>
              </motion.div>

              <div style={benefitsGrid}>
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit.id}
                    variants={itemVariants}
                    style={benefitCard}
                    whileHover={{ y: -10, rotate: 2 }}
                  >
                    <div style={benefitIcon}>{benefit.icon}</div>
                    <h3 style={benefitTitle}>{benefit.title}</h3>
                    <p style={benefitDescription}>{benefit.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                style={benefitsAdditionalSection}
              >
                <h3 style={benefitsAdditionalTitle}>And So Much More</h3>
                <div style={benefitsAdditionalGrid}>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🎯</div>
                    <h4 style={additionalBenefitTitle}>Performance Bonuses</h4>
                    <p style={additionalBenefitText}>Quarterly and annual performance-based bonuses</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🏢</div>
                    <h4 style={additionalBenefitTitle}>Modern Workspaces</h4>
                    <p style={additionalBenefitText}>State-of-the-art offices with ergonomic setups</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🍽️</div>
                    <h4 style={additionalBenefitTitle}>Meal Allowances</h4>
                    <p style={additionalBenefitText}>Daily meal credits and stocked kitchens</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🚗</div>
                    <h4 style={additionalBenefitTitle}>Transportation</h4>
                    <p style={additionalBenefitText}>Commuter benefits and parking allowances</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🎉</div>
                    <h4 style={additionalBenefitTitle}>Team Events</h4>
                    <p style={additionalBenefitText}>Regular team building activities and company outings</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>💻</div>
                    <h4 style={additionalBenefitTitle}>Tech Equipment</h4>
                    <p style={additionalBenefitText}>Latest laptops, monitors, and productivity tools</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>👶</div>
                    <h4 style={additionalBenefitTitle}>Parental Leave</h4>
                    <p style={additionalBenefitText}>Generous paid parental leave for new parents</p>
                  </motion.div>
                  <motion.div
                    style={additionalBenefitCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={additionalBenefitIcon}>🎁</div>
                    <h4 style={additionalBenefitTitle}>Referral Bonuses</h4>
                    <p style={additionalBenefitText}>Earn rewards for referring great talent</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'culture' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 style={sectionTitle}>Our Culture</h2>
              <div style={cultureContent}>
                <motion.div variants={itemVariants} style={cultureText}>
                  <p style={paragraph}>
                    At Nexoris, we believe that great technology comes from great
                    people. Our culture is built on innovation, collaboration, and
                    a shared passion for solving complex challenges.
                  </p>
                  <p style={paragraph}>
                    We foster an environment where creativity thrives, diversity is
                    celebrated, and every voice is heard. From flexible work
                    arrangements to continuous learning opportunities, we're
                    committed to supporting our team's growth and well-being.
                  </p>
                </motion.div>
                <div style={cultureStats}>
                  {[
                    { label: 'Employee Satisfaction', value: '95%' },
                    { label: 'Remote Workers', value: '70%' },
                    { label: 'Promotion Rate', value: '25%' },
                    { label: 'Training Hours/Year', value: '80+' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      style={cultureStatCard}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div style={cultureStatValue}>{stat.value}</div>
                      <div style={cultureStatLabel}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'internships' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={internshipsHeader}>
                <h2 style={sectionTitle}>Internship Programs</h2>
                <p style={internshipsSubtitle}>
                  Kickstart your career with hands-on experience in cutting-edge technology
                </p>
              </div>

              <motion.div
                variants={itemVariants}
                style={internshipsIntroSection}
              >
                <p style={internshipsIntroText}>
                  Our internship programs are designed to provide students and recent graduates with real-world 
                  experience working on meaningful projects alongside industry experts. Whether you're interested 
                  in software engineering, data science, cybersecurity, or product design, our internships offer 
                  a unique opportunity to learn, grow, and make a real impact.
                </p>
                <p style={internshipsIntroText}>
                  Interns at Nexoris work on actual client projects, participate in code reviews, attend team 
                  meetings, and contribute to our product development. We believe in treating interns as full 
                  team members, providing mentorship, feedback, and opportunities for professional growth. Many 
                  of our interns go on to become full-time employees.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                style={internshipsFeaturesSection}
              >
                <h3 style={internshipsFeaturesTitle}>What Our Interns Get</h3>
                <div style={internshipsFeaturesGrid}>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>👨‍🏫</div>
                    <h4 style={internshipFeatureTitle}>Mentorship</h4>
                    <p style={internshipFeatureText}>
                      One-on-one mentorship from senior engineers and industry leaders
                    </p>
                  </motion.div>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>💼</div>
                    <h4 style={internshipFeatureTitle}>Real Projects</h4>
                    <p style={internshipFeatureText}>
                      Work on actual client projects, not just training exercises
                    </p>
                  </motion.div>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>💰</div>
                    <h4 style={internshipFeatureTitle}>Competitive Pay</h4>
                    <p style={internshipFeatureText}>
                      Paid internships with competitive compensation packages
                    </p>
                  </motion.div>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>📚</div>
                    <h4 style={internshipFeatureTitle}>Learning Resources</h4>
                    <p style={internshipFeatureText}>
                      Access to courses, certifications, and learning platforms
                    </p>
                  </motion.div>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>🌐</div>
                    <h4 style={internshipFeatureTitle}>Networking</h4>
                    <p style={internshipFeatureText}>
                      Connect with professionals across departments and locations
                    </p>
                  </motion.div>
                  <motion.div
                    style={internshipFeatureCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={internshipFeatureIcon}>🎯</div>
                    <h4 style={internshipFeatureTitle}>Career Path</h4>
                    <p style={internshipFeatureText}>
                      Potential for full-time offers based on performance
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <div style={jobsGrid}>
                {jobs
                  .filter((job) => job.type === 'Internship')
                  .map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      style={jobCard}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div style={jobHeader}>
                        <h3 style={jobTitle}>{job.title}</h3>
                        <span style={internshipTag}>{job.type}</span>
                      </div>
                      <div style={jobMeta}>
                        <span style={jobLocation}>📍 {job.location}</span>
                      </div>
                      <p style={jobDescription}>{job.description}</p>
                      <div style={jobRequirements}>
                        {job.requirements && job.requirements.length > 0 ? (
                          job.requirements.map((req, idx) => (
                            <span key={idx} style={requirementTag}>
                              {req}
                            </span>
                          ))
                        ) : null}
                      </div>
                      <motion.button
                        style={applyButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now →
                      </motion.button>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

const section = {
  padding: '120px 10vw 80px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
};

const header = {
  textAlign: 'center',
  marginBottom: '60px',
};

const title = {
  fontSize: '4rem',
  fontWeight: 800,
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitle = {
  fontSize: '1.5rem',
  color: '#888',
};

const tabsContainer = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
  marginBottom: '60px',
  flexWrap: 'wrap',
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  position: 'relative',
};

const tabButton = {
  padding: '14px 28px',
  borderRadius: '30px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  background: 'rgba(0, 245, 212, 0.05)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const activeTabButton = {
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  borderColor: 'transparent',
  color: '#000',
  boxShadow: '0 8px 30px rgba(0, 245, 212, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
  fontWeight: 700,
};

const tabIcon = {
  fontSize: '1.2rem',
};

const activeTabIndicator = {
  position: 'absolute',
  bottom: '-4px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60%',
  height: '2px',
  background: '#00F5D4',
  borderRadius: '1px',
  boxShadow: '0 0 8px rgba(0, 245, 212, 0.8)',
};

const content = {
  minHeight: '500px',
};

const loadingStyle = {
  padding: '100px',
  textAlign: 'center',
  color: '#fff',
  fontSize: '1.5rem',
};

const sectionTitle = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '40px',
  color: '#fff',
};

const jobsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '30px',
};

const jobCard = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
};

const jobHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px',
};

const jobTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  margin: 0,
};

const jobType = {
  padding: '6px 14px',
  background: 'rgba(0, 245, 212, 0.2)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#00F5D4',
};

const internshipTag = {
  padding: '6px 14px',
  background: 'rgba(123, 44, 191, 0.2)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#7B2CBF',
};

const jobMeta = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  flexWrap: 'wrap',
};

const jobLocation = {
  fontSize: '0.95rem',
  color: '#888',
};

const jobExperience = {
  fontSize: '0.95rem',
  color: '#888',
};

const jobDescription = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
  marginBottom: '20px',
};

const jobRequirements = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  marginBottom: '30px',
};

const requirementTag = {
  padding: '6px 14px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#00F5D4',
  fontWeight: 500,
};

const applyButton = {
  padding: '14px 32px',
  borderRadius: '30px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  width: '100%',
};

const benefitsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
};

const benefitCard = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const benefitIcon = {
  fontSize: '4rem',
  marginBottom: '20px',
};

const benefitTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const benefitDescription = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};

const cultureContent = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '60px',
  alignItems: 'start',
};

const cultureText = {
  maxWidth: '100%',
};

const paragraph = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  color: '#aaa',
  marginBottom: '25px',
};

const cultureStats = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '30px',
};

const cultureStatCard = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const cultureStatValue = {
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
};

const cultureStatLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const positionsHeader = {
  marginBottom: '40px',
  textAlign: 'left',
};

const positionsSubtitle = {
  fontSize: '1.1rem',
  color: '#888',
  marginTop: '10px',
  lineHeight: '1.6',
};

const benefitsHeader = {
  marginBottom: '40px',
  textAlign: 'center',
};

const benefitsSubtitle = {
  fontSize: '1.1rem',
  color: '#888',
  marginTop: '10px',
  lineHeight: '1.6',
  maxWidth: '700px',
  margin: '10px auto 0',
};

const internshipsHeader = {
  marginBottom: '40px',
  textAlign: 'left',
};

const internshipsSubtitle = {
  fontSize: '1.1rem',
  color: '#888',
  marginTop: '10px',
  lineHeight: '1.6',
};


const positionsIntroSection = {
  maxWidth: '900px',
  margin: '0 auto 50px',
  textAlign: 'center',
};

const positionsIntroText = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  marginBottom: '20px',
};

const positionsInfoCards = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
  marginBottom: '50px',
};

const infoCard = {
  padding: '30px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, rgba(0, 245, 212, 0.05) 0%, rgba(123, 44, 191, 0.05) 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const infoCardIcon = {
  fontSize: '3rem',
  marginBottom: '15px',
  filter: 'drop-shadow(0 5px 15px rgba(0, 245, 212, 0.3))',
};

const infoCardTitle = {
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '12px',
};

const infoCardText = {
  fontSize: '0.95rem',
  color: '#aaa',
  lineHeight: '1.6',
};

const benefitsIntroSection = {
  maxWidth: '900px',
  margin: '0 auto 50px',
  textAlign: 'center',
};

const benefitsIntroText = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  marginBottom: '20px',
};

const benefitsAdditionalSection = {
  marginTop: '60px',
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(0, 245, 212, 0.05) 0%, rgba(123, 44, 191, 0.05) 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const benefitsAdditionalTitle = {
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#fff',
  textAlign: 'center',
  marginBottom: '40px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const benefitsAdditionalGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '25px',
};

const additionalBenefitCard = {
  padding: '30px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const additionalBenefitIcon = {
  fontSize: '2.5rem',
  marginBottom: '15px',
  filter: 'drop-shadow(0 5px 15px rgba(0, 245, 212, 0.3))',
};

const additionalBenefitTitle = {
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '10px',
};

const additionalBenefitText = {
  fontSize: '0.9rem',
  color: '#aaa',
  lineHeight: '1.6',
};

const internshipsIntroSection = {
  maxWidth: '900px',
  margin: '0 auto 50px',
  textAlign: 'center',
};

const internshipsIntroText = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  marginBottom: '20px',
};

const internshipsFeaturesSection = {
  marginBottom: '50px',
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(0, 245, 212, 0.05) 0%, rgba(123, 44, 191, 0.05) 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const internshipsFeaturesTitle = {
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#fff',
  textAlign: 'center',
  marginBottom: '40px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const internshipsFeaturesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
};

const internshipFeatureCard = {
  padding: '35px',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const internshipFeatureIcon = {
  fontSize: '3rem',
  marginBottom: '20px',
  filter: 'drop-shadow(0 5px 15px rgba(0, 245, 212, 0.3))',
};

const internshipFeatureTitle = {
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '12px',
};

const internshipFeatureText = {
  fontSize: '0.95rem',
  color: '#aaa',
  lineHeight: '1.6',
};
