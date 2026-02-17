/**
 * src/services/downloadService.js
 * Client-side zip assembly + invoice generation.
 * Uses dynamic imports for jszip and file-saver to keep initial bundle small.
 */
import { copy } from '../data/copy';

// ─── Invoice generator ─────────────────────────────────────────────────────────

function generateInvoice(items, failedFiles, lang) {
  const t = copy[lang]?.cart || copy.en.cart;
  const now = new Date().toISOString();
  const separator60 = '='.repeat(60);
  const separator60dash = '-'.repeat(60);

  const lines = [
    t.invoiceTitle,
    separator60,
    `Date: ${now}`,
    `Total Files: ${items.length}`,
    `Successful: ${items.length - failedFiles.length}`,
    failedFiles.length > 0 ? `Failed: ${failedFiles.length}` : null,
    '',
    t.fileManifest,
    separator60dash,
    '',
  ];

  items.forEach((item, i) => {
    const failed = failedFiles.find((f) => f.item.id === item.id);
    const displayTitle = lang === 'fa'
      ? (item.title?.fa || item.filename)
      : (item.title?.en || item.filename);

    lines.push(`File #${i + 1}${failed ? ' [FAILED]' : ''}`);
    lines.push(`  ${t.fileName}: ${displayTitle}`);
    lines.push(`  ${t.fileType}: ${(item.type || 'other').toUpperCase()}`);
    lines.push(`  ${t.fileLocation}: files/${item.filename}`);
    if (item.category) lines.push(`  ${t.fileCategory}: ${item.category}`);
    if (item.keywords?.length) lines.push(`  ${t.fileKeywords}: ${item.keywords.join(', ')}`);
    if (item.sourceNode) {
      const src = [
        item.sourceNode.partSlug,
        item.sourceNode.chapterSlug,
        item.sourceNode.sectionSlug,
      ]
        .filter(Boolean)
        .join(' / ');
      lines.push(`  ${t.fileSource}: ${src}`);
    }
    if (failed) lines.push(`  Error: ${failed.error}`);
    lines.push('  ---');
    lines.push('');
  });

  lines.push(separator60);
  lines.push(t.generatedBy);
  lines.push('https://ghostautonomy.com');

  return lines.filter((l) => l !== null).join('\n');
}

// ─── Main export ───────────────────────────────────────────────────────────────

/**
 * Fetch all cart items in parallel, zip them, and trigger browser download.
 * Returns { success: boolean, failedCount: number }
 */
export async function generateAndDownloadZip(items, lang) {
  // Dynamic imports — loaded only when user clicks Download
  const [{ default: JSZip }, { saveAs }] = await Promise.all([
    import('jszip'),
    import('file-saver'),
  ]);

  const zip = new JSZip();
  const filesFolder = zip.folder('files');
  const failedFiles = [];

  // Parallel fetch with 30s timeout per file
  const fetchPromises = items.map(async (item) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30_000);

      const url = item.path.startsWith('/')
        ? item.path
        : `/${item.path}`;

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      filesFolder.file(item.filename, blob);
      return { success: true, item };
    } catch (err) {
      const message = err.name === 'AbortError' ? 'Timeout (30s)' : err.message;
      failedFiles.push({ item, error: message });
      return { success: false, item };
    }
  });

  await Promise.allSettled(fetchPromises);

  // Add invoice text
  const invoice = generateInvoice(items, failedFiles, lang);
  zip.file('invoice.txt', invoice);

  // Generate zip blob (streaming for large batches)
  let zipBlob;
  try {
    zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });
  } catch (err) {
    // Likely OOM — suggest smaller batch
    const memMsg = lang === 'fa'
      ? 'حجم فایل‌ها بیش از حد است. تعداد کمتری فایل انتخاب کنید.'
      : 'Files exceed available memory. Please reduce the batch size.';
    throw new Error(memMsg);
  }

  const datestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  saveAs(zipBlob, `ghost-autonomy-files-${datestamp}.zip`);

  return { success: true, failedCount: failedFiles.length };
}