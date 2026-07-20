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

/* Five vacancies — the meaningful set (2026-07-17): three technical roles
   keyed to the Faculty of Fifty roster, two executive roles that build the
   organization around the stack. */
const OPENINGS = [
  {
    key: 'vehicle-dynamics',
    codes: 'AD-CTRL · SIMULATION BENCH',
    en: { title: 'Vehicle Dynamics Specialist', line: 'The planning-level models already run live on the Simulation Bench; make them true at the tire. Kinematic-to-dynamic fidelity, friction-circle behavior, jerk- and steering-rate-bounded maneuvering — owned end to end, from instrument to asphalt.' },
    fa: { title: 'متخصص دینامیک خودرو', line: 'مدل‌های سطح برنامه‌ریزی هم‌اکنون روی میز شبیه‌سازی زنده اجرا می‌شوند؛ آن‌ها را در تماس لاستیک با جاده حقیقی کنید. وفاداری از سینماتیک تا دینامیک، رفتار دایرهٔ اصطکاک، و مانور با قید تکانه و نرخ فرمان — سرتاسر، از ابزار تا آسفالت.' },
  },
  {
    key: 'advanced-control',
    codes: 'AD-PLAN · AD-FORM · SAF-MONO·FILT',
    en: { title: 'Principal Advanced Control Engineer — Multidisciplinary', line: 'Control carried across disciplines: MPC and CBF safety filtering, the two proven invariants, trajectory optimization with certificates, actuation under hard bounds — by someone equally fluent in dynamics, optimization, and the hardware the mathematics must survive on.' },
    fa: { title: 'مهندس ارشد کنترل پیشرفته — میان‌رشته‌ای', line: 'کنترل در گسترهٔ چند رشته: پالایش ایمنی MPC و CBF، دو ناوردای اثبات‌شده، بهینه‌سازی مسیر با گواهی، و کنشگری زیر قیدهای سخت — به‌دست کسی که به یک اندازه به دینامیک، بهینه‌سازی و سخت‌افزاری که ریاضیات باید روی آن دوام بیاورد مسلط است.' },
  },
  {
    key: 'ic-design',
    codes: 'HW-ISA · HW-NUM · HW-SIL · SAF-GUARD',
    en: { title: 'Integrated Circuit Design Principal Engineer', line: 'The EPU from architecture to tape-out discipline: the PICAPD instruction set, conservation-check primitives, numerically-safe posit/quire arithmetic under WCET, and the ~32 ns hardwired analog veto path — FPGA and lockstep RISC-V now, ASIC later.' },
    fa: { title: 'مهندس اصلی طراحی مدار مجتمع', line: 'EPU از معماری تا انضباط ساخت: مجموعه‌دستور PICAPD، اولیه‌های بررسی بقا، محاسبات امن عددی posit/quire با انضباط WCET، و مسیر وتوی آنالوگ سخت‌سیم ~۳۲ نانوثانیه‌ای — اکنون FPGA و RISC-V هم‌گام، سپس ASIC.' },
  },
  {
    key: 'sustainability',
    codes: 'EXECUTIVE · C-SUITE',
    en: { title: 'Chief Sustainability Officer', line: 'The program’s taproot is biomass-gasification research and its stated vision is equitable decarbonization. Own that thread as strategy: sustainability and impact accounting, responsible-technology governance, and the bridge from research program to accountable enterprise.' },
    fa: { title: 'مدیر ارشد پایداری', line: 'ریشهٔ برنامه در پژوهش گازی‌سازی زیست‌توده است و چشم‌اندازش کربن‌زدایی عادلانه. این رشته را به‌مثابه راهبرد در اختیار بگیرید: حسابداری پایداری و اثر، حکمرانی فناوری مسئولانه، و پل از برنامهٔ پژوهشی تا بنگاه پاسخگو.' },
  },
  {
    key: 'talent',
    codes: 'EXECUTIVE · TALENT · FACULTY OF FIFTY',
    en: { title: 'Head of Talent — Head-hunter', line: 'The Faculty of Fifty is a roster before it is a team. Find the P1 specialists this page names, court them, and close them — executive search as the program’s first growth discipline, run with the same rigor as the stack it staffs.' },
    fa: { title: 'سرپرست جذب استعداد — شکارچی استعداد', line: 'هیئت پنجاه‌گانه پیش از آن‌که تیم باشد، یک فهرست است. متخصصان P1 همین صفحه را بیابید، جذبشان کنید و کار را تمام کنید — جست‌وجوی اجرایی به‌مثابه نخستین انضباط رشد برنامه، با همان سخت‌گیریِ پشته‌ای که برایش نیرو می‌چیند.' },
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
      ? 'Ghost Autonomy یک برنامهٔ پژوهشی مرحلهٔ آغازین است که تیم بنیان‌گذارش را می‌سازد — پنج جای خالی معنادار، نه بیشتر. سه نقش فنی از «هیئت پنجاه‌گانهٔ» خود برنامه استخراج شده‌اند؛ دو نقش اجرایی سازمان را گرد پشته بنا می‌کنند. ساختار همکاری و جبران مستقیماً با بنیان‌گذار تنظیم می‌شود.'
      : 'Ghost Autonomy is an early-stage research program assembling its founding team — five meaningful vacancies, no more. Three technical roles derive from the program’s own Faculty of Fifty roster; two executive roles build the organization around the stack. Collaboration and compensation structure is arranged directly with the founder.',
    openingsTitle: fa ? 'پنج نقشی که به‌دنبال پرکردنشان هستیم' : 'The Five Roles We Are Looking to Fill',
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
