import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');
  const [team, setTeam] = useState([]);
  const [awards, setAwards] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, awardsRes, valuesRes] = await Promise.all([
          apiService.getTeam(),
          apiService.getAwards(),
          apiService.getValues(),
        ]);
        setTeam(teamRes.data);
        setAwards(awardsRes.data);
        setValues(valuesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'story', label: 'Our Story', icon: '📖' },
    { id: 'team', label: 'Leadership Team', icon: '👥' },
    { id: 'values', label: 'Our Values', icon: '💎' },
    { id: 'awards', label: 'Awards & Recognition', icon: '🏆' },
    { id: 'global', label: 'Global Presence', icon: '🌍' },
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

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <section style={getSectionStyle(windowWidth)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={getHeaderStyle(windowWidth)}
      >
        <h1 style={getTitleStyle(windowWidth)}>About Nexoris</h1>
        <p style={getSubtitleStyle(windowWidth)}>
          Leading the digital transformation revolution since 2004
        </p>
      </motion.div>

      <div style={getTabsContainerStyle(windowWidth)}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...getTabButtonStyle(windowWidth),
              ...(activeTab === tab.id ? getActiveTabButtonStyle() : {}),
            }}
            whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={getTabIconStyle(windowWidth)}>{tab.icon}</span>
            {windowWidth > 480 && tab.label}
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
          {activeTab === 'story' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={getStorySectionStyle(windowWidth)}>
                <motion.div variants={itemVariants} style={storyHeader}>
                  <h2 style={getSectionTitleStyle(windowWidth)}>Our Journey</h2>
                  <p style={getIntroTextStyle(windowWidth)}>
                    From a small startup to a global technology leader
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} style={getTimelineContainerStyle(windowWidth)}>
                  <div style={getTimelineStyle(windowWidth)}>
                    {[
                      {
                        year: '2004',
                        title: 'Foundation',
                        description:
                          'Nexoris was founded with a vision to transform businesses through innovative technology solutions.',
                      },
                      {
                        year: '2010',
                        title: 'Global Expansion',
                        description:
                          'Expanded operations to 15 countries, establishing our presence as an international leader.',
                      },
                      {
                        year: '2015',
                        title: 'Enterprise Milestone',
                        description:
                          'Reached 500+ enterprise clients and launched our flagship cloud platform.',
                      },
                      {
                        year: '2020',
                        title: 'AI Integration',
                        description:
                          'Introduced AI/ML capabilities, revolutionizing our service offerings.',
                      },
                      {
                        year: '2024',
                        title: 'Industry Leader',
                        description:
                          'Serving 500+ clients across 50+ countries with 2,500+ team members.',
                      },
                    ].map((milestone, idx) => (
                      <motion.div
                        key={milestone.year}
                        variants={itemVariants}
                        style={getTimelineItemStyle(windowWidth)}
                        whileHover={{ scale: isMobile ? 1 : 1.05 }}
                      >
                        <div style={getTimelineYearStyle(windowWidth)}>{milestone.year}</div>
                        <div style={getTimelineContentStyle(windowWidth)}>
                          <h3 style={getTimelineTitleStyle(windowWidth)}>{milestone.title}</h3>
                          <p style={getTimelineDescriptionStyle(windowWidth)}>
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={getStatsGridStyle(windowWidth)}>
                  {[
                    { label: 'Founded', value: '2004', icon: '📅' },
                    { label: 'Employees', value: '2,500+', icon: '👨‍💼' },
                    { label: 'Countries', value: '50+', icon: '🌍' },
                    { label: 'Projects', value: '1,200+', icon: '✅' },
                    { label: 'Clients', value: '500+', icon: '🤝' },
                    { label: 'Revenue', value: '$500M+', icon: '💰' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      style={getStatCardStyle(windowWidth)}
                      whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
                    >
                      <div style={getStatIconStyle(windowWidth)}>{stat.icon}</div>
                      <div style={getStatValueStyle(windowWidth)}>{stat.value}</div>
                      <div style={getStatLabelStyle(windowWidth)}>{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} style={missionSection}>
                  <h3 style={missionTitle}>Our Mission</h3>
                  <p style={missionText}>
                    To empower businesses worldwide with cutting-edge technology
                    solutions that drive innovation, efficiency, and growth. We
                    are committed to delivering exceptional value and building
                    lasting partnerships with our clients.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={teamHeader}>
                <h2 style={sectionTitle}>Leadership Team</h2>
                <p style={teamSubtitle}>
                  Meet the visionary leaders driving our success
                </p>
              </div>
              <div style={teamGrid}>
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    style={teamCard}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div style={teamImageContainer}>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={teamImage}
                        loading="lazy"
                      />
                      <div style={teamImageOverlay} />
                    </div>
                    <h3 style={teamName}>{member.name}</h3>
                    <p style={teamRole}>{member.role}</p>
                    <p style={teamBio}>{member.bio}</p>
                    <motion.a
                      href={member.linkedin}
                      style={linkedinLink}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LinkedIn →
                    </motion.a>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={itemVariants} style={teamStats}>
                <div style={teamStatItem}>
                  <div style={teamStatNumber}>8</div>
                  <div style={teamStatLabel}>Executive Leaders</div>
                </div>
                <div style={teamStatItem}>
                  <div style={teamStatNumber}>50+</div>
                  <div style={teamStatLabel}>Years Combined Experience</div>
                </div>
                <div style={teamStatItem}>
                  <div style={teamStatNumber}>15+</div>
                  <div style={teamStatLabel}>Industries Served</div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'values' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={valuesHeader}>
                <h2 style={sectionTitle}>Our Core Values</h2>
                <p style={valuesSubtitle}>
                  The principles that guide everything we do
                </p>
              </div>

              <motion.div
                variants={itemVariants}
                style={valuesIntroSection}
              >
                <p style={valuesIntroText}>
                  At Nexoris, our values are not just words on a wall—they are the foundation of our culture, 
                  the compass for our decisions, and the driving force behind our success. For over two decades, 
                  these core principles have shaped how we work, how we innovate, and how we serve our clients. 
                  They reflect our commitment to excellence, our dedication to ethical practices, and our belief 
                  in the power of diverse perspectives to create transformative solutions.
                </p>
                <p style={valuesIntroText}>
                  Every project we undertake, every partnership we form, and every innovation we develop is 
                  grounded in these values. They guide our team members in their daily work, inform our 
                  strategic decisions, and ensure we deliver solutions that not only meet but exceed expectations 
                  while maintaining the highest standards of integrity and collaboration.
                </p>
              </motion.div>

              <div style={valuesGrid}>
                {values.map((value) => (
                  <motion.div
                    key={value.id}
                    variants={itemVariants}
                    style={valueCard}
                    whileHover={{ y: -10, rotate: 2, scale: 1.03 }}
                  >
                    <motion.div
                      style={valueIconContainer}
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <div style={valueIcon}>{value.icon}</div>
                    </motion.div>
                    <h3 style={valueTitle}>{value.title}</h3>
                    <p style={valueDescription}>{value.description}</p>
                    <div style={valueExamples}>
                      {value.title === 'Innovation' && (
                        <>
                          <span style={exampleTag}>Research & Development</span>
                          <span style={exampleTag}>Emerging Technologies</span>
                          <span style={exampleTag}>AI & Machine Learning</span>
                          <span style={exampleTag}>Cloud Solutions</span>
                        </>
                      )}
                      {value.title === 'Excellence' && (
                        <>
                          <span style={exampleTag}>Quality Assurance</span>
                          <span style={exampleTag}>Best Practices</span>
                          <span style={exampleTag}>Continuous Improvement</span>
                          <span style={exampleTag}>Client Satisfaction</span>
                        </>
                      )}
                      {value.title === 'Integrity' && (
                        <>
                          <span style={exampleTag}>Ethical Standards</span>
                          <span style={exampleTag}>Transparency</span>
                          <span style={exampleTag}>Data Privacy</span>
                          <span style={exampleTag}>Honest Communication</span>
                        </>
                      )}
                      {value.title === 'Collaboration' && (
                        <>
                          <span style={exampleTag}>Teamwork</span>
                          <span style={exampleTag}>Partnership</span>
                          <span style={exampleTag}>Cross-functional Teams</span>
                          <span style={exampleTag}>Client Co-creation</span>
                        </>
                      )}
                      {value.title === 'Diversity' && (
                        <>
                          <span style={exampleTag}>Inclusion</span>
                          <span style={exampleTag}>Equal Opportunity</span>
                          <span style={exampleTag}>Global Perspectives</span>
                          <span style={exampleTag}>Cultural Awareness</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                style={valuesCommitmentSection}
              >
                <h3 style={valuesCommitmentTitle}>Living Our Values</h3>
                <div style={valuesCommitmentGrid}>
                  <motion.div
                    variants={itemVariants}
                    style={commitmentCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={commitmentIcon}>📊</div>
                    <h4 style={commitmentCardTitle}>Values in Action</h4>
                    <p style={commitmentCardText}>
                      Our values are embedded in our performance reviews, project methodologies, and hiring processes. 
                      Every team member is evaluated not just on technical skills, but on how they embody these principles.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    style={commitmentCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={commitmentIcon}>🎯</div>
                    <h4 style={commitmentCardTitle}>Client Impact</h4>
                    <p style={commitmentCardText}>
                      Our commitment to these values directly translates to better outcomes for our clients. 
                      Integrity ensures trust, excellence delivers quality, and innovation drives competitive advantage.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    style={commitmentCard}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div style={commitmentIcon}>🌱</div>
                    <h4 style={commitmentCardTitle}>Continuous Growth</h4>
                    <p style={commitmentCardText}>
                      We regularly review and refine how we live these values, ensuring they evolve with our 
                      organization while maintaining their core essence. Our values committee meets quarterly to 
                      assess our progress and identify opportunities for improvement.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                style={valuesClosingSection}
              >
                <p style={valuesClosingText}>
                  <strong style={valuesClosingStrong}>Our Promise:</strong> These values are not negotiable. 
                  They are the non-negotiable foundation of who we are and what we stand for. Whether you're a 
                  client, partner, or team member, you can count on us to uphold these principles in every interaction, 
                  every project, and every decision we make.
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={awardsHeader}>
                <h2 style={sectionTitle}>Awards & Recognition</h2>
                <p style={awardsSubtitle}>
                  Recognized for excellence in technology and innovation
                </p>
              </div>
              <div style={awardsGrid}>
                {awards.map((award) => (
                  <motion.div
                    key={award.id}
                    variants={itemVariants}
                    style={awardCard}
                    whileHover={{ scale: 1.05, rotate: 2, y: -10 }}
                  >
                    <motion.div
                      style={awardIconContainer}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: award.id * 0.2,
                      }}
                    >
                      <div style={awardIcon}>{award.icon}</div>
                    </motion.div>
                    <h3 style={awardTitle}>{award.title}</h3>
                    <p style={awardOrg}>{award.organization}</p>
                    <div style={awardYearBadge}>
                      <span style={awardYear}>{award.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={itemVariants} style={recognitionSection}>
                <h3 style={recognitionTitle}>Additional Recognition</h3>
                <div style={recognitionList}>
                  {[
                    'Fortune 500 Technology Partner',
                    'Gartner Magic Quadrant Leader',
                    'ISO 27001 Certified',
                    'SOC 2 Type II Compliant',
                    'GDPR Compliant',
                    'AWS Advanced Consulting Partner',
                  ].map((recognition, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      style={recognitionItem}
                      whileHover={{ x: 10 }}
                    >
                      <span style={recognitionIcon}>✓</span>
                      <span style={recognitionText}>{recognition}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'global' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div style={globalHeader}>
                <h2 style={sectionTitle}>Global Presence</h2>
                <p style={globalSubtitle}>
                  Serving clients worldwide with local expertise
                </p>
              </div>
              <div style={globalStats}>
                {[
                  { label: 'Offices', value: '25+', icon: '🏢' },
                  { label: 'Countries', value: '50+', icon: '🌍' },
                  { label: 'Time Zones', value: '24/7', icon: '🕐' },
                  { label: 'Languages', value: '20+', icon: '🗣️' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    style={globalStatCard}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div style={globalStatIcon}>{stat.icon}</div>
                    <div style={globalStatValue}>{stat.value}</div>
                    <div style={globalStatLabel}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div style={officesGrid}>
                {[
                  {
                    city: 'San Francisco',
                    country: 'USA',
                    flag: '🇺🇸',
                    employees: '250+',
                    established: '2004',
                    address: '123 Market St, Suite 400',
                  },
                  {
                    city: 'London',
                    country: 'UK',
                    flag: '🇬🇧',
                    employees: '180+',
                    established: '2008',
                    address: '45 King Street, EC2V 8EA',
                  },
                  {
                    city: 'Berlin',
                    country: 'Germany',
                    flag: '🇩🇪',
                    employees: '120+',
                    established: '2010',
                    address: 'Potsdamer Platz 1',
                  },
                  {
                    city: 'Singapore',
                    country: 'Singapore',
                    flag: '🇸🇬',
                    employees: '200+',
                    established: '2012',
                    address: '10 Marina Boulevard',
                  },
                  {
                    city: 'Bangalore',
                    country: 'India',
                    flag: '🇮🇳',
                    employees: '800+',
                    established: '2015',
                    address: 'IT Park, Whitefield',
                  },
                  {
                    city: 'Sydney',
                    country: 'Australia',
                    flag: '🇦🇺',
                    employees: '150+',
                    established: '2018',
                    address: '100 George Street',
                  },
                ].map((office) => (
                  <motion.div
                    key={office.city}
                    variants={itemVariants}
                    style={officeCard}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div style={officeFlag}>{office.flag}</div>
                    <h3 style={officeCity}>{office.city}</h3>
                    <p style={officeCountry}>{office.country}</p>
                    <div style={officeDetails}>
                      <div style={officeDetailItem}>
                        <span style={officeDetailIcon}>👥</span>
                        <span style={officeDetailText}>
                          {office.employees} Employees
                        </span>
                      </div>
                      <div style={officeDetailItem}>
                        <span style={officeDetailIcon}>📅</span>
                        <span style={officeDetailText}>
                          Since {office.established}
                        </span>
                      </div>
                      <div style={officeDetailItem}>
                        <span style={officeDetailIcon}>📍</span>
                        <span style={officeDetailText}>{office.address}</span>
                      </div>
                    </div>
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

// Responsive style functions
const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '80px 20px 60px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      padding: '100px 5vw 70px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    padding: '120px 10vw 80px',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
    minHeight: '100vh',
    overflowX: 'visible',
    overflowY: 'visible',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
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
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getSubtitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.1rem',
      color: '#888',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.5rem',
    color: '#888',
  };
};

const getTabsContainerStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '40px',
      flexWrap: 'wrap',
      padding: '15px',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      position: 'relative',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
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
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getTabButtonStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '10px 18px',
      borderRadius: '25px',
      border: '2px solid rgba(0, 245, 212, 0.3)',
      background: 'rgba(0, 245, 212, 0.05)',
      color: '#fff',
      fontSize: '0.85rem',
      fontWeight: 600,
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
    };
  }
  return {
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
    whiteSpace: 'nowrap',
  };
};

const getActiveTabButtonStyle = () => {
  return {
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    borderColor: 'transparent',
    color: '#000',
    boxShadow: '0 8px 30px rgba(0, 245, 212, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
    fontWeight: 700,
  };
};

const getTabIconStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
    };
  }
  return {
    fontSize: '1.2rem',
  };
};

const getSectionTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      fontWeight: 800,
      marginBottom: '15px',
      color: '#fff',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      wordWrap: 'break-word',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '18px',
      color: '#fff',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  return {
    fontSize: '3rem',
    fontWeight: 800,
    marginBottom: '20px',
    color: '#fff',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

const getIntroTextStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1rem',
      color: '#888',
      fontStyle: 'italic',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  }
  return {
    fontSize: '1.3rem',
    color: '#888',
    fontStyle: 'italic',
  };
};

const getStorySectionStyle = (width) => {
  if (width <= 768) {
    return {
      maxWidth: '100%',
      margin: '0 auto',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      maxWidth: '100%',
      margin: '0 auto',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      padding: '0 30px',
      boxSizing: 'border-box',
    };
  }
  return {
    maxWidth: '1400px',
    margin: '0 auto',
    overflowX: 'visible',
    overflowY: 'visible',
    width: '100%',
    padding: '0 40px',
    boxSizing: 'border-box',
  };
};

const getTimelineContainerStyle = (width) => {
  if (width <= 768) {
    return {
      marginBottom: '60px',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      paddingLeft: '110px',
      paddingRight: '20px',
      boxSizing: 'border-box',
      position: 'relative',
    };
  } else if (width <= 1024) {
    return {
      marginBottom: '70px',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      paddingLeft: '130px',
      paddingRight: '20px',
      boxSizing: 'border-box',
      position: 'relative',
    };
  }
  return {
    marginBottom: '80px',
    overflowX: 'visible',
    overflowY: 'visible',
    width: '100%',
    maxWidth: '100%',
    paddingLeft: '150px',
    paddingRight: '40px',
    boxSizing: 'border-box',
    position: 'relative',
  };
};

const getTimelineStyle = (width) => {
  return {
    position: 'relative',
    paddingLeft: width <= 768 ? '0' : '0',
    overflowX: 'visible',
    overflowY: 'visible',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getTimelineItemStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'relative',
      paddingLeft: '20px',
      paddingBottom: '40px',
      paddingTop: '10px',
      paddingRight: '0',
      cursor: 'pointer',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      position: 'relative',
      paddingLeft: '20px',
      paddingBottom: '45px',
      paddingRight: '0',
      cursor: 'pointer',
      overflowX: 'visible',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'relative',
    paddingLeft: '20px',
    paddingBottom: '50px',
    paddingRight: '0',
    cursor: 'pointer',
    overflowX: 'visible',
    overflowY: 'visible',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
};

const getTimelineYearStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'absolute',
      left: '-90px',
      top: '0',
      fontSize: '1.2rem',
      fontWeight: 800,
      color: '#00F5D4',
      background: 'rgba(0, 245, 212, 0.1)',
      padding: '8px 16px',
      borderRadius: '20px',
      border: '2px solid rgba(0, 245, 212, 0.3)',
      whiteSpace: 'nowrap',
      width: 'auto',
      minWidth: '80px',
      textAlign: 'center',
      zIndex: 2,
      overflow: 'visible',
    };
  } else if (width <= 1024) {
    return {
      position: 'absolute',
      left: '-110px',
      top: '0',
      fontSize: '1.3rem',
      fontWeight: 800,
      color: '#00F5D4',
      background: 'rgba(0, 245, 212, 0.1)',
      padding: '9px 18px',
      borderRadius: '20px',
      border: '2px solid rgba(0, 245, 212, 0.3)',
      whiteSpace: 'nowrap',
      width: 'auto',
      minWidth: '100px',
      textAlign: 'center',
      zIndex: 2,
      overflow: 'visible',
    };
  }
  return {
    position: 'absolute',
    left: '-120px',
    top: '0',
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#00F5D4',
    background: 'rgba(0, 245, 212, 0.1)',
    padding: '10px 20px',
    borderRadius: '20px',
    border: '2px solid rgba(0, 245, 212, 0.3)',
    whiteSpace: 'nowrap',
    width: 'auto',
    minWidth: '100px',
    textAlign: 'center',
    zIndex: 2,
    overflow: 'visible',
  };
};

const getTimelineContentStyle = (width) => {
  if (width <= 768) {
    return {
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      padding: '20px',
      borderRadius: '20px',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      width: '100%',
      maxWidth: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      boxSizing: 'border-box',
      display: 'block',
    };
  }
  return {
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'visible',
    overflowY: 'visible',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    boxSizing: 'border-box',
    display: 'block',
  };
};

const getTimelineTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '10px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      maxWidth: '100%',
    };
  }
  return {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '10px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };
};

const getTimelineDescriptionStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.9rem',
      color: '#aaa',
      lineHeight: '1.6',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      maxWidth: '100%',
    };
  }
  return {
    fontSize: '1rem',
    color: '#aaa',
    lineHeight: '1.7',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };
};

const getStatsGridStyle = (width) => {
  if (width <= 768) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginBottom: '40px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'visible',
      overflowY: 'visible',
      padding: '0',
    };
  } else if (width <= 1024) {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '18px',
      marginBottom: '50px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'visible',
      overflowY: 'visible',
      padding: '0',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px',
    marginBottom: '60px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflowX: 'visible',
    overflowY: 'visible',
    padding: '0',
  };
};

const getStatCardStyle = (width) => {
  if (width <= 768) {
    return {
      padding: '24px 16px',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
      border: '1px solid rgba(0, 245, 212, 0.2)',
      textAlign: 'center',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      minWidth: '0',
      overflow: 'visible',
      overflowX: 'visible',
      overflowY: 'visible',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }
  return {
    padding: '25px 15px',
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(0, 245, 212, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    minWidth: '0',
    overflow: 'visible',
    overflowX: 'visible',
    overflowY: 'visible',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const getStatIconStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      marginBottom: '12px',
      display: 'block',
      overflow: 'visible',
    };
  }
  return {
    fontSize: '2.5rem',
    marginBottom: '15px',
    display: 'block',
    overflow: 'visible',
  };
};

const getStatValueStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      maxWidth: '100%',
      overflow: 'visible',
      whiteSpace: 'normal',
      lineHeight: '1.2',
    };
  }
  return {
    fontSize: '2.2rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
    overflow: 'visible',
    whiteSpace: 'normal',
    lineHeight: '1.2',
  };
};

const getStatLabelStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '0.85rem',
      color: '#888',
      fontWeight: 500,
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      maxWidth: '100%',
    };
  }
  return {
    fontSize: '1rem',
    color: '#888',
    fontWeight: 500,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
  };
};

const section = {
  padding: '120px 10vw 80px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
};

const getHeaderStyle = (width) => {
  if (width <= 768) {
    return {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '0 20px',
    };
  }
  return {
    textAlign: 'center',
    marginBottom: '60px',
  };
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
  minHeight: '600px',
  width: '100%',
  maxWidth: '100%',
  overflowX: 'visible',
  overflowY: 'visible',
  boxSizing: 'border-box',
};

const loadingStyle = {
  padding: '100px',
  textAlign: 'center',
  color: '#fff',
  fontSize: '1.5rem',
};

const sectionTitle = {
  fontSize: '3rem',
  fontWeight: 800,
  marginBottom: '20px',
  color: '#fff',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const storySection = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const storyHeader = {
  textAlign: 'center',
  marginBottom: '60px',
};

const introText = {
  fontSize: '1.3rem',
  color: '#888',
  fontStyle: 'italic',
};

const timelineContainer = {
  marginBottom: '80px',
};

const timeline = {
  position: 'relative',
  paddingLeft: '40px',
};

const timelineItem = {
  position: 'relative',
  paddingLeft: '60px',
  paddingBottom: '50px',
  cursor: 'pointer',
};

const timelineYear = {
  position: 'absolute',
  left: '-90px',
  top: '0',
  fontSize: '1.5rem',
  fontWeight: 800,
  color: '#00F5D4',
  background: 'rgba(0, 245, 212, 0.1)',
  padding: '10px 20px',
  borderRadius: '20px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
};

const timelineContent = {
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  padding: '30px',
  borderRadius: '20px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const timelineTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '10px',
};

const timelineDescription = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '30px',
  marginBottom: '60px',
};

const statCard = {
  padding: '40px 30px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const statIcon = {
  fontSize: '2.5rem',
  marginBottom: '15px',
};

const statValue = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
};

const statLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const missionSection = {
  padding: '50px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(0,245,212,0.1) 0%, rgba(123,44,191,0.1) 100%)',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  textAlign: 'center',
};

const missionTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '20px',
};

const missionText = {
  fontSize: '1.2rem',
  lineHeight: '1.8',
  color: '#ccc',
  maxWidth: '800px',
  margin: '0 auto',
};

const teamHeader = {
  textAlign: 'center',
  marginBottom: '60px',
};

const teamSubtitle = {
  fontSize: '1.2rem',
  color: '#888',
  marginTop: '10px',
};

const teamGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginBottom: '60px',
};

const teamCard = {
  padding: '30px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const teamImageContainer = {
  position: 'relative',
  marginBottom: '25px',
  display: 'inline-block',
};

const teamImage = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #00F5D4',
  boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
};

const teamImageOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(0,245,212,0.2) 0%, rgba(123,44,191,0.2) 100%)',
};

const teamName = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '8px',
};

const teamRole = {
  fontSize: '1.1rem',
  color: '#00F5D4',
  fontWeight: 600,
  marginBottom: '15px',
};

const teamBio = {
  fontSize: '0.95rem',
  color: '#888',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const linkedinLink = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '20px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  color: '#00F5D4',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const teamStats = {
  display: 'flex',
  justifyContent: 'center',
  gap: '60px',
  padding: '50px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '28px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  flexWrap: 'wrap',
};

