import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { uploadToS3 } from '../utils/s3Upload';

const ApplicationForm = ({ jobTitle, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const navigate = useNavigate();


  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be at least 10 digits'),
    coverLetter: Yup.string().required('Cover letter is required'),
    resume: Yup.mixed().required('Resume is required'),
    linkedIn: Yup.string().url('Must be a valid URL'),
    portfolio: Yup.string().url('Must be a valid URL'),
    hearAboutUs: Yup.string().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null,
      linkedIn: '',
      portfolio: '',
      hearAboutUs: '',
    },
    validationSchema, 
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let resumeKey = "";
        if (values.resume) {
          resumeKey = await uploadToS3(values.resume, "resumes");
        }

        // Simulate API call with the S3 key
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted with S3 key:', { ...values, resume: resumeKey });
        setSubmitSuccess(true);
      } catch (error) {
        console.error('Submission error:', error);
        alert("Failed to upload resume. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('resume', file);
    setResumeFileName(file ? file.name : '');
  };

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for applying for the {jobTitle} position.</p>
        <button
                  onClick={() => navigate("/career")}

          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Apply for {jobTitle}</h2>
        <p className="opacity-90">Please fill out the form below to submit your application</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile
            </label>
            <input
              id="linkedIn"
              name="linkedIn"
              type="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.linkedIn}
              placeholder="https://linkedin.com/in/yourprofile"
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.linkedIn && formik.errors.linkedIn ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.linkedIn && formik.errors.linkedIn && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.linkedIn}</p>
            )}
          </div>

          {/* Portfolio */}
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio/GitHub
            </label>
            <input
              id="portfolio"
              name="portfolio"
              type="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portfolio}
              placeholder="https://github.com/yourprofile"
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.portfolio && formik.errors.portfolio ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.portfolio && formik.errors.portfolio && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.portfolio}</p>
            )}
          </div>

          {/* How did you hear about us */}
          <div className="md:col-span-2">
            <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-1">
              How did you hear about this position? <span className="text-red-500">*</span>
            </label>
            <select
              id="hearAboutUs"
              name="hearAboutUs"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hearAboutUs}
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.hearAboutUs && formik.errors.hearAboutUs ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Job Board">Job Board</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.hearAboutUs && formik.errors.hearAboutUs && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.hearAboutUs}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="md:col-span-2">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center px-4 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Choose File</span>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  className="hidden"
                />
              </label>
              <span className="ml-4 text-sm text-gray-600">
                {resumeFileName || 'No file chosen'}
              </span>
            </div>
            {formik.touched.resume && formik.errors.resume && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.resume}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX (Max. 5MB)</p>
          </div>

          {/* Cover Letter */}
          <div className="md:col-span-2">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows="5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.coverLetter}
              placeholder="Tell us why you're a good fit for this position..."
              className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.coverLetter && formik.errors.coverLetter ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.coverLetter && formik.errors.coverLetter && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.coverLetter}</p>
            )}
          </div>

         
        </div>

        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
                              onClick={() => navigate("/career")}

            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
