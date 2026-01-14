import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Testimonials
  getTestimonials: () => api.get('/testimonials'),
  getTestimonial: (id) => api.get(`/testimonials/${id}`),
  
  // Case Studies
  getCaseStudies: () => api.get('/caseStudies'),
  getCaseStudy: (id) => api.get(`/caseStudies/${id}`),
  
  // Services
  getServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`),
  
  // Industries
  getIndustries: () => api.get('/industries'),
  getIndustry: (id) => api.get(`/industries/${id}`),
  
  // Stats
  getStats: () => api.get('/stats'),
  
  // Investors
  getInvestors: () => api.get('/investors'),
  
  // Ratings
  getRatings: () => api.get('/ratings'),
  
  // Team
  getTeam: () => api.get('/team'),
  
  // Hero Videos
  getHeroVideos: () => api.get('/heroVideos'),
  
  // Images
  getImages: () => api.get('/images'),
  
  // Jobs
  getJobs: () => api.get('/jobs'),
  getJob: (id) => api.get(`/jobs/${id}`),
  
  // Awards
  getAwards: () => api.get('/awards'),
  
  // Values
  getValues: () => api.get('/values'),
  
  // Benefits
  getBenefits: () => api.get('/benefits'),
};

export default apiService;
