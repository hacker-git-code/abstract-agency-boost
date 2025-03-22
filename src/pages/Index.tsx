
import { useEffect, useRef, useState } from 'react';
import '../styles/main.css';
import pythonBackend from '../utils/pythonSimulation';

const Index = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [backendData, setBackendData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Sending..." });
    
    try {
      // Call our Python simulation
      const result = await pythonBackend.processContactForm(
        formData.name,
        formData.email,
        formData.message
      );
      
      setFormStatus(result);
      
      if (result.success) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        success: false,
        message: "An error occurred. Please try again later."
      });
    }
  };
  
  useEffect(() => {
    // Custom cursor effect with vanilla JS
    const cursor = cursorRef.current;
    
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);
    
    // Animation with vanilla JS
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', animateElements);
    
    // Fetch data from our Python simulation
    const fetchPythonData = async () => {
      setIsLoading(true);
      try {
        const data = await pythonBackend.getAgencyStats();
        setBackendData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Run animations once on initial load and fetch data
    animateElements();
    fetchPythonData();
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className="webpage">
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      
      {/* Header */}
      <header className="site-header">
        <div className="container">
          <div className="logo">ABSTRACT</div>
          <nav>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="animate-on-scroll">
            <span className="line">We Create</span>
            <span className="line">Digital</span>
            <span className="line">Experiences</span>
          </h1>
          <p className="animate-on-scroll">Award-winning marketing agency specializing in brand transformation</p>
          <div className="cta-container animate-on-scroll">
            <a href="#contact" className="cta-button">Start a Project</a>
          </div>
          <div className="abstract-elements">
            <div className="circle"></div>
            <div className="square"></div>
            <div className="triangle"></div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Our Services</h2>
          <div className="services-grid">
            <div className="service-card animate-on-scroll">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="64" height="64">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Strategic Branding</h3>
              <p>We craft unique brand identities that communicate your values and connect with your audience.</p>
            </div>
            <div className="service-card animate-on-scroll">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="64" height="64">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <polyline points="21 15 16 10 5 21" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <h3>Web Development</h3>
              <p>Responsive, engaging websites that deliver exceptional user experiences across all devices.</p>
            </div>
            <div className="service-card animate-on-scroll">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="64" height="64">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M2 2l7.586 7.586" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="11" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <h3>Digital Marketing</h3>
              <p>Data-driven campaigns that increase visibility, drive engagement, and convert visitors into customers.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Work Section */}
      <section id="work" className="work">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Selected Work</h2>
          <div className="work-grid">
            <div className="work-item animate-on-scroll">
              <div className="work-image" style={{ backgroundColor: '#f5f0e8' }}>
                <div className="placeholder-text">PROJECT 01</div>
              </div>
              <div className="work-details">
                <h3>Neon Horizon</h3>
                <p>Brand Strategy, Web Design</p>
              </div>
            </div>
            <div className="work-item animate-on-scroll">
              <div className="work-image" style={{ backgroundColor: '#e8e8f5' }}>
                <div className="placeholder-text">PROJECT 02</div>
              </div>
              <div className="work-details">
                <h3>Ivory Studios</h3>
                <p>Identity, Digital Marketing</p>
              </div>
            </div>
            <div className="work-item animate-on-scroll">
              <div className="work-image" style={{ backgroundColor: '#f5e8e8' }}>
                <div className="placeholder-text">PROJECT 03</div>
              </div>
              <div className="work-details">
                <h3>Pulse Athletics</h3>
                <p>E-commerce, Campaign Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title animate-on-scroll">About Us</h2>
              <p className="animate-on-scroll">We are a collective of thinkers, designers, and developers passionate about creating meaningful digital experiences that drive business results.</p>
              <p className="animate-on-scroll">Founded in 2015, our agency has grown from a small team of three to an award-winning digital powerhouse with offices in New York and London.</p>
            </div>
            <div className="about-stats animate-on-scroll">
              <div className="python-integration">
                <h4>Data from Python Backend:</h4>
                {isLoading ? (
                  <p>Loading data...</p>
                ) : backendData ? (
                  <div className="python-result">
                    <pre>
                      {JSON.stringify(backendData, null, 2)}
                    </pre>
                    <div className="stats-display">
                      <p><strong>Clients:</strong> {backendData.agency_stats.clients}</p>
                      <p><strong>Projects:</strong> {backendData.agency_stats.projects}</p>
                      <p><strong>Satisfaction Rate:</strong> {backendData.agency_stats.satisfaction}%</p>
                      <p><strong>Technologies:</strong> {backendData.technologies.join(', ')}</p>
                    </div>
                  </div>
                ) : (
                  <p>Failed to load data from Python backend</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-info animate-on-scroll">
              <p>Ready to start your next project? We'd love to hear from you.</p>
              <div className="contact-details">
                <p><strong>Email:</strong> hello@abstract.agency</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Creative St, New York, NY 10001</p>
              </div>
            </div>
            <div className="contact-form-container animate-on-scroll">
              <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
                
                {formStatus && (
                  <div className={`form-status ${formStatus.success ? 'success' : 'error'}`} style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    backgroundColor: formStatus.success ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: formStatus.success ? '#047857' : '#b91c1c',
                    border: `1px solid ${formStatus.success ? 'rgba(52, 211, 153, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                  }}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo">ABSTRACT</div>
            <div className="footer-links">
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <a href="#" className="social-icon">In</a>
              <a href="#" className="social-icon">Tw</a>
              <a href="#" className="social-icon">Be</a>
            </div>
          </div>
          <div className="copyright">
            © 2023 Abstract Agency. All rights reserved.
          </div>
          <div className="python-note" style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6, textAlign: 'center' }}>
            Powered by Python simulation (in a real project, would connect to actual Python backend)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
