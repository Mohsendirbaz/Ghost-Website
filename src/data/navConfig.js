/**
 * navConfig — the single source of truth for the primary site navigation.
 *
 * Consumed by BOTH the header mega-menu (needs iconKey + desc) and the
 * multi-level static TopNavBar (uses label + to). Keeping one definition
 * means the two menus can never drift, and the sitemap can be verified
 * against exactly these routes.
 *
 * Invariant (checked by scripts/verifyNav.js): every `to` here — minus the
 * /:lang prefix — must exist in scripts/generateSitemap.js PAGES, and every
 * PAGES entry except the footer-only legal pages (privacy, terms) must appear
 * here. Science was merged into Technology on 2026-07-17; /science now
 * redirects to /technology and is intentionally absent below.
 */
export function getNavGroups(t, lang, isRtl) {
  return [
    {
      id: 'company',
      label: isRtl ? 'شرکت' : 'Company',
      links: [
        { label: t.home,       to: `/${lang}`,            iconKey: 'home',       desc: isRtl ? 'صفحه اصلی' : 'Start here' },
        { label: t.technology, to: `/${lang}/technology`, iconKey: 'technology', desc: isRtl ? 'فناوری و علمِ پشت آن، یک‌جا' : 'The technology — and the science behind it' },
        { label: t.safety,     to: `/${lang}/safety`,     iconKey: 'safety',     desc: isRtl ? 'رویکرد ایمنی‌محور' : 'Safety-first approach' },
        { label: t.bio,        to: `/${lang}/bio`,        iconKey: 'bio',        desc: isRtl ? 'زندگینامه بنیان‌گذار' : 'Founder biography' },
        { label: t.careers,    to: `/${lang}/careers`,    iconKey: 'contact',    desc: isRtl ? 'نقش‌هایی که می‌جوییم' : 'Roles we are looking to fill' },
        { label: t.contact,    to: `/${lang}/contact`,    iconKey: 'contact',    desc: isRtl ? 'تماس با ما' : 'Get in touch' },
      ],
    },
    {
      id: 'research',
      label: isRtl ? 'تحقیق و دانش' : 'Research',
      links: [
        { label: t.perspective,      to: `/${lang}/perspective`,        iconKey: 'perspective',   desc: isRtl ? 'دیدگاه صنعت' : 'Industry perspective' },
        { label: t.architecture,     to: `/${lang}/architecture`,       iconKey: 'architecture',  desc: isRtl ? 'معماری سیستم' : 'System architecture deep-dive' },
        { label: t.knowledgeBase,    to: `/${lang}/knowledge-base`,     iconKey: 'knowledgeBase', desc: isRtl ? '۸ بخش · ۴۳ فصل' : '8 parts · 43 chapters' },
        { label: t.multiAgentSystem, to: `/${lang}/multi-agent-system`, iconKey: 'multiAgent',    desc: isRtl ? 'آزمایشگاه پژوهشی رویدادمحور' : 'Event-sourced research laboratory' },
        { label: t.methods,          to: `/${lang}/methods`,            iconKey: 'science',       desc: isRtl ? 'فرامتد، برنامه اکتشاف و ممیزی بیرونی' : 'Meta-method, discovery program & external audit' },
      ],
    },
    {
      id: 'resources',
      label: isRtl ? 'منابع' : 'Resources',
      links: [
        { label: t.exhibition,      to: `/${lang}/exhibition`,     iconKey: 'exhibition',      desc: isRtl ? 'نرم‌افزار پژوهشی، زنده در مرورگر' : 'The research software, running live' },
        { label: t.memoryWing,      to: `/${lang}/memory`,         iconKey: 'libraryAssets',   desc: isRtl ? 'ابزارهای ماژول حافظه، زنده' : 'Memory Module instruments, live' },
        { label: t.simulation,      to: `/${lang}/simulation`,     iconKey: 'exhibition',      desc: isRtl ? 'شبیه‌سازی‌های سطح برنامه‌ریزی، زنده' : 'Planning-stack simulations, live' },
        { label: t.artifacts,       to: `/${lang}/artifacts`,      iconKey: 'artifacts',       desc: isRtl ? 'تصویرسازی‌های تعاملی' : 'Interactive visualizations' },
        { label: t.libraryAssets,   to: `/${lang}/library/assets`, iconKey: 'libraryAssets',   desc: isRtl ? 'دارایی‌های فنی منتخب' : 'Curated technical assets' },
        { label: t.documentArchive, to: `/${lang}/library`,        iconKey: 'documentArchive', desc: isRtl ? '۶۰ سند آرشیو' : '60 archived documents' },
        { label: t.finalPlate,      to: `/${lang}/epu`,            iconKey: 'exhibition',      desc: isRtl ? 'پوستر EPU — آخرین صفحهٔ سایت' : 'The EPU poster — the site’s last page' },
      ],
    },
  ];
}
