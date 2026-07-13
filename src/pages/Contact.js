import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import { HeroMinimal } from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';
import './Page.css';

// ─── Configure your Formspree form endpoint here ─────────────────────────────
// 1. Sign up at https://formspree.io (free tier: 50 submissions/month)
// 2. Create a new form and copy the endpoint URL (e.g. https://formspree.io/f/xabcdefg)
// 3. Replace the placeholder below with your endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
// ─────────────────────────────────────────────────────────────────────────────

function validate(form, lang) {
  const errors = {};
  const isRtl = lang === 'fa';

  if (!form.name.trim()) {
    errors.name = isRtl ? 'نام الزامی است' : 'Name is required';
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = isRtl ? 'ایمیل الزامی است' : 'Email is required';
  } else if (!emailRe.test(form.email.trim())) {
    errors.email = isRtl ? 'ایمیل معتبر وارد کنید' : 'Please enter a valid email';
  }

  if (!form.message.trim()) {
    errors.message = isRtl ? 'پیام الزامی است' : 'Message is required';
  }

  return errors;
}

export default function Contact() {
  const { lang } = useLang();
  const t = copy[lang].contact;
  const isRtl = lang === 'fa';

  const [status, setStatus]     = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors]     = useState({});
  const [serverError, setServerError] = useState('');
  const [form, setForm]         = useState({ name: '', email: '', org: '', type: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validate(form, lang);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:         form.name.trim(),
          email:        form.email.trim(),
          organization: form.org.trim(),
          inquiry_type: form.type,
          message:      form.message.trim(),
          _language:    lang,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(
          data?.error ||
          (isRtl ? 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' : 'Something went wrong. Please try again.')
        );
        setStatus('error');
      }
    } catch {
      setServerError(
        isRtl
          ? 'خطای اتصال. لطفاً اتصال اینترنت خود را بررسی کنید.'
          : 'Connection error. Please check your internet connection.'
      );
      setStatus('error');
    }
  };

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.contact },
      ]} />
      <HeroMinimal
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <section className="contact-layout">
        <div className="container contact-layout__inner">
          <div className="contact-form">
            <h2>{t.formTitle}</h2>
            {status === 'success' ? (
              <div className="form-success">{t.successMsg}</div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">{t.nameLabel}</label>
                  <input
                    id="name" name="name" type="text"
                    className={`form-input${errors.name ? ' form-input--error' : ''}`}
                    required
                    value={form.name} onChange={handleChange}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && <span id="err-name" className="form-error" role="alert">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">{t.emailLabel}</label>
                  <input
                    id="email" name="email" type="email"
                    className={`form-input${errors.email ? ' form-input--error' : ''}`}
                    required
                    value={form.email} onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && <span id="err-email" className="form-error" role="alert">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="org">{t.orgLabel}</label>
                  <input
                    id="org" name="org" type="text"
                    className="form-input"
                    value={form.org} onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="type">{t.typeLabel}</label>
                  <select
                    id="type" name="type"
                    className="form-select"
                    value={form.type} onChange={handleChange}
                  >
                    <option value="">--</option>
                    {t.types.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">{t.messageLabel}</label>
                  <textarea
                    id="message" name="message"
                    className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
                    required
                    value={form.message} onChange={handleChange}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                  />
                  {errors.message && <span id="err-message" className="form-error" role="alert">{errors.message}</span>}
                </div>
                {serverError && (
                  <div className="form-server-error" role="alert">{serverError}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? (isRtl ? 'در حال ارسال...' : 'Sending…')
                    : t.submitBtn}
                </button>
              </form>
            )}
          </div>

          <div className="contact-sidebar">
            <div className="contact-card">
              <h3>{t.ndaTitle}</h3>
              <p>{t.ndaBody}</p>
              <button
                className="btn btn-outline"
                onClick={() => setForm(f => ({ ...f, type: t.types[1] }))}
              >
                {t.ndaBtn}
              </button>
            </div>

            <div className="contact-card">
              <h3>{t.generalTitle}</h3>
              <p style={{ margin: 0, fontWeight: 600 }}>{t.contactName}</p>
              <a href={`mailto:${t.generalEmail}`}>{t.generalEmail}</a>
              <a href={`tel:${(t.contactPhone || '').replace(/[^+\d]/g, '')}`}>{t.contactPhone}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
