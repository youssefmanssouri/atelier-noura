'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export interface FormValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  approximateSize: string;
  timeline: string;
  message: string;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  location: '',
  approximateSize: '',
  timeline: '',
  message: '',
};

const PROJECT_TYPE_OPTIONS = [
  { value: 'Residential Architecture', label: 'Residential Architecture' },
  { value: 'Interior Design & Renovation', label: 'Interior Design & Renovation' },
  { value: 'Hospitality & Commercial', label: 'Hospitality & Commercial' },
];

const TIMELINE_OPTIONS = [
  { value: 'Immediate', label: 'Immediate (1–2 months)' },
  { value: '3–6 months', label: '3–6 months' },
  { value: '6–12 months', label: '6–12 months' },
  { value: 'Planning phase', label: 'Planning phase / Early concept' },
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!values.name.trim() || values.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    } else if (values.name.trim().length > 100) {
      newErrors.name = 'Full name cannot exceed 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (values.phone.trim() && values.phone.trim().length > 30) {
      newErrors.phone = 'Phone number cannot exceed 30 characters.';
    }

    if (!values.projectType) {
      newErrors.projectType = 'Please select a project typology.';
    }

    if (!values.location.trim() || values.location.trim().length < 2) {
      newErrors.location = 'Project location is required (city, region, or site).';
    } else if (values.location.trim().length > 150) {
      newErrors.location = 'Location cannot exceed 150 characters.';
    }

    if (values.approximateSize.trim() && values.approximateSize.trim().length > 100) {
      newErrors.approximateSize = 'Approximate scale cannot exceed 100 characters.';
    }

    if (!values.timeline) {
      newErrors.timeline = 'Please select an estimated project timeline.';
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      newErrors.message = 'Project brief must be at least 10 characters.';
    } else if (values.message.trim().length > 3000) {
      newErrors.message = 'Project brief cannot exceed 3000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          projectType: values.projectType,
          location: values.location.trim(),
          approximateSize: values.approximateSize.trim() || undefined,
          timeline: values.timeline,
          message: values.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 400 && data.error?.details) {
          const fieldErrors: Record<string, string> = {};
          if (Array.isArray(data.error.details)) {
            data.error.details.forEach((issue: { field: string; message: string }) => {
              if (issue.field) {
                fieldErrors[issue.field] = issue.message;
              }
            });
          }
          setErrors(fieldErrors);
          setServerError('Please correct the highlighted fields below.');
        } else if (response.status === 429) {
          setServerError('Too many inquiries submitted from your network. Please wait a moment or email us directly.');
        } else {
          setServerError(data.error?.message || 'An unexpected error occurred. Please try again or reach us via email.');
        }
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      setServerError('Unable to reach the studio server. Please check your network connection or email us directly at contact@ateliernoura.ma.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="rounded-[2px] border border-[#DDD6CC] bg-[#FAF8F5] p-8 sm:p-12 space-y-6 animate-fadeIn"
        role="status"
        aria-live="polite"
      >
        <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#A45D49] block">
          Inquiry Confirmation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321] leading-tight">
          Inquiry received.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed max-w-xl">
          Thank you for sharing your architectural brief. Atelier Noura reviews new spatial commissions thoughtfully and will respond directly to discuss site context and scheduling.
        </p>

        <div className="pt-4 border-t border-[#E8E2D9] flex flex-wrap items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-[2px] bg-[#242321] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#F2EEE8] transition-colors duration-200 hover:bg-[#302725] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#242321]"
          >
            Explore Portfolio Work →
          </Link>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs font-sans uppercase tracking-[0.16em] text-[#6F6962] hover:text-[#242321] underline"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {serverError && (
        <div
          className="rounded-[2px] border border-[#A45D49]/30 bg-[#A45D49]/10 p-4 text-xs font-sans text-[#A45D49] leading-relaxed"
          role="alert"
        >
          {serverError}
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField id="inquiry-name" label="Full Name" required error={errors.name}>
          <Input
            id="inquiry-name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g. Yasmine Benali"
            disabled={isSubmitting}
            hasError={Boolean(errors.name)}
            aria-required="true"
          />
        </FormField>

        <FormField id="inquiry-email" label="Email Address" required error={errors.email}>
          <Input
            id="inquiry-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="yasmine@example.com"
            disabled={isSubmitting}
            hasError={Boolean(errors.email)}
            aria-required="true"
          />
        </FormField>
      </div>

      {/* Row 2: Phone (Optional) & Project Typology */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="inquiry-phone"
          label="Phone Number"
          helperText="Optional, for direct coordination"
          error={errors.phone}
        >
          <Input
            id="inquiry-phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="+212 600 000 000"
            disabled={isSubmitting}
            hasError={Boolean(errors.phone)}
          />
        </FormField>

        <FormField
          id="inquiry-projectType"
          label="Project Typology"
          required
          error={errors.projectType}
        >
          <Select
            id="inquiry-projectType"
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
            placeholder="Select project typology"
            options={PROJECT_TYPE_OPTIONS}
            disabled={isSubmitting}
            hasError={Boolean(errors.projectType)}
            aria-required="true"
          />
        </FormField>
      </div>

      {/* Row 3: Location & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="inquiry-location"
          label="Site Location"
          required
          helperText="City, district, or region of the property"
          error={errors.location}
        >
          <Input
            id="inquiry-location"
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Taghazout Bay, Agadir"
            disabled={isSubmitting}
            hasError={Boolean(errors.location)}
            aria-required="true"
          />
        </FormField>

        <FormField
          id="inquiry-timeline"
          label="Envisioned Timeline"
          required
          error={errors.timeline}
        >
          <Select
            id="inquiry-timeline"
            name="timeline"
            value={values.timeline}
            onChange={handleChange}
            placeholder="Select target timeline"
            options={TIMELINE_OPTIONS}
            disabled={isSubmitting}
            hasError={Boolean(errors.timeline)}
            aria-required="true"
          />
        </FormField>
      </div>

      {/* Row 4: Approximate Scale (Optional) */}
      <FormField
        id="inquiry-approximateSize"
        label="Approximate Scale / Footprint"
        helperText="Optional estimated building footprint or land area"
        error={errors.approximateSize}
      >
        <Input
          id="inquiry-approximateSize"
          name="approximateSize"
          value={values.approximateSize}
          onChange={handleChange}
          placeholder="e.g. 450 m² plot / 3-bedroom residence"
          disabled={isSubmitting}
          hasError={Boolean(errors.approximateSize)}
        />
      </FormField>

      {/* Row 5: Project Brief */}
      <FormField
        id="inquiry-message"
        label="Project Brief &amp; Spatial Requirements"
        required
        helperText="Describe the place, orientation, spatial requirements, or renovation scope"
        error={errors.message}
      >
        <Textarea
          id="inquiry-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us about the property, architectural goals, site constraints, and envisioned character..."
          disabled={isSubmitting}
          hasError={Boolean(errors.message)}
          aria-required="true"
        />
      </FormField>

      {/* Action Row */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Submitting project inquiry...' : 'Submit Project Inquiry'}
        </Button>

        <span className="text-[11px] font-sans text-[#6F6962] block">
          Direct email inquiry:{' '}
          <a
            href="mailto:contact@ateliernoura.ma"
            className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2"
          >
            contact@ateliernoura.ma
          </a>
        </span>
      </div>
    </form>
  );
}

export default ContactForm;