const teamStatItem = {
  textAlign: 'center',
};

const teamStatNumber = {
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
};

const teamStatLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const valuesHeader = {
  textAlign: 'center',
  marginBottom: '60px',
};

const valuesSubtitle = {
  fontSize: '1.2rem',
  color: '#888',
  marginTop: '10px',
};

const valuesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '40px',
};

const valueCard = {
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const valueIconContainer = {
  marginBottom: '25px',
  display: 'inline-block',
};

const valueIcon = {
  fontSize: '5rem',
  filter: 'drop-shadow(0 10px 20px rgba(0, 245, 212, 0.3))',
};

const valueTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '20px',
};

const valueDescription = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  marginBottom: '25px',
};

const valueExamples = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const valuesIntroSection = {
  maxWidth: '900px',
  margin: '0 auto 60px',
  textAlign: 'center',
};

const valuesIntroText = {
  fontSize: '1.15rem',
  color: '#aaa',
  lineHeight: '1.9',
  marginBottom: '25px',
};

const valuesCommitmentSection = {
  marginTop: '80px',
  padding: '60px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(0, 245, 212, 0.05) 0%, rgba(123, 44, 191, 0.05) 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const valuesCommitmentTitle = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#fff',
  textAlign: 'center',
  marginBottom: '50px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const valuesCommitmentGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
};

