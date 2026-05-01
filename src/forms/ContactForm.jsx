import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import axios from 'axios';
import { API_BASE } from '../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (/\d/.test(formData.firstName)) {
      newErrors.firstName = 'First name cannot contain numbers';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please correct the highlighted fields.',
        icon: 'error',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE}/api/contacts`, formData);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: response.data.message || 'Your message has been sent.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });

        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          description: '',
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 md:px-0 py-12">
      <div className="max-w-3xl w-full grid md:grid-cols-5 shadow-lg bg-white rounded-xl overflow-hidden border border-gray-100">
        {/* Left Side - Form */}
        <div className="md:col-span-3 p-6 bg-white">
          <h2 className="text-3xl font-mono font-bold text-blue-800 mb-6 text-center uppercase">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your company (optional)"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              ></textarea>
              {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Centered Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-3 mx-auto block bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-md shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="md:col-span-2 bg-blue-600 text-white p-8 flex flex-col justify-center space-y-6">
          <h3 className="text-xl font-bold mb-3 border-b border-blue-500 pb-1">Contact Information</h3>
          <p className="text-sm tracking-wide leading-relaxed">
            Planning your next journey? Reach out and let’s make it unforgettable.
          </p>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="https://www.google.com/maps?q=34,+Sewak+Park,+Dwarka+More+Metro,+New+Delhi+110059"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:underline"
              >
                <MapPin className="w-5 h-5 text-blue-300 mt-1" />
                <span>
                  34, Sewak Park (1st floor), Dwarka More Metro,<br />
                  Near Pillar No-772, New Delhi, 110059
                </span>
              </a>
            </li>

            <li>
              <a href="tel:01140612834" className="flex items-start gap-3 hover:underline">
                <Phone className="w-5 h-5 text-blue-300 mt-1" />
                <span>
                  01140612834 <br /> 7290087051
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/7290086552"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:underline"
              >
                <FaWhatsapp className="w-5 h-5 text-green-400 mt-1" />
                <span>7290086552</span>
              </a>
            </li>

            <li>
              <a href="mailto:info@travelnworld.com" className="flex items-start gap-3 hover:underline">
                <Mail className="w-5 h-5 text-blue-300 mt-1" />
                <span>info@travelnworld.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
