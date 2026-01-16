import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiService.getServices();
        setServices(response.data);
        if (response.data.length > 0) {
          setSelectedService(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', ...new Set(services.map((s) => s.category))];
  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={spinner}
        >
          ⚡
        </motion.div>
        Loading Services...
      </div>
    );
  }

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <section style={getSectionStyle(windowWidth)}>
      {/* Video Background */}
      <div style={videoContainer}>
        <video autoPlay muted loop playsInline style={backgroundVideo}>
          <source
            src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div style={videoOverlay} />
      </div>

      {/* Content */}
      <div style={contentWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={header}
        >
          <motion.h1
            style={getTitleStyle(windowWidth)}
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Our Services
          </motion.h1>
          <p style={getSubtitleStyle(windowWidth)}>
            Comprehensive digital solutions powered by cutting-edge technology
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={servicesIntro}
          >
            <p style={servicesIntroText}>
              From cloud migration to AI implementation, we offer end-to-end technology services
              that help businesses scale, innovate, and succeed. Our team of 2,500+ experts delivers
              solutions across 16 service categories, serving clients in 50+ countries with a 95%
              satisfaction rate. We combine deep industry expertise with cutting-edge technology to
              deliver transformative solutions that drive measurable business outcomes.
            </p>

            {/* Key Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={keyBenefitsSection}
            >
              <h3 style={keyBenefitsTitle}>Why Choose Our Services?</h3>
              <div style={keyBenefitsGrid}>
                {[
                  {
                    icon: '🎯',
                    title: 'Expert-Led Approach',
                    description: 'Work with certified professionals and industry veterans who understand your business challenges.',
                  },
                  {
                    icon: '⚡',
                    title: 'Agile Methodology',
                    description: 'Rapid deployment with iterative improvements, ensuring faster time-to-value and continuous optimization.',
                  },
                  {
                    icon: '🔒',
                    title: 'Enterprise Security',
                    description: 'Bank-level security protocols with ISO 27001, SOC 2, and GDPR compliance built into every solution.',
                  },
                  {
                    icon: '🌐',
                    title: 'Global Scale',
                    description: '24/7 support across 50+ countries with local expertise and worldwide infrastructure capabilities.',
                  },
                  {
                    icon: '📈',
                    title: 'Proven Results',
                    description: '95% client satisfaction rate with $2.5B+ in cost savings delivered across 1,000+ successful projects.',
                  },
                  {
                    icon: '🔄',
                    title: 'End-to-End Support',
                    description: 'From strategy and planning to implementation, optimization, and ongoing maintenance - we cover it all.',
                  },
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    style={keyBenefitCard}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div style={keyBenefitIcon}>{benefit.icon}</div>
                    <h4 style={keyBenefitCardTitle}>{benefit.title}</h4>
                    <p style={keyBenefitCardDesc}>{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={servicesStats}
            >
              <div style={serviceStatItem}>
                <div style={serviceStatNumber}>16</div>
                <div style={serviceStatLabel}>Service Categories</div>
              </div>
              <div style={serviceStatItem}>
                <div style={serviceStatNumber}>1000+</div>
                <div style={serviceStatLabel}>Projects Completed</div>
              </div>
              <div style={serviceStatItem}>
                <div style={serviceStatNumber}>95%</div>
                <div style={serviceStatLabel}>Client Satisfaction</div>
              </div>
              <div style={serviceStatItem}>
                <div style={serviceStatNumber}>24/7</div>
                <div style={serviceStatLabel}>Support Available</div>
              </div>
            </motion.div>

            {/* Our Process Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={processSection}
            >
              <h3 style={processTitle}>Our Service Delivery Process</h3>
              <div style={processSteps}>
                {[
                  {
                    step: '01',
                    title: 'Discovery & Strategy',
                    description: 'We analyze your business needs, technical requirements, and goals to create a tailored strategy.',
                  },
                  {
                    step: '02',
                    title: 'Design & Planning',
                    description: 'Our architects design scalable solutions with detailed roadmaps and implementation timelines.',
                  },
                  {
                    step: '03',
                    title: 'Development & Implementation',
                    description: 'Agile development cycles with continuous testing, feedback, and quality assurance.',
                  },
                  {
                    step: '04',
                    title: 'Deployment & Optimization',
                    description: 'Smooth deployment with monitoring, performance tuning, and optimization for peak efficiency.',
                  },
                  {
                    step: '05',
                    title: 'Support & Maintenance',
                    description: 'Ongoing support, updates, and enhancements to ensure long-term success and ROI.',
                  },
                ].map((process, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    style={processStepCard}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div style={processStepNumber}>{process.step}</div>
                    <h4 style={processStepTitle}>{process.title}</h4>
                    <p style={processStepDesc}>{process.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* All Services Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={allServicesSection}
        >
          <h2 style={allServicesTitle}>All Our Services</h2>
          <p style={allServicesSubtitle}>
            Comprehensive technology solutions across all major domains
          </p>

          <div style={allServicesGrid}>
            {[
              {
                title: 'Cloud Solutions',
                icon: '☁️',
                description: 'Comprehensive cloud migration, architecture, and optimization services for enterprises. Smooth deployment with performance tuning and optimization for peak efficiency.',
                features: ['AWS/Azure/GCP', 'Multi-cloud Strategy', 'Cost Optimization', 'DevOps Integration'],
                color: '#00F5D4'
              },
              {
                title: 'AI & Machine Learning',
                icon: '🤖',
                description: 'Build intelligent systems with cutting-edge AI and ML technologies. Custom models, MLOps pipelines, and predictive analytics for enterprise applications.',
                features: ['Custom Models', 'MLOps', 'Predictive Analytics', 'NLP & Computer Vision'],
                color: '#7B2CBF'
              },
              {
                title: 'Cybersecurity',
                icon: '🔒',
                description: 'Enterprise-grade security solutions to protect your digital assets. Zero-trust architecture, threat detection, and compliance with industry standards.',
                features: ['Zero-Trust Architecture', 'Threat Detection', 'Compliance', 'Security Audits'],
                color: '#00F5D4'
              },
              {
                title: 'Digital Transformation',
                icon: '🚀',
                description: 'End-to-end digital transformation consulting and implementation. Strategy consulting, process automation, and legacy modernization.',
                features: ['Strategy Consulting', 'Process Automation', 'Legacy Modernization', 'Change Management'],
                color: '#7B2CBF'
              },
              {
                title: 'Data Analytics',
                icon: '📊',
                description: 'Turn data into actionable insights with advanced analytics platforms. Big data processing, real-time analytics, and business intelligence solutions.',
                features: ['Big Data', 'Real-time Analytics', 'Business Intelligence', 'Data Warehousing'],
                color: '#00F5D4'
              },
              {
                title: 'Mobile Development',
                icon: '📱',
                description: 'Native and cross-platform mobile applications for iOS and Android. React Native, Flutter, and progressive web apps with optimal performance.',
                features: ['Native Apps', 'React Native', 'Flutter', 'Progressive Web Apps'],
                color: '#7B2CBF'
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                style={allServiceCard}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => {
                  const matchingService = services.find(s => s.title === service.title);
                  if (matchingService) {
                    setSelectedService(matchingService);
                  }
                }}
              >
                <div style={allServiceHeader}>
                  <div style={{ ...allServiceIconContainer, borderColor: service.color }}>
                    <div style={allServiceIcon}>{service.icon}</div>
                  </div>
                  <h3 style={allServiceCardTitle}>{service.title}</h3>
                </div>
                <p style={allServiceDescription}>{service.description}</p>
                <div style={allServiceFeatures}>
                  {service.features.map((feature, featureIdx) => (
                    <motion.span
                      key={featureIdx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 + featureIdx * 0.05 }}
                      style={{ ...allServiceFeatureTag, borderColor: service.color, color: service.color }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  style={{ ...allServiceButton, background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)` }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More →
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Services Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={servicesGrid}
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              style={{
                ...serviceCard,
                ...(selectedService?.id === service.id ? activeServiceCard : {}),
              }}
              onClick={() => setSelectedService(service)}
              whileHover={{
                y: -15,
                scale: 1.03,
                boxShadow: '0 20px 60px rgba(0, 245, 212, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                style={serviceIconContainer}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div style={serviceIcon}>{service.icon}</div>
              </motion.div>
              <h3 style={serviceTitle}>{service.title}</h3>
              <p style={serviceDescription}>{service.description}</p>
              <div style={serviceFeatures}>
                {service.features.slice(0, 3).map((feature, idx) => (
                  <motion.span
                    key={idx}
                    style={featureTag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
              <motion.div
                style={serviceCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {service.category}
              </motion.div>
              {selectedService?.id === service.id && (
                <motion.div
                  layoutId="selectedService"
                  style={selectedIndicator}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed View */}
        <AnimatePresence mode="wait">
          {selectedService && (
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={detailModal}
            >
              <motion.button
                style={closeButton}
                onClick={() => setSelectedService(null)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              <div style={detailContent}>
                <div style={detailLeft}>
                  <motion.div
                    style={detailIconContainer}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <div style={detailIcon}>{selectedService.icon}</div>
                  </motion.div>
                  <h2 style={detailTitle}>{selectedService.title}</h2>
                  <span style={detailCategory}>{selectedService.category}</span>
                  <p style={detailDescription}>{selectedService.description}</p>

                  <div style={featuresSection}>
                    <h3 style={featuresTitle}>Key Features & Capabilities</h3>
                    <div style={featuresGrid}>
                      {selectedService.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={featureCard}
                          whileHover={{ x: 10, scale: 1.05 }}
                        >
                          <div style={featureIcon}>✓</div>
                          <span style={featureText}>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Service Information */}
                  {getServiceDetails(selectedService) && (
                    <div style={serviceDetailsSection}>
                      {getServiceDetails(selectedService).detailedDescription && (
                        <div style={detailBlock}>
                          <h4 style={detailBlockTitle}>Overview</h4>
                          <p style={detailBlockText}>{getServiceDetails(selectedService).detailedDescription}</p>
                        </div>
                      )}

                      {getServiceDetails(selectedService).useCases && (
                        <div style={detailBlock}>
                          <h4 style={detailBlockTitle}>Use Cases & Applications</h4>
                          <ul style={detailList}>
                            {getServiceDetails(selectedService).useCases.map((useCase, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={detailListItem}
                              >
                                <span style={listBullet}>•</span>
                                {useCase}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {getServiceDetails(selectedService).technologies && (
                        <div style={detailBlock}>
                          <h4 style={detailBlockTitle}>Technologies & Platforms</h4>
                          <div style={techTagsContainer}>
                            {getServiceDetails(selectedService).technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                style={techTag}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {getServiceDetails(selectedService).benefits && (
                        <div style={detailBlock}>
                          <h4 style={detailBlockTitle}>Key Benefits</h4>
                          <div style={benefitsGrid}>
                            {getServiceDetails(selectedService).benefits.map((benefit, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={benefitCard}
                              >
                                <div style={benefitIcon}>✨</div>
                                <p style={benefitText}>{benefit}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={actionButtons}>
                    <motion.button
                      style={primaryButton}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 15px 40px rgba(0, 245, 212, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                      <span style={arrow}>→</span>
                    </motion.button>
                    <motion.button
                      style={secondaryButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Create a downloadable PDF/content
                        const content = `Service: ${selectedService.title}\n\nDescription: ${selectedService.description}\n\nFeatures: ${selectedService.features.join(', ')}\n\nCategory: ${selectedService.category}\n\nContact us for more information!`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${selectedService.title.replace(/\s+/g, '_')}_Brochure.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Download Brochure 📄
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  style={detailRight}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={imageContainer}>
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      style={detailImage}
                      loading="lazy"
                    />
                    <div style={imageOverlay} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Responsive style functions for Services page
const getSectionStyle = (width) => {
  if (width <= 768) {
    return {
      position: 'relative',
      minHeight: '100vh',
      padding: '80px 20px 60px',
      overflow: 'hidden',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  } else if (width <= 1024) {
    return {
      position: 'relative',
      minHeight: '100vh',
      padding: '100px 5vw 70px',
      overflow: 'hidden',
      overflowX: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    };
  }
  return {
    position: 'relative',
    minHeight: '100vh',
    padding: '120px 10vw 80px',
    overflow: 'hidden',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };
};

const getTitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '2.5rem',
      fontWeight: 900,
      marginBottom: '15px',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 50%, #00F5D4 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 30px rgba(0, 245, 212, 0.5)',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '3.5rem',
      fontWeight: 900,
      marginBottom: '18px',
      background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 50%, #00F5D4 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 35px rgba(0, 245, 212, 0.5)',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '5rem',
    fontWeight: 900,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 50%, #00F5D4 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 40px rgba(0, 245, 212, 0.5)',
  };
};

const getSubtitleStyle = (width) => {
  if (width <= 768) {
    return {
      fontSize: '1.1rem',
      color: '#aaa',
      fontWeight: 400,
      marginBottom: '30px',
      wordWrap: 'break-word',
      padding: '0 10px',
    };
  } else if (width <= 1024) {
    return {
      fontSize: '1.3rem',
      color: '#aaa',
      fontWeight: 400,
      marginBottom: '35px',
      wordWrap: 'break-word',
    };
  }
  return {
    fontSize: '1.5rem',
    color: '#aaa',
    fontWeight: 400,
    marginBottom: '40px',
    wordWrap: 'break-word',
  };
};

const section = {
  position: 'relative',
  minHeight: '100vh',
  padding: '120px 10vw 80px',
  overflow: 'hidden',
};

const videoContainer = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  overflow: 'hidden',
};

const backgroundVideo = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.15,
  filter: 'blur(2px)',
};

const videoOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.95) 100%)',
};

const contentWrapper = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '1600px',
  margin: '0 auto',
};

const header = {
  textAlign: 'center',
  marginBottom: '60px',
};

const title = {
  fontSize: '5rem',
  fontWeight: 900,
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 50%, #00F5D4 100%)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 0 40px rgba(0, 245, 212, 0.5)',
};

const subtitle = {
  fontSize: '1.5rem',
  color: '#aaa',
  fontWeight: 400,
  marginBottom: '40px',
};

const servicesIntro = {
  maxWidth: '1000px',
  margin: '0 auto',
  textAlign: 'center',
};

const servicesIntroText = {
  fontSize: '1.15rem',
  color: '#ccc',
  lineHeight: '1.8',
  marginBottom: '50px',
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const servicesStats = {
  display: 'flex',
  justifyContent: 'center',
  gap: '60px',
  flexWrap: 'wrap',
  padding: '40px',
  background: 'rgba(0, 245, 212, 0.05)',
  borderRadius: '28px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
};

const serviceStatItem = {
  textAlign: 'center',
};

const serviceStatNumber = {
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '10px',
  lineHeight: '1',
};

const serviceStatLabel = {
  fontSize: '1rem',
  color: '#888',
  fontWeight: 500,
};

const keyBenefitsSection = {
  marginTop: '60px',
  marginBottom: '60px',
};

const keyBenefitsTitle = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '50px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const keyBenefitsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '30px',
};

const keyBenefitCard = {
  padding: '35px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, rgba(26,26,26,0.9) 0%, rgba(15,15,15,0.9) 100%)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const keyBenefitIcon = {
  fontSize: '3.5rem',
  marginBottom: '20px',
  filter: 'drop-shadow(0 5px 15px rgba(0, 245, 212, 0.3))',
};

const keyBenefitCardTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const keyBenefitCardDesc = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
};

const processSection = {
  marginTop: '80px',
  padding: '60px',
  background: 'rgba(0, 245, 212, 0.03)',
  borderRadius: '32px',
  border: '1px solid rgba(0, 245, 212, 0.1)',
};

const processTitle = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '50px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const processSteps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const processStepCard = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '30px',
  padding: '35px',
  borderRadius: '20px',
  background: 'rgba(0, 245, 212, 0.05)',
  border: '1px solid rgba(0, 245, 212, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const processStepNumber = {
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  minWidth: '80px',
  flexShrink: 0,
};

const processStepTitle = {
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '12px',
};

const processStepDesc = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
  flex: 1,
};

const loadingStyle = {
  padding: '150px 20px',
  textAlign: 'center',
  color: '#fff',
  fontSize: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  minHeight: '100vh',
};

const spinner = {
  fontSize: '4rem',
};

const tabsContainer = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'flex-start',
  marginBottom: '60px',
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  WebkitOverflowScrolling: 'touch',
};

tabsContainer['&::-webkit-scrollbar'] = {
  height: '8px',
};

tabsContainer['&::-webkit-scrollbar-track'] = {
  background: 'rgba(0, 245, 212, 0.1)',
  borderRadius: '10px',
};

tabsContainer['&::-webkit-scrollbar-thumb'] = {
  background: 'linear-gradient(90deg, #00F5D4, #7B2CBF)',
  borderRadius: '10px',
};

const tabButton = {
  padding: '14px 32px',
  borderRadius: '30px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  background: 'rgba(0, 245, 212, 0.05)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
};

const activeTabButton = {
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  borderColor: 'transparent',
  color: '#000',
  boxShadow: '0 8px 30px rgba(0, 245, 212, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
  fontWeight: 700,
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

const servicesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '30px',
  marginBottom: '80px',
};

const serviceCard = {
  padding: '40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(26,26,26,0.9) 0%, rgba(15,15,15,0.9) 100%)',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
  position: 'relative',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
};

const activeServiceCard = {
  borderColor: '#00F5D4',
  boxShadow: '0 0 40px rgba(0, 245, 212, 0.4)',
  background: 'linear-gradient(145deg, rgba(0,245,212,0.1) 0%, rgba(123,44,191,0.1) 100%)',
};

const serviceIconContainer = {
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, rgba(0,245,212,0.2) 0%, rgba(123,44,191,0.2) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '25px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
};

const serviceIcon = {
  fontSize: '3.5rem',
};

const serviceTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '15px',
};

const serviceDescription = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '1.7',
  marginBottom: '20px',
  minHeight: '60px',
};

const serviceFeatures = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const featureTag = {
  padding: '8px 16px',
  background: 'rgba(0, 245, 212, 0.15)',
  border: '1px solid rgba(0, 245, 212, 0.4)',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#00F5D4',
  fontWeight: 600,
};

const serviceCategory = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '6px 14px',
  background: 'rgba(123, 44, 191, 0.2)',
  border: '1px solid rgba(123, 44, 191, 0.4)',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#7B2CBF',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const selectedIndicator = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '5px',
  background: 'linear-gradient(90deg, #00F5D4, #7B2CBF)',
  borderRadius: '28px 28px 0 0',
  boxShadow: '0 0 20px rgba(0, 245, 212, 0.8)',
};

const detailModal = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1400px',
  maxHeight: '90vh',
  background: 'linear-gradient(145deg, rgba(10,10,10,0.98) 0%, rgba(26,26,26,0.98) 100%)',
  borderRadius: '32px',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  padding: '50px',
  zIndex: 1000,
  overflowY: 'auto',
  backdropFilter: 'blur(30px)',
  boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8)',
};

const closeButton = {
  position: 'absolute',
  top: '30px',
  right: '30px',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px solid rgba(0, 245, 212, 0.3)',
  background: 'rgba(0, 245, 212, 0.1)',
  color: '#00F5D4',
  fontSize: '1.5rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
};

const detailContent = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'flex-start',
};

const detailLeft = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const detailIconContainer = {
  width: '100px',
  height: '100px',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, rgba(0,245,212,0.2) 0%, rgba(123,44,191,0.2) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid rgba(0, 245, 212, 0.4)',
};

const detailIcon = {
  fontSize: '5rem',
};

const detailTitle = {
  fontSize: '3rem',
  fontWeight: 800,
  color: '#fff',
  marginBottom: '15px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const detailCategory = {
  display: 'inline-block',
  padding: '10px 20px',
  background: 'rgba(123, 44, 191, 0.2)',
  border: '2px solid rgba(123, 44, 191, 0.4)',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 700,
  color: '#7B2CBF',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  marginBottom: '20px',
};

const detailDescription = {
  fontSize: '1.3rem',
  lineHeight: '2',
  color: '#ccc',
  marginBottom: '30px',
};

const featuresSection = {
  marginTop: '20px',
};

const featuresTitle = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '25px',
};

const featuresGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
};

const featureCard = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '18px',
  background: 'rgba(0, 245, 212, 0.08)',
  borderRadius: '16px',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
};

const featureIcon = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00F5D4, #7B2CBF)',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '1rem',
  flexShrink: 0,
};

