'use client';

import { useState, FormEvent } from 'react';
import toast  from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Thank you! Your message has been sent successfully.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-back relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-dark rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-dark bg-clip-text text-transparent mb-6">
              Let&#39;s Connect
            </h1>
            <p className="text-xl text-dark max-w-2xl mx-auto leading-relaxed">
              Ready to start something amazing together? We&#39;d love to hear your ideas and bring them to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="backdrop-blur-xl bg-white border border-dark/20 rounded-3xl p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark mb-3">Send us a message</h2>
                <div className="w-20 h-1 bg-dark rounded-full"></div>
              </div>
               
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-dark mb-2 transition-colors group-hover:text-primary">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 bg-dark/5 border-2 rounded-xl text-dark placeholder-gray-900 transition-all duration-300 focus:outline-none focus:bg-dark/10 ${
                        focusedField === 'name' ? 'border-primary shadow-lg shadow-primary/20' : 'border-dark/20 hover:border-dark/40'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-semibold text-dark mb-2 transition-colors group-hover:text-primary">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 bg-dark/5 border-2 rounded-xl text-dark placeholder-gray-900 transition-all duration-300 focus:outline-none focus:bg-dark/10 ${
                        focusedField === 'email' ? 'border-primary shadow-lg shadow-primary/20' : 'border-dark/20 hover:border-dark/40'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-sm font-semibold text-dark mb-2 transition-colors group-hover:text-primary">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 bg-dark/5 border-2 rounded-xl text-dark placeholder-gray-900 transition-all duration-300 focus:outline-none focus:bg-dark/10 ${
                      focusedField === 'subject' ? 'border-primary shadow-lg shadow-primary/20' : 'border-dark/20 hover:border-dark/40'
                    }`}
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="relative group">
                  <label className="block text-sm font-semibold text-dark mb-2 transition-colors group-hover:text-primary">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 bg-dark/5 border-2 rounded-xl text-dark placeholder-gray-900 transition-all duration-300 focus:outline-none focus:bg-dark/10 resize-none ${
                      focusedField === 'message' ? 'border-primary shadow-lg shadow-primary/20' : 'border-dark/20 hover:border-dark/40'
                    }`}
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                </div>

                <button
    type="submit"
    disabled={isSubmitting}
    className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-dark font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <span className="relative z-10 flex items-center justify-center">
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark mr-3"></div>
          Sending...
        </>
      ) : (
        <>
          Send Message
          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </>
      )}
    </span>
  </button>
                <div>
                     {/* Social Links */}
              <div className="backdrop-blur-xl bg-dark/5 border border-dark/20 rounded-3xl p-8 shadow-2xl">
                <h4 className="text-2xl font-bold text-dark mb-6">Follow Us</h4>
                <div className="flex space-x-4">
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg group-hover:shadow-primary/25 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-secondary to-primary p-3 rounded-2xl shadow-lg group-hover:shadow-secondary/25 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.294 1.195-.334 1.362-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.753-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg group-hover:shadow-primary/25 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-secondary to-warning p-3 rounded-2xl shadow-lg group-hover:shadow-secondary/25 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.294 1.195-.334 1.362-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.753-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white border border-dark/20 rounded-3xl p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                <h3 className="text-3xl font-bold text-dark mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  
                  <div className="group flex items-center p-4 rounded-2xl hover:bg-dark/10 transition-all duration-300 cursor-pointer">
                    <div className="bg-gradient-to-br from-primary to-secondary text-dark p-4 rounded-2xl shadow-lg group-hover:shadow-primary/25 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <p className="text-dark text-sm font-medium">Phone</p>
                      <p className="text-dark text-lg font-semibold group-hover:text-primary transition-colors">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="group flex items-center p-4 rounded-2xl hover:bg-dark/10 transition-all duration-300 cursor-pointer">
                    <div className="bg-gradient-to-br from-secondary to-primary text-dark p-4 rounded-2xl shadow-lg group-hover:shadow-secondary/25 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <p className="text-dark text-sm font-medium">Email</p>
                      <p className="text-dark text-lg font-semibold group-hover:text-primary transition-colors">support@tesstreasures.com</p>
                    </div>
                  </div>

                  <div className="group flex items-center p-4 rounded-2xl hover:bg-dark/10 transition-all duration-300 cursor-pointer">
                    <div className="bg-gradient-to-br from-primary to-secondary text-dark p-4 rounded-2xl shadow-lg group-hover:shadow-primary/25 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <p className="text-dark text-sm font-medium">Address</p>
                      <p className="text-dark text-lg font-semibold group-hover:text-primary transition-colors">123 Bag Street<br />Fashion City, Country</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="backdrop-blur-xl  bg-white to-secondary/20 border border-dark/20 rounded-3xl p-8 shadow-2xl">
                <h4 className="text-2xl font-bold text-dark mb-4">Why Choose Us?</h4>
                <ul className="space-y-3 text-dark">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                    darkning-fast response times
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    Expert team with 10+ years experience
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    100% satisfaction guarantee
                  </li>
                </ul>
              </div>

             
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="backdrop-blur-xl  bg-white to-secondary/20 border border-dark/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-dark mb-4">Ready to Get Started?</h3>
              <p className="text-dark mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have transformed their ideas into reality with our expert team.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;