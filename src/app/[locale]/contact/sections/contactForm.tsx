'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { ScrollReveal } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight,
  staggerContainer,
  scaleIn
} from '@/lib/animations';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  company: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactFormSection: React.FC = () => {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    businessEmail: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactDetails = [
    {
      icon: Phone,
      label: t('contactDetails.phone.label'),
      value: t('contactDetails.phone.value'),
      href: `tel:${t('contactDetails.phone.value')}`,
    },
    {
      icon: Mail,
      label: t('contactDetails.email.label'),
      value: t('contactDetails.email.value'),
      href: `mailto:${t('contactDetails.email.value')}`,
    },
    {
      icon: MapPin,
      label: t('contactDetails.address.label'),
      value: t('contactDetails.address.value'),
      href: "#",
    },
    {
      icon: Clock,
      label: t('contactDetails.hours.label'),
      value: t('contactDetails.hours.value'),
      href: "#",
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('form.fields.firstName.required');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('form.fields.lastName.required');
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = t('form.fields.businessEmail.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = t('form.fields.businessEmail.invalid');
    }

    if (!formData.company.trim()) {
      newErrors.company = t('form.fields.company.required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.fields.message.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24",
          isRTL ? "lg:grid-flow-col-dense" : ""
        )}>
          
          {/* Contact Form - Left in LTR, Right in RTL */}
          <ScrollReveal 
            className={cn(
              "space-y-8",
              isRTL ? "lg:order-2" : "lg:order-1"
            )}
            direction="left"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              
              {/* Form Title */}
              <motion.h2 
                variants={fadeInUp}
                className={cn(
                  "text-3xl md:text-4xl font-medium text-black mb-8",
                  isRTL ? "font-arabic text-right" : "font-inter text-left"
                )}
              >
                {t('form.title')}
              </motion.h2>

              {/* Form */}
              <motion.form 
                variants={staggerContainer}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                
                {/* First Row - Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* First Name */}
                  <motion.div variants={fadeInUp}>
                    <label 
                      htmlFor="firstName"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.fields.firstName.label')}*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('form.fields.firstName.placeholder')}
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left",
                        errors.firstName ? "border-red-500" : ""
                      )}
                    />
                    {errors.firstName && (
                      <p className={cn(
                        "mt-1 text-sm text-red-600",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}>
                        {errors.firstName}
                      </p>
                    )}
                  </motion.div>

                  {/* Last Name */}
                  <motion.div variants={fadeInUp}>
                    <label 
                      htmlFor="lastName"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.fields.lastName.label')}*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('form.fields.lastName.placeholder')}
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left",
                        errors.lastName ? "border-red-500" : ""
                      )}
                    />
                    {errors.lastName && (
                      <p className={cn(
                        "mt-1 text-sm text-red-600",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}>
                        {errors.lastName}
                      </p>
                    )}
                  </motion.div>
                  
                </div>

                {/* Second Row - Business Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Business Email */}
                  <motion.div variants={fadeInUp}>
                    <label 
                      htmlFor="businessEmail"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.fields.businessEmail.label')}*
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      placeholder={t('form.fields.businessEmail.placeholder')}
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left",
                        errors.businessEmail ? "border-red-500" : ""
                      )}
                    />
                    {errors.businessEmail && (
                      <p className={cn(
                        "mt-1 text-sm text-red-600",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}>
                        {errors.businessEmail}
                      </p>
                    )}
                  </motion.div>

                  {/* Company */}
                  <motion.div variants={fadeInUp}>
                    <label 
                      htmlFor="company"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.fields.company.label')}*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t('form.fields.company.placeholder')}
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left",
                        errors.company ? "border-red-500" : ""
                      )}
                    />
                    {errors.company && (
                      <p className={cn(
                        "mt-1 text-sm text-red-600",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}>
                        {errors.company}
                      </p>
                    )}
                  </motion.div>
                  
                </div>

                {/* Message Field */}
                <motion.div variants={fadeInUp}>
                  <label 
                    htmlFor="message"
                    className={cn(
                      "block text-sm font-medium text-gray-700 mb-2",
                      isRTL ? "font-arabic text-right" : "font-inter text-left"
                    )}
                  >
                    {t('form.fields.message.label')}*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('form.fields.message.placeholder')}
                    className={cn(
                      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-vertical",
                      isRTL ? "font-arabic text-right" : "font-inter text-left",
                      errors.message ? "border-red-500" : ""
                    )}
                  />
                  {errors.message && (
                    <p className={cn(
                      "mt-1 text-sm text-red-600",
                      isRTL ? "font-arabic text-right" : "font-inter text-left"
                    )}>
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button and Privacy */}
                <motion.div 
                  variants={fadeInUp}
                  className="pt-4"
                >
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mb-4",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {isSubmitting ? t('form.sending') : t('form.submit')}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "text-green-600 text-sm mb-4",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.success')}
                    </motion.p>
                  )}

                  {submitStatus === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "text-red-600 text-sm mb-4",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    >
                      {t('form.error')}
                    </motion.p>
                  )}

                  {/* Privacy Policy */}
                  <p className={cn(
                    "text-xs text-gray-500",
                    isRTL ? "font-arabic text-right" : "font-inter text-left"
                  )}>
                    {t('form.privacy.text')}{' '}
                    <a href="#" className="text-black hover:underline">
                      {t('form.privacy.link')}
                    </a>{' '}
                    {t('form.privacy.and')}{' '}
                    <a href="#" className="text-black hover:underline">
                      {t('form.privacy.terms')}
                    </a>.
                  </p>
                  
                </motion.div>

              </motion.form>
              
            </motion.div>
          </ScrollReveal>

          {/* Contact Details - Right in LTR, Left in RTL */}
          <ScrollReveal 
            className={cn(
              "space-y-8",
              isRTL ? "lg:order-1" : "lg:order-2"
            )}
            direction="right"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              
              {/* Contact Details Title */}
              <motion.h2 
                variants={fadeInUp}
                className={cn(
                  "text-3xl md:text-4xl font-medium text-black mb-12",
                  isRTL ? "font-arabic text-right" : "font-inter text-left"
                )}
              >
                {t('contactDetails.title')}
              </motion.h2>

              {/* Contact Details List */}
              <motion.div 
                variants={staggerContainer}
                className="space-y-8"
              >
                {contactDetails.map((detail, index) => {
                  const IconComponent = detail.icon;
                  return (
                    <motion.a
                      key={index}
                      href={detail.href}
                      variants={scaleIn}
                      whileHover={{ scale: 1.02, x: isRTL ? -5 : 5 }}
                      className={cn(
                        "group flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100",
                        isRTL ? "text-right" : "text-left"
                      )}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center group-hover:bg-black/10 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-sm font-medium text-gray-600 mb-1",
                          isRTL ? "font-arabic" : "font-inter"
                        )}>
                          {detail.label}
                        </h3>
                        <p className={cn(
                          "text-lg font-medium text-black group-hover:text-gray-700 transition-colors duration-300",
                          isRTL ? "font-arabic" : "font-inter"
                        )}>
                          {detail.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
              
            </motion.div>
          </ScrollReveal>
          
        </div>
      </Container>
    </section>
  );
}; 