const featureText = {
  fontSize: '1.05rem',
  color: '#fff',
  fontWeight: 600,
};

const actionButtons = {
  display: 'flex',
  gap: '20px',
  marginTop: '30px',
  flexWrap: 'wrap',
};

const primaryButton = {
  padding: '20px 50px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1.2rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 10px 30px rgba(0, 245, 212, 0.3)',
};

const secondaryButton = {
  padding: '20px 50px',
  borderRadius: '50px',
  border: '2px solid rgba(0, 245, 212, 0.5)',
  background: 'rgba(0, 245, 212, 0.1)',
  color: '#00F5D4',
  fontWeight: 700,
  fontSize: '1.2rem',
  cursor: 'pointer',
};

const arrow = {
  fontSize: '1.8rem',
};

const allServicesSection = {
  marginTop: '80px',
  marginBottom: '80px',
};

const allServicesTitle = {
  fontSize: '3.5rem',
  fontWeight: 800,
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
};

const allServicesSubtitle = {
  fontSize: '1.3rem',
  color: '#aaa',
  textAlign: 'center',
  marginBottom: '60px',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const allServicesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
  gap: '35px',
};

const allServiceCard = {
  padding: '40px',
  borderRadius: '28px',
  background: 'linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(15,15,15,0.95) 100%)',
  border: '2px solid rgba(0, 245, 212, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

const allServiceHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '25px',
};