const commitmentCard = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const commitmentIcon = {
  fontSize: '3.5rem',
  marginBottom: '20px',
  filter: 'drop-shadow(0 5px 15px rgba(0, 245, 212, 0.3))',
};

const commitmentCardTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const commitmentCardText = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};

const valuesClosingSection = {
  marginTop: '60px',
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.1) 0%, rgba(123, 44, 191, 0.1) 100%)',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  textAlign: 'center',
};

const valuesClosingText = {
  fontSize: '1.2rem',
  color: '#ccc',
  lineHeight: '1.9',
  maxWidth: '900px',
  margin: '0 auto',
};

const valuesClosingStrong = {
  color: '#00F5D4',
  fontWeight: 700,
};

const exampleTag = {
  padding: '8px 16px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#00F5D4',
  fontWeight: 500,
};

const awardsHeader = {
  textAlign: 'center',
  marginBottom: '60px',
};

const awardsSubtitle = {
  fontSize: '1.2rem',
  color: '#888',
  marginTop: '10px',
};

const awardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginBottom: '60px',
};

const awardCard = {
  padding: '50px 40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const awardIconContainer = {
  marginBottom: '25px',
  display: 'inline-block',
};

const awardIcon = {
  fontSize: '5rem',
  filter: 'drop-shadow(0 10px 30px rgba(255, 215, 0, 0.4))',
};

const awardTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const awardOrg = {
  fontSize: '1rem',
  color: '#888',
  marginBottom: '20px',
};

const awardYearBadge = {
  display: 'inline-block',
  padding: '10px 24px',
  background: 'rgba(0, 245, 212, 0.2)',
  border: '2px solid rgba(0, 245, 212, 0.4)',
  borderRadius: '25px',
};

const awardYear = {
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#00F5D4',
};

const recognitionSection = {
  padding: '50px',
  borderRadius: '28px',
  background: 'rgba(0, 245, 212, 0.05)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const recognitionTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '30px',
  textAlign: 'center',
};

const recognitionList = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
};

const recognitionItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '20px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
};

const recognitionIcon = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  background: '#00F5D4',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '1.2rem',
  flexShrink: 0,
};

const recognitionText = {
  fontSize: '1.1rem',
  color: '#fff',
  fontWeight: 500,
};

const globalHeader = {
  textAlign: 'center',
  marginBottom: '60px',
};

const globalSubtitle = {
  fontSize: '1.2rem',
  color: '#888',
  marginTop: '10px',
};

const globalStats = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '60px',
  flexWrap: 'wrap',
};

const globalStatCard = {
  padding: '40px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  minWidth: '200px',
};

const globalStatIcon = {
  fontSize: '3rem',
  marginBottom: '15px',
};

const globalStatValue = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
};

const globalStatLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const officesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '40px',
};

const officeCard = {
  padding: '40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
};

const officeFlag = {
  fontSize: '4rem',
  marginBottom: '20px',
  color: '#00F5D4',
};

const officeCity = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '10px',
};

const officeCountry = {
  fontSize: '1.1rem',
  color: '#888',
  marginBottom: '25px',
  fontWeight: 500,
};

const officeDetails = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '25px',
  paddingTop: '25px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const officeDetailItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
};

const officeDetailIcon = {
  fontSize: '1.2rem',
};

const officeDetailText = {
  fontSize: '0.95rem',
  color: '#aaa',
};
