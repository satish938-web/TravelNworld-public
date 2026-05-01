import React from 'react';


const MapSection = () => (
  <section className="py-20 bg-white text-center">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl text-blue-700 font-bold mb-4">Partner With Us</h2>
      <p className="text-xl text-gray-800 mb-12">Meet our team in New Delhi and discover how we can empower your travel business.</p>
      
      <div className="bg-gray-200 rounded-2xl overflow-hidden" style={{ height: '384px' }}>
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2175058301036!2d77.02286748110144!3d28.623242571788232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0541588a57f5%3A0xe9e51d49f8b48d55!2sDwarka%20Mor%2C%20Vipin%20Garden%2C%20Nawada%2C%20Delhi%2C%20110059!5e0!3m2!1sen!2sin!4v1755514218697!5m2!1sen!2sin"  
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);

export default MapSection;