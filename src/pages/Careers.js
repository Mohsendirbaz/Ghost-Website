import { useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { HeroMinimal } from '../components/Hero';
import './Page.css';

/**
 * Careers — the roles Ghost is looking to fill, and the fifteen skillsets
 * the stack demands. Skill selection is grounded in the program's own
 * Faculty of Fifty roster (GHOST-Endeavour_Skill-Roster v0.1, May 2026):
 * the fifteen cards below cover every P1 technical cluster in that roster,
 * with roster codes shown for provenance.
 *
 * Application process — deliberately hassle-free and storage-free:
 * one resume selection, one button, one email to the sole legitimate
 * contact (dirbaz.sharif@gmail.com). The visitor's own mail client sends;
 * nothing is uploaded to or stored by this site.
 */

const EMAIL = 'dirbaz.sharif@gmail.com';
const PHONE = '+1-312-925-5930';

const OPENINGS = [
  {
    key: 'perception',
    codes: 'AD-PERC · AD-RDR · AD-FUSE · AD-LOC',
    en: { title: 'Perception & Sensor Fusion Lead', line: 'Own the evidence side of the stack: camera, radar and Doppler processing, physics-diverse multi-sensor fusion with provenance, and localization on the navigation manifold.' },
    fa: { title: 'سرپرست ادراک و همجوشی حسگرها', line: 'مالکیت سمتِ شواهد در پشته: پردازش دوربین، رادار و داپلر، همجوشی چندحسگری با تنوع فیزیکی و شجره‌نامهٔ داده، و مکان‌یابی روی منیفولد ناوبری.' },
  },
  {
    key: 'planning',
    codes: 'AD-FORM · AD-PLAN · AD-PRED · AD-CTRL',
    en: { title: 'Planning & Control Lead', line: 'Formulation before solving: dynamic problem-formulation, anytime trajectory optimization with certificates, game-theoretic behavior prediction, and friction-circle-aware actuation.' },
    fa: { title: 'سرپرست برنامه‌ریزی و کنترل', line: 'صورت‌بندی پیش از حل: صورت‌بندی پویای مسئله، بهینه‌سازی مسیر با گواهی، پیش‌بینی رفتار بازی‌نظرانه، و کنشگری آگاه از دایرهٔ اصطکاک.' },
  },
  {
    key: 'safety',
    codes: 'SAF-MONO · SAF-FILT · SAF-FORMAL',
    en: { title: 'Safety Boundary Architect', line: 'The verifier side: the antitone admissible-command set, reduced-order CBF synthesis, the fidelity scalar, and formal proofs of bounded actuation with runtime OOD monitoring.' },
    fa: { title: 'معمار مرز ایمنی', line: 'سمتِ راستی‌آزما: مجموعهٔ فرمان مجاز پادتون، سنتز CBF مرتبه‌کاسته، اسکالر وفاداری، و اثبات صوری کنش کران‌دار با پایش برخط خارج-از-توزیع.' },
  },
  {
    key: 'analog',
    codes: 'SAF-GUARD',
    en: { title: 'Analog / Mixed-Signal Guard Engineer', line: 'The hardwired terminal guard: an electrically isolated, non-programmable pass-through that must reach the actuator first — nanosecond-scale timing as a design discipline.' },
    fa: { title: 'مهندس نگهبان آنالوگ / سیگنال مختلط', line: 'نگهبان پایانی سخت‌سیم: گذرگاه ایزوله و غیرقابل‌برنامه‌ریزی که باید پیش از همه به عملگر برسد — زمان‌بندی نانوثانیه‌ای به‌مثابه انضباط طراحی.' },
  },
  {
    key: 'cert',
    codes: 'SAF-CERT',
    en: { title: 'Functional-Safety & Certification Lead', line: 'The ISO 26262 and SOTIF (ISO 21448) strategy: turning a provably-bounded architecture into a certifiable one, with the unknown-unsafe treated as a first-class object.' },
    fa: { title: 'سرپرست ایمنی عملکردی و صدور گواهی', line: 'راهبرد ISO 26262 و SOTIF (ISO 21448): تبدیل معماری با کران اثبات‌پذیر به معماری قابل‌گواهی، با «ناایمنِ ناشناخته» به‌مثابه موضوع درجه‌یک.' },
  },
  {
    key: 'silicon',
    codes: 'HW-ISA · HW-NUM · HW-SIL',
    en: { title: 'Silicon & ISA Engineer', line: 'The PICAPD instruction set made real: conservation-check primitives, posit/quire numerically-safe arithmetic under WCET discipline, FPGA + lockstep RISC-V now, ASIC later.' },
    fa: { title: 'مهندس سیلیکون و معماری دستورالعمل', line: 'تحقق مجموعه‌دستور PICAPD: اولیه‌های بررسی بقا، محاسبات امن عددی posit/quire با انضباط WCET، اکنون FPGA و RISC-V هم‌گام، سپس ASIC.' },
  },
  {
    key: 'math',
    codes: 'MA-GEO · MA-TOP · MA-UQ · ROM-PI',
    en: { title: 'Applied Mathematician — Geometry, UQ & Physics-Informed ROM', line: 'Riemannian optimization, symmetry reduction and persistent homology in service of driving; uncertainty quantification on manifolds; the dissertation’s reduced-order machinery earning its keep.' },
    fa: { title: 'ریاضی‌دان کاربردی — هندسه، UQ و مدل مرتبه‌کاستهٔ فیزیک‌آگاه', line: 'بهینه‌سازی ریمانی، کاهش تقارن و همولوژی پایا در خدمت رانندگی؛ کمّی‌سازی عدم‌قطعیت روی منیفولدها؛ و ماشین مرتبه‌کاستهٔ رساله در کارِ نان‌آور.' },
  },
  {
    key: 'knowledge',
    codes: 'GOV-KTE · GOV-EVD · Memory Module',
    en: { title: 'Research Engineer — Governed Knowledge Systems', line: 'The procedural spine and the Memory Wing: knowledge transformation engineering, the evidentiary seam that keeps projection from posing as measurement, and the retrieval-covenant line of work.' },
    fa: { title: 'مهندس پژوهش — نظام‌های دانش حاکمیت‌دار', line: 'ستون رویه‌ای و بال حافظه: مهندسی تبدیل دانش، درز شواهدی که نمی‌گذارد برآورد خود را اندازه‌گیری جا بزند، و خط پژوهشی میثاق بازیابی.' },
  },
];

/* The fifteen — every P1 technical cluster of the Faculty of Fifty. */
const SKILLS = [
  { code: 'AD-PERC', p: 'P1', en: 'Vision perception & scene understanding', fa: 'ادراک بینایی و فهم صحنه' },
  { code: 'AD-RDR', p: 'P1', en: 'Radar & Doppler signal processing', fa: 'پردازش سیگنال رادار و داپلر' },
  { code: 'AD-FUSE', p: 'P1', en: 'Physics-diverse multi-sensor fusion', fa: 'همجوشی چندحسگری با تنوع فیزیکی' },
  { code: 'AD-LOC', p: 'P1', en: 'Localization & mapping on manifolds', fa: 'مکان‌یابی و نقشه‌سازی روی منیفولد' },
  { code: 'AD-PRED', p: 'P1', en: 'Behavior prediction & game-theoretic interaction', fa: 'پیش‌بینی رفتار و برهم‌کنش بازی‌نظرانه' },
  { code: 'AD-FORM', p: 'P1', en: 'Dynamic problem formulation', fa: 'صورت‌بندی پویای مسئله' },
  { code: 'AD-PLAN', p: 'P1', en: 'Trajectory optimization with certificates', fa: 'بهینه‌سازی مسیر با گواهی' },
  { code: 'AD-CTRL', p: 'P1', en: 'Vehicle dynamics & low-level control', fa: 'دینامیک خودرو و کنترل سطح پایین' },
  { code: 'SAF-MONO·FILT', p: 'P1', en: 'Monotone safety filtering & CBF synthesis', fa: 'پالایش ایمنی یکنوا و سنتز CBF' },
  { code: 'SAF-GUARD', p: 'P1', en: 'Hardwired analog guard design', fa: 'طراحی نگهبان آنالوگ سخت‌سیم' },
  { code: 'SAF-FORMAL', p: 'P1', en: 'Formal methods & runtime monitoring', fa: 'روش‌های صوری و پایش برخط' },
  { code: 'SAF-CERT', p: 'P1', en: 'ISO 26262 / SOTIF certification strategy', fa: 'راهبرد گواهی ISO 26262 / SOTIF' },
  { code: 'MA-GEO·UQ', p: 'P1', en: 'Riemannian optimization & UQ on manifolds', fa: 'بهینه‌سازی ریمانی و UQ روی منیفولد' },
  { code: 'ROM-PI·CON', p: 'P1', en: 'Physics-informed ROM & conservation checks', fa: 'مدل مرتبه‌کاستهٔ فیزیک‌آگاه و بررسی بقا' },
  { code: 'HW-ISA·NUM', p: 'P1', en: 'PICAPD ISA & numerically-safe silicon', fa: 'معماری دستور PICAPD و سیلیکون امن عددی' },
];

export default function Careers() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [role, setRole] = useState('');
  const [sent, setSent] = useState(false);

  const t = {
    eyebrow: fa ? 'Ghost Autonomy · فرصت‌های همکاری' : 'Ghost Autonomy · Careers',
    h1: fa ? 'به برنامه بپیوندید' : 'Join the Program',
    sub: fa
      ? 'Ghost Autonomy یک برنامهٔ پژوهشی مرحلهٔ آغازین است که تیم بنیان‌گذار فنی‌اش را می‌سازد. نقش‌ها از «هیئت پنجاه‌گانهٔ» خود برنامه استخراج شده‌اند؛ ساختار همکاری و جبران مستقیماً با بنیان‌گذار تنظیم می‌شود.'
      : 'Ghost Autonomy is an early-stage research program assembling its founding technical team. The roles below derive from the program’s own Faculty of Fifty roster; collaboration and compensation structure is arranged directly with the founder.',
    openingsTitle: fa ? 'نقش‌هایی که به‌دنبال پرکردنشان هستیم' : 'The Roles We Are Looking to Fill',
    skillsTitle: fa ? 'پانزده مهارتی که این پشته می‌طلبد' : 'The Fifteen Skillsets the Stack Demands',
    skillsLead: fa
      ? 'برگزیده از پنجاه تخصص فهرست‌شده در رجیستر مهارت‌های برنامه (نسخهٔ ۰.۱، مه ۲۰۲۶) — هر پانزده مورد در سطح اولویت P1.'
      : 'Selected from the fifty disciplines in the program’s skill roster (v0.1, May 2026) — all fifteen at priority P1.',
    applyTitle: fa ? 'درخواست — یک رزومه، یک ایمیل' : 'Apply — One Resume, One Email',
    applyLead: fa
      ? 'بدون فرم چندمرحله‌ای، بدون حساب کاربری، بدون ذخیره‌سازی روی این وب‌گاه. رزومه‌تان را انتخاب کنید؛ برنامهٔ ایمیل خودتان با پیام آماده باز می‌شود — فایل انتخابی را پیوست کنید و بفرستید.'
      : 'No multi-step forms, no accounts, nothing stored on this site. Choose your resume; your own mail client opens with the message prepared — attach the file you chose and send.',
    roleLabel: fa ? 'نقش موردنظر (اختیاری)' : 'Role of interest (optional)',
    anyRole: fa ? 'معرفی کلی' : 'General introduction',
    chooseFile: fa ? 'انتخاب رزومه (PDF)' : 'Choose resume (PDF)',
    chosen: fa ? 'انتخاب شد:' : 'Selected:',
    apply: fa ? 'ارسال درخواست — ایمیل باز می‌شود' : 'Apply — opens your email',
    attach: fa
      ? `ایمیل باز شد. حالا فایل «${fileName}» را به همان ایمیل پیوست کنید و بفرستید — تنها گام دستی همین است.`
      : `Your email is open. Now attach “${fileName}” to it and send — that is the only manual step.`,
    direct: fa ? 'یا مستقیم بفرستید به' : 'Or send directly to',
  };

  const handleApply = () => {
    const roleTitle = role || t.anyRole;
    const subject = `Application — ${roleTitle} — Ghost Autonomy`;
    const body = [
      fa ? `نقش موردنظر: ${roleTitle}` : `Role of interest: ${roleTitle}`,
      fileName
        ? (fa ? `رزومهٔ پیوست: ${fileName}` : `Resume attached: ${fileName}`)
        : (fa ? 'رزومه: پیوست شود' : 'Resume: to be attached'),
      '',
      fa ? '— چند خط دربارهٔ خودتان بنویسید —' : '— add a few lines about yourself —',
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main id="main-content" className="hm">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: fa ? 'فرصت‌های همکاری' : 'Careers' },
      ]} />
      <HeroMinimal h1={t.h1} subhead={t.sub} />
      <p className="hm-eyebrow" style={{ maxWidth: '1060px', margin: '0 auto', paddingInline: '1.25rem' }}>{t.eyebrow}</p>

      {/* Openings */}
      <section className="tl-tier" aria-label={t.openingsTitle}>
        <h2 className="moats__title">{t.openingsTitle}</h2>
        <div className="car-grid">
          {OPENINGS.map((o) => (
            <article key={o.key} className="car-card bp-frame">
              <span className="car-card__codes">{o.codes}</span>
              <h3 className="car-card__title">{fa ? o.fa.title : o.en.title}</h3>
              <p className="car-card__line">{fa ? o.fa.line : o.en.line}</p>
              <button
                type="button"
                className="car-card__apply"
                onClick={() => {
                  setRole(fa ? o.fa.title : o.en.title);
                  document.getElementById('apply-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {fa ? 'درخواست برای این نقش ↓' : 'Apply for this role ↓'}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* The fifteen skillsets */}
      <section className="tl-tier" aria-label={t.skillsTitle}>
        <h2 className="moats__title">{t.skillsTitle}</h2>
        <p className="hm-sub" style={{ marginBottom: '1.1rem' }}>{t.skillsLead}</p>
        <div className="car-skills">
          {SKILLS.map((s) => (
            <div key={s.code} className="car-skill bp-frame">
              <span className="car-skill__code">{s.code}</span>
              <span className="car-skill__name">{fa ? s.fa : s.en}</span>
              <span className="standing-chip">{s.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* One-step application */}
      <section id="apply-panel" className="tl-tier" aria-label={t.applyTitle} style={{ scrollMarginTop: '90px', paddingBottom: '3.5rem' }}>
        <div className="car-apply bp-frame bp-grid-bg">
          <h2 className="moats__title" style={{ marginTop: 0 }}>{t.applyTitle}</h2>
          <p className="car-apply__lead">{t.applyLead}</p>

          <div className="car-apply__row">
            <label className="car-apply__field">
              {t.roleLabel}
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">{t.anyRole}</option>
                {OPENINGS.map((o) => (
                  <option key={o.key} value={fa ? o.fa.title : o.en.title}>
                    {fa ? o.fa.title : o.en.title}
                  </option>
                ))}
              </select>
            </label>

            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={(e) => { setFileName(e.target.files?.[0]?.name || ''); setSent(false); }}
            />
            <button type="button" className="car-apply__file" onClick={() => fileRef.current?.click()}>
              {fileName ? `${t.chosen} ${fileName}` : t.chooseFile}
            </button>

            <button type="button" className="btn btn-primary" onClick={handleApply}>
              {t.apply}
            </button>
          </div>

          {sent && <p className="car-apply__attach" role="status">{t.attach}</p>}

          <p className="car-apply__direct">
            {t.direct} <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>{PHONE}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
