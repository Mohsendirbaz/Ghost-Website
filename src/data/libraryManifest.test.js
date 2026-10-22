import { getFileTitle } from './libraryManifest';

describe('getFileTitle', () => {
    const file = {
        filename: 'document.pdf',
        title: {
            en: 'Document title',
            fa: 'عنوان سند',
        },
    };

    it('returns the title for the selected language', () => {
        expect(getFileTitle(file, 'en')).toBe('Document title');
        expect(getFileTitle(file, 'fa')).toBe('عنوان سند');
    });

    it('supports legacy string titles', () => {
        expect(getFileTitle({ ...file, title: 'Legacy title' }, 'fa')).toBe('Legacy title');
    });
});
