
import React, { useEffect } from 'react';
import '../styles/main.css';
import pythonBackend from '../utils/pythonSimulation';
import AbstractCanvas from '../components/AbstractCanvas';
import AbstractHoverCard from '../components/AbstractHoverCard';

const Index = () => {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = React.useState<{ success?: boolean; message?: string } | null>(null);
  const [backendData, setBackendData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: "Sending..." });
    
    try {
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
    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    // Fetch data from Python simulation
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
    
    fetchPythonData();
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="webpage">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AbstractCanvas />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full py-8 z-50 backdrop-blur-sm bg-background/30">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl tracking-widest">ABSTRACT</div>
              <nav className="hidden md:block">
                <ul className="flex space-x-12">
                  {['services', 'work', 'about', 'contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item}`} 
                        className={`text-sm uppercase tracking-wider transition-all duration-300 hover:opacity-100 ${activeSection === item ? 'opacity-100' : 'opacity-50'}`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="block md:hidden">
                <button className="p-2" aria-label="Menu">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-32 pb-20 px-6">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
                Crafting
                <span className="block">Digital</span>
                <span className="block">Experiences</span>
              </h1>
              
              <p className="text-lg md:text-xl opacity-70 max-w-xl mx-auto mb-12">
                We blend aesthetics with function to create memorable digital solutions
              </p>
              
              <AbstractHoverCard
                triggerElement={
                  <button className="text-sm tracking-widest uppercase py-3 px-8 border border-current rounded-full transition-all duration-300 hover:px-12">
                    Explore Our Work
                  </button>
                }
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Our Process</h3>
                  <p className="text-sm opacity-80">We approach each project with a blend of strategy, creativity, and technical precision. Scroll down to discover our portfolio.</p>
                </div>
              </AbstractHoverCard>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Digital Strategy",
                  description: "Research, analysis, and roadmap creation to build strategic digital foundations"
                },
                {
                  title: "Brand Design",
                  description: "Visual identity development that communicates your essence and values"
                },
                {
                  title: "Development",
                  description: "Technical execution bringing designs to life with precision and attention to detail"
                }
              ].map((service, index) => (
                <AbstractHoverCard
                  key={index}
                  triggerElement={
                    <div className="relative group p-8 min-h-[280px] border-t border-current/10 transition-all duration-500 hover:-translate-y-1">
                      <h3 className="text-xl mb-4">{service.title}</h3>
                      <p className="text-sm opacity-60">{service.description}</p>
                      <div className="absolute bottom-8 right-8 w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <h3 className="text-xl">{service.title}</h3>
                    <p className="opacity-80">Our {service.title.toLowerCase()} services are tailored to your specific needs, ensuring we deliver solutions that align with your goals.</p>
                    <ul className="text-sm space-y-2 opacity-70">
                      {[1, 2, 3].map(item => (
                        <li key={item} className="flex items-center">
                          <span className="w-1 h-1 rounded-full bg-current mr-2"></span>
                          <span>Feature {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AbstractHoverCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Work Section */}
        <section id="work" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Selected Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "Minimal",
                  category: "Brand Identity",
                  color: "bg-[#f5f0e8]"
                },
                {
                  title: "Echoes",
                  category: "Web Design",
                  color: "bg-[#e8e8f5]"
                },
                {
                  title: "Spectrum",
                  category: "Digital Campaign",
                  color: "bg-[#f5e8e8]"
                }
              ].map((project, index) => (
                <div key={index} className="group cursor-pointer mb-8">
                  <div className={`aspect-[4/3] mb-6 flex items-center justify-center ${project.color} overflow-hidden`}>
                    <div className="text-4xl transition-all duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-30">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl transition-all duration-300 group-hover:translate-x-2">{project.title}</h3>
                  <p className="text-sm opacity-60">{project.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-8">About Us</h2>
                <div className="space-y-6">
                  <p className="opacity-80">We are a collective of designers, strategists, and developers committed to creating meaningful digital experiences.</p>
                  <p className="opacity-80">Our approach combines analytical thinking with creative exploration, resulting in solutions that are both beautiful and effective.</p>
                </div>
              </div>
              
              <div className="bg-background/70 backdrop-blur-md p-8 rounded-sm">
                <h3 className="text-xl mb-6">Studio Data</h3>
                
                {isLoading ? (
                  <p className="opacity-70">Loading data...</p>
                ) : backendData ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(backendData.agency_stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-current/10 pb-2">
                          <span className="text-sm capitalize opacity-70">{key}</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="text-sm opacity-70 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {backendData.technologies.map((tech: string, index: number) => (
                          <span key={index} className="text-xs py-1 px-3 rounded-full border border-current/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="opacity-70">Failed to load data</p>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="opacity-80 mb-8">Interested in working together? We'd love to hear from you.</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase tracking-wide opacity-50">Email</h3>
                    <p>hello@abstract.studio</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wide opacity-50">Location</h3>
                    <p>New York / London</p>
                  </div>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b border-current/20 bg-transparent py-2 focus:outline-none focus:border-current/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b border-current/20 bg-transparent py-2 focus:outline-none focus:border-current/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Message" 
                      rows={4} 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b border-current/20 bg-transparent py-2 focus:outline-none focus:border-current/50 transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="text-sm tracking-widest uppercase py-3 px-8 border border-current rounded-full transition-all duration-300 hover:px-12"
                    >
                      Send Message
                    </button>
                  </div>
                  
                  {formStatus && (
                    <div className={`text-sm py-2 ${formStatus.success ? 'opacity-80' : 'text-red-500'}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-current/10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="font-medium tracking-widest">ABSTRACT</div>
              </div>
              
              <div className="flex space-x-6">
                {['Twitter', 'Instagram', 'LinkedIn'].map(item => (
                  <a 
                    key={item} 
                    href="#" 
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-xs opacity-40 text-center">
              © {new Date().getFullYear()} Abstract Studio. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
