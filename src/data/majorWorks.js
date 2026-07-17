/**
 * The Major Works — the registry behind the front-hall carousel and the
 * instrument-level entries in the command palette and search.
 *
 * Level-one doctrine (2026-07-17): every work here is visible at level zero
 * (live in the home carousel) and interactive at level one (`enter` deep-links
 * into its wing with the instrument already open and running).
 *
 * Fields:
 *   live       iframe src for the live slide (omit when `img` is set)
 *   themeParam the file reads ?theme= (simulation instruments)
 *   img        static artwork slide (the Final Plate poster)
 *   capture    poster image shown while a slide is outside the live window
 *   enter      in-app route (lang prefix added by the consumer)
 * Add or retire works by editing this list — nothing else needs to change.
 */
export const MAJOR_WORKS = [
  {
    key: 'sim-vehicle',
    live: '/docs/html/simulation/vehicle-dynamics.html', themeParam: true,
    enter: '/simulation?view=vehicle', capture: '/covers/works/sim-vehicle.png',
    en: { t: 'Vehicle Dynamics', k: 'SIMULATION' },
    fa: { t: 'دینامیک خودرو', k: 'شبیه‌سازی' },
  },
  {
    key: 'sim-symmetry',
    live: '/docs/html/simulation/symmetry-smoothness.html', themeParam: true,
    enter: '/simulation?view=symmetry', capture: '/covers/works/sim-symmetry.png',
    en: { t: 'Symmetry & Smoothness', k: 'SIMULATION' },
    fa: { t: 'تقارن و همواری', k: 'شبیه‌سازی' },
  },
  {
    key: 'sim-actuation',
    live: '/docs/html/simulation/actuation-space.html', themeParam: true,
    enter: '/simulation?view=actuation', capture: '/covers/works/sim-actuation.png',
    en: { t: 'Actuation-Space Smoothness', k: 'SIMULATION' },
    fa: { t: 'همواری فضای عملگر', k: 'شبیه‌سازی' },
  },
  {
    key: 'mem-atlas',
    live: '/docs/html/memory/integration-atlas.html',
    enter: '/memory?view=atlas', capture: '/covers/works/mem-atlas.png',
    en: { t: 'Integration Atlas', k: 'MEMORY WING' },
    fa: { t: 'اطلس یکپارچگی', k: 'بال حافظه' },
  },
  {
    key: 'mem-matrix',
    live: '/docs/html/memory/integration-matrix.html',
    enter: '/memory?view=matrix', capture: '/covers/works/mem-matrix.png',
    en: { t: 'Synergy Matrix', k: 'MEMORY WING' },
    fa: { t: 'ماتریس هم‌افزایی', k: 'بال حافظه' },
  },
  {
    key: 'mem-spine',
    live: '/docs/html/memory/mechanism-spine.html',
    enter: '/memory?view=spine', capture: '/covers/works/mem-spine.png',
    en: { t: 'Shared Mechanism Spine', k: 'MEMORY WING' },
    fa: { t: 'ستون سازوکارهای مشترک', k: 'بال حافظه' },
  },
  {
    key: 'mem-fabric',
    live: '/docs/html/memory/symbiotic_search_fabric.html',
    enter: '/memory?view=fabric', capture: '/covers/works/mem-fabric.png',
    en: { t: 'Symbiotic Search Fabric', k: 'MEMORY WING' },
    fa: { t: 'بافت جست‌وجوی هم‌زیست', k: 'بال حافظه' },
  },
  {
    key: 'exh-multiplexer',
    live: '/exhibition/?view=multiplexer',
    enter: '/exhibition?view=multiplexer', capture: '/covers/exhibition/room-multiplexer.png',
    en: { t: 'The Multiplexer', k: 'EXHIBITION' },
    fa: { t: 'مالتی‌پلکسر', k: 'نمایشگاه' },
  },
  {
    key: 'exh-stack',
    live: '/exhibition/?view=stack',
    enter: '/exhibition?view=stack', capture: '/covers/exhibition/room-stack.png',
    en: { t: 'The Stack', k: 'EXHIBITION' },
    fa: { t: 'پشته', k: 'نمایشگاه' },
  },
  {
    key: 'exh-constitution',
    live: '/exhibition/?view=constitution',
    enter: '/exhibition?view=constitution', capture: '/covers/exhibition/room-constitution.png',
    en: { t: 'The Constitution', k: 'EXHIBITION' },
    fa: { t: 'قانون اساسی', k: 'نمایشگاه' },
  },
  {
    key: 'exh-eventfabric',
    live: '/exhibition/?view=eventfabric',
    enter: '/exhibition?view=eventfabric', capture: '/covers/exhibition/room-eventfabric.png',
    en: { t: 'The Event Fabric', k: 'EXHIBITION' },
    fa: { t: 'بافت رویداد', k: 'نمایشگاه' },
  },
  {
    key: 'mas-lab',
    live: '/docs/html/Multi_Agent_Research_Laboratory.html',
    enter: '/multi-agent-system', capture: '/covers/works/mas-lab.png',
    en: { t: 'Multi-Agent Research Laboratory', k: 'LABORATORY' },
    fa: { t: 'آزمایشگاه پژوهشی چند-عامله', k: 'آزمایشگاه' },
  },
  {
    key: 'plate',
    img: '/posters/epu-poster.web.jpg',
    enter: '/epu', capture: '/posters/epu-poster.web.jpg',
    en: { t: 'EPU — The Final Plate', k: 'CLOSING EXHIBIT' },
    fa: { t: 'EPU — برگ پایانی', k: 'پلاک پایانی' },
  },
];
