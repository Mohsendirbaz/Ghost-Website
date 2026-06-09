/**
 * src/services/downloadService.js
 * Client-side zip assembly + branded PDF invoice generation.
 * Uses dynamic imports for jszip, file-saver, and jspdf to keep initial bundle small.
 */
import { copy } from '../data/copy';

// ─── PDF Invoice generator ────────────────────────────────────────────────────

async function generatePdfInvoice(items, failedFiles, lang) {
    const { default: jsPDF } = await import('jspdf');

    const sessionId = Date.now().toString(16).slice(-8).toUpperCase();
    const now       = new Date();
    const dateStr   = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr   = now.toLocaleTimeString('en-US', { hour12: false });

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const PAGE_W   = doc.internal.pageSize.getWidth();
    const PAGE_H   = doc.internal.pageSize.getHeight();
    const ML       = 20;
    const MR       = 20;
    const CONTENT_W = PAGE_W - ML - MR;

    const C_DARK   = [15,  23,  42];   // #0F172A
    const C_BLUE   = [37,  99,  235];  // #2563EB
    const C_TEXT   = [55,  65,  81];   // #374151
    const C_LIGHT  = [243, 244, 246];  // #F3F4F6
    const C_WHITE  = [255, 255, 255];
    const C_SLATE  = [148, 163, 184];  // slate-400

    // ── Header band ────────────────────────────────────────────────────────────
    doc.setFillColor(...C_DARK);
    doc.rect(0, 0, PAGE_W, 42, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...C_WHITE);
    doc.text('GHOST AUTONOMY', ML, 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_SLATE);
    doc.text('Physics-Enforced Computing Architecture', ML, 25);
    doc.text('ghostautonomy.com', ML, 32);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...C_WHITE);
    doc.text('DOWNLOAD INVOICE', PAGE_W - MR, 17, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C_SLATE);
    doc.text(`Session: ${sessionId}`, PAGE_W - MR, 25, { align: 'right' });
    doc.text(`${dateStr}  ${timeStr}`, PAGE_W - MR, 32, { align: 'right' });

    // ── Metadata block ─────────────────────────────────────────────────────────
    let y = 54;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C_TEXT);

    const meta = [
        ['Total Files',  String(items.length)],
        ['Successful',   String(items.length - failedFiles.length)],
        ...(failedFiles.length > 0 ? [['Failed', String(failedFiles.length)]] : []),
    ];
    for (const [label, val] of meta) {
        doc.setFont('helvetica', 'bold');
        doc.text(label + ':', ML, y);
        doc.setFont('helvetica', 'normal');
        doc.text(val, ML + 34, y);
        y += 6;
    }
    y += 4;

    // ── Section heading ────────────────────────────────────────────────────────
    doc.setFillColor(...C_BLUE);
    doc.rect(ML, y, CONTENT_W, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C_WHITE);
    doc.text('FILE MANIFEST', ML + 2, y + 5);
    y += 12;

    // ── Table columns ──────────────────────────────────────────────────────────
    const COL = {
        num:  { x: ML,          w: 8  },
        name: { x: ML + 8,      w: 88 },
        cat:  { x: ML + 96,     w: 38 },
        type: { x: ML + 134,    w: 16 },
        size: { x: ML + 150,    w: 20 },
    };

    // Table header row
    doc.setFillColor(...C_LIGHT);
    doc.rect(ML, y - 4.5, CONTENT_W, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C_TEXT);
    doc.text('#',         COL.num.x + 1,  y);
    doc.text('Filename',  COL.name.x + 1, y);
    doc.text('Category',  COL.cat.x,      y);
    doc.text('Type',      COL.type.x,     y);
    doc.text('Size',      COL.size.x,     y);
    y += 7;

    // ── Table rows ─────────────────────────────────────────────────────────────
    const ROW_H  = 6.5;
    const MAX_Y  = PAGE_H - 22;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);

    items.forEach((item, i) => {
        if (y + ROW_H > MAX_Y) {
            doc.addPage();
            y = 20;
        }

        const failed = failedFiles.some((f) => f.item.id === item.id);

        // Row background
        if (failed) {
            doc.setFillColor(254, 226, 226);
            doc.rect(ML, y - 4, CONTENT_W, ROW_H, 'F');
        } else if (i % 2 === 0) {
            doc.setFillColor(249, 250, 251);
            doc.rect(ML, y - 4, CONTENT_W, ROW_H, 'F');
        }

        doc.setTextColor(failed ? 185 : C_TEXT[0], failed ? 28 : C_TEXT[1], failed ? 28 : C_TEXT[2]);

        const displayTitle = lang === 'fa'
            ? (item.title?.fa || item.filename)
            : (item.title?.en || item.filename);

        const truncated = doc.splitTextToSize(String(displayTitle), COL.name.w)[0];
        const catLabel  = String(item.category || '—');
        const typeLabel = (item.type || '').toUpperCase();
        const sizeLabel = item.sizeBytes
            ? `${(item.sizeBytes / 1024).toFixed(0)} KB`
            : '—';

        doc.text(String(i + 1),  COL.num.x + 1,  y);
        doc.text(truncated,      COL.name.x + 1, y);
        doc.text(catLabel,       COL.cat.x,      y);
        doc.text(typeLabel,      COL.type.x,     y);
        doc.text(sizeLabel,      COL.size.x,     y);

        y += ROW_H;
    });

    // ── Footer band ────────────────────────────────────────────────────────────
    const footY = PAGE_H - 14;
    doc.setFillColor(...C_DARK);
    doc.rect(0, footY, PAGE_W, 14, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C_SLATE);
    doc.text('Ghost Autonomy © 2026 · ghostautonomy.com', ML, footY + 9);
    doc.text(`Invoice ${sessionId}`, PAGE_W - MR, footY + 9, { align: 'right' });

    return doc.output('blob');
}

// ─── Main export ──────────────────────────────────────────────────────────────

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

    const zip         = new JSZip();
    const filesFolder = zip.folder('files');
    const failedFiles = [];

    // Parallel fetch with 30s timeout per file
    const fetchPromises = items.map(async (item) => {
        try {
            const controller = new AbortController();
            const timeoutId  = setTimeout(() => controller.abort(), 30_000);

            const url = item.path.startsWith('/') ? item.path : `/${item.path}`;

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

    // Generate branded PDF invoice
    const invoiceBlob = await generatePdfInvoice(items, failedFiles, lang);
    zip.file('invoice.pdf', invoiceBlob);

    // Generate zip blob
    let zipBlob;
    try {
        zipBlob = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 },
        });
    } catch (err) {
        const memMsg = lang === 'fa'
            ? 'حجم فایل‌ها بیش از حد است. تعداد کمتری فایل انتخاب کنید.'
            : 'Files exceed available memory. Please reduce the batch size.';
        throw new Error(memMsg);
    }

    const datestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    saveAs(zipBlob, `ghost-autonomy-files-${datestamp}.zip`);

    return { success: true, failedCount: failedFiles.length };
}
