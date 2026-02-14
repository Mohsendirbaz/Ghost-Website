import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Hero from '../components/Hero';
import './Page.css';

export default function Contact() {
  const { lang } = useLang();
  const t = copy[lang].contact;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', org: '', type: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content">
      <Hero
        eyebrow={lang === 'en' ? 'Contact' : 'تماس'}
        h1={t.heroH1}
        subhead={t.heroSub}
      />

      <section className="contact-layout">
        <div className="container contact-layout__inner">
          <div className="contact-form">
            <h2>{t.formTitle}</h2>
            {submitted ? (
              <div className="form-success">{t.successMsg}</div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">{t.nameLabel}</label>
                  <input
                    id="name" name="name" type="text"
                    className="form-input" required
                    value={form.name} onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">{t.emailLabel}</label>
                  <input
                    id="email" name="email" type="email"
                    className="form-input" required
                    value={form.email} onChange={handleChange}
                    autoComplete="email"
                  />
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
                    className="form-textarea" required
                    value={form.message} onChange={handleChange}
                    rows={5}
                  />
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  {t.submitBtn}
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
              <a href={`mailto:${t.generalEmail}`}>{t.generalEmail}</a>
              <a href={`mailto:${t.pressEmail}`}>{t.pressEmail}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