const allServiceIconContainer = {
  width: '70px',
  height: '70px',
  borderRadius: '18px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '2px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const allServiceIcon = {
  fontSize: '2.5rem',
};

const allServiceCardTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  margin: 0,
  flex: 1,
};

const allServiceDescription = {
  fontSize: '1.1rem',
  color: '#aaa',
  lineHeight: '1.8',
  marginBottom: '25px',
  minHeight: '80px',
};

const allServiceFeatures = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '25px',
};

const allServiceFeatureTag = {
  padding: '8px 16px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 600,
};

const allServiceButton = {
  padding: '14px 18px',
  borderRadius: '25px',
  border: 'none',
  color: '#000',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  //width: '100%',
  textAlign: 'center',
  transition: 'all 0.3s ease',
};

const serviceDetailsSection = {
  marginTop: '40px',
  paddingTop: '40px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const detailBlock = {
  marginBottom: '35px',
};

const detailBlockTitle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#00F5D4',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const detailBlockText = {
  fontSize: '1.1rem',
  color: '#ccc',
  lineHeight: '1.8',
  marginBottom: '15px',
};

const detailList = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const detailListItem = {
  fontSize: '1rem',
  color: '#aaa',
  lineHeight: '2',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
};

const listBullet = {
  color: '#00F5D4',
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '1.2',
  flexShrink: 0,
};

const techTagsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
};

const techTag = {
  padding: '10px 20px',
  background: 'rgba(0, 245, 212, 0.1)',
  border: '1px solid rgba(0, 245, 212, 0.3)',
  borderRadius: '25px',
  fontSize: '0.95rem',
  color: '#00F5D4',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const benefitsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
};

const benefitCard = {
  padding: '20px',
  background: 'rgba(0, 245, 212, 0.05)',
  border: '1px solid rgba(0, 245, 212, 0.2)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '15px',
};

const benefitIcon = {
  fontSize: '1.5rem',
  flexShrink: 0,
};

const benefitText = {
  fontSize: '1rem',
  color: '#ccc',
  lineHeight: '1.6',
  margin: 0,
};

const detailRight = {
  position: 'sticky',
  top: '20px',
};

const imageContainer = {
  borderRadius: '28px',
  overflow: 'hidden',
  height: '600px',
  position: 'relative',
  border: '3px solid rgba(0, 245, 212, 0.3)',
};

const detailImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const imageOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(180deg, transparent 0%, rgba(0,245,212,0.1) 50%, rgba(123,44,191,0.2) 100%)',
};
