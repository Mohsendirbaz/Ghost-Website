import { useLang } from '../context/LanguageContext';
import Breadcrumb from '../components/Breadcrumb';
import { HeroMinimal } from '../components/Hero';
import { copy } from '../data/copy';
import './Page.css';

/**
 * Legal pages — Privacy and Terms. Deliberately plain and accurate:
 * they describe only what the site actually does. Single legitimate
 * contact: dirbaz.sharif@gmail.com · +1-312-925-5930.
 */

const EMAIL = 'dirbaz.sharif@gmail.com';
const PHONE = '+1-312-925-5930';
const EFFECTIVE = { en: 'Effective July 16, 2026', fa: 'مؤثر از ۱۶ ژوئیهٔ ۲۰۲۶ (۲۵ تیر ۱۴۰۵)' };

function LegalShell({ title, children }) {
  const { lang } = useLang();
  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: title },
      ]} />
      <HeroMinimal h1={title} subhead={EFFECTIVE[lang] || EFFECTIVE.en} />
      <article className="essay">
        <div className="container essay__inner">
          <div className="essay__body">{children}</div>
        </div>
      </article>
    </main>
  );
}

export function Privacy() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  return (
    <LegalShell title={fa ? 'حریم خصوصی' : 'Privacy'}>
      {fa ? (
        <>
          <p>این وب‌گاه حداقلِ ممکن را جمع‌آوری می‌کند. فرم تماس هیچ داده‌ای را به سرور ما یا شخص ثالث نمی‌فرستد؛ ارسال آن، برنامهٔ ایمیل خودِ شما را با پیامی خطاب به {EMAIL} باز می‌کند و ارسال در اختیار شماست.</p>
          <p>تحلیل بازدید (Vercel Analytics و Speed Insights) تنها در صورت پذیرش شما در نوار رضایت فعال می‌شود و شامل شناسهٔ فردی نیست. رد کردن رضایت، هیچ کارکردی از وب‌گاه را محدود نمی‌کند.</p>
          <p>ترجیحات شما — زبان، پوسته (روشن/تیره)، و «تخته‌ٔ حقایق» ذخیره‌شده — فقط در مرورگر خودتان (localStorage/کوکی) نگهداری می‌شود و هرگز به ما ارسال نمی‌شود. پاک‌کردن دادهٔ مرورگر، همهٔ آن را حذف می‌کند.</p>
          <p>ما داده‌ای نمی‌فروشیم، فهرست ایمیلی نگه نمی‌داریم، و جز آنچه گفته شد چیزی جمع نمی‌کنیم. برای هر پرسش دربارهٔ حریم خصوصی: {EMAIL} · {PHONE}</p>
        </>
      ) : (
        <>
          <p>This site collects as little as possible. The contact form sends nothing to our servers or to any third party; submitting it opens your own mail client with a message addressed to {EMAIL}, and sending is entirely in your hands.</p>
          <p>Visit analytics (Vercel Analytics and Speed Insights) run only if you accept the consent banner, and contain no personal identifiers. Declining consent limits no functionality.</p>
          <p>Your preferences — language, theme, and the saved facts board — live only in your own browser (localStorage and a cookie) and are never transmitted to us. Clearing your browser data removes all of it.</p>
          <p>We sell no data, keep no mailing list, and collect nothing beyond what is described here. Privacy questions: {EMAIL} · {PHONE}</p>
        </>
      )}
    </LegalShell>
  );
}

export function Terms() {
  const { lang } = useLang();
  const fa = lang === 'fa';
  return (
    <LegalShell title={fa ? 'شرایط استفاده' : 'Terms of Use'}>
      {fa ? (
        <>
          <p>محتوای این وب‌گاه برای اطلاع‌رسانی است و «همان‌گونه که هست» ارائه می‌شود. برنامهٔ Ghost Autonomy یک برنامهٔ پژوهشی و طراحی است؛ ادعاها در سراسر وب‌گاه با جایگاه صریح ارائه می‌شوند — اندازه‌گیری‌شده، اثبات‌شده، برآوردی یا پیشنهادی — و هیچ‌چیز فراتر از جایگاهِ اعلام‌شده‌اش تضمین نمی‌شود.</p>
          <p>هیچ بخشی از این وب‌گاه پیشنهاد فروش یا دعوت به خرید اوراق بهادار نیست و نباید مبنای تصمیم سرمایه‌گذاری قرار گیرد. گفت‌وگوهای تجاری و فنیِ عمیق‌تر مستلزم توافق‌نامهٔ عدم افشا (NDA) است.</p>
          <p>اسناد و تصاویرِ منتشرشده متعلق به Ghost Autonomy است (© ۲۰۲۶) مگر آن‌که خلافش قید شده باشد؛ استفادهٔ پژوهشی با ارجاع آزاد است. تنها مرجع تماس: {EMAIL} · {PHONE}</p>
        </>
      ) : (
        <>
          <p>The content of this site is informational and provided as-is. The Ghost Autonomy program is a research and design program; claims across this site carry an explicit standing — measured, proven, projected, or proposed — and nothing is warranted beyond its stated standing.</p>
          <p>Nothing on this site is an offer to sell, or a solicitation to buy, securities, and it should not be relied on for investment decisions. Substantive technical and business discussions require a mutual non-disclosure agreement.</p>
          <p>Published documents and figures are © 2026 Ghost Autonomy unless noted otherwise; research use with attribution is welcome. The sole contact: {EMAIL} · {PHONE}</p>
        </>
      )}
    </LegalShell>
  );
}
