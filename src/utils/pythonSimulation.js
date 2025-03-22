
/**
 * This file simulates a Python backend using JavaScript
 * In a real project, this would be an actual Python backend API
 */

class PythonBackendSimulation {
  constructor() {
    this.data = {
      agency_stats: {
        clients: 126,
        projects: 348,
        satisfaction: 98.5
      },
      technologies: ["AI", "Web3", "Cloud", "Mobile", "IoT"],
      team_members: 24,
      founded_year: 2015,
      awards: [
        { year: 2022, name: "Webby Award for Design Excellence" },
        { year: 2021, name: "Awwwards Site of the Day" },
        { year: 2020, name: "CSS Design Awards - Best UI Design" }
      ]
    };
  }

  /**
   * Simulates a Python function to get agency statistics
   * In Python this would be:
   * 
   * def get_agency_stats():
   *     return {
   *         "agency_stats": {
   *             "clients": 126,
   *             "projects": 348,
   *             "satisfaction": 98.5
   *         },
   *         "technologies": ["AI", "Web3", "Cloud", "Mobile", "IoT"]
   *     }
   */
  getAgencyStats() {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          agency_stats: this.data.agency_stats,
          technologies: this.data.technologies
        });
      }, 800);
    });
  }

  /**
   * Simulates a Python function to process contact form
   * In Python this would be:
   * 
   * def process_contact_form(name, email, message):
   *     # In real Python, would store in database and send email
   *     return {
   *         "success": True,
   *         "message": f"Thank you {name}! We'll contact you soon."
   *     }
   */
  processContactForm(name, email, message) {
    // Validate inputs similar to Python validation
    if (!name || !email || !message) {
      return Promise.resolve({
        success: false,
        message: "All fields are required"
      });
    }
    
    if (!email.includes('@')) {
      return Promise.resolve({
        success: false,
        message: "Please enter a valid email address"
      });
    }
    
    // Simulate processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Thank you ${name}! We'll contact you soon.`,
          timestamp: new Date().toISOString()
        });
      }, 1200);
    });
  }
}

export default new PythonBackendSimulation();
