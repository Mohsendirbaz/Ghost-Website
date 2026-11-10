import { normalizeUrlPath } from './normalizeUrlPath';

describe('normalizeUrlPath', () => {
    it('encodes spaces in unescaped paths', () => {
        expect(normalizeUrlPath('/library/picapd/en/Hardware ISA.pdf'))
            .toBe('/library/picapd/en/Hardware%20ISA.pdf');
    });

    it('preserves already-encoded spaces without double encoding', () => {
        expect(normalizeUrlPath('/library/picapd/en/Hardware%20ISA.pdf'))
            .toBe('/library/picapd/en/Hardware%20ISA.pdf');
    });

    it('keeps literal percent sequences encoded', () => {
        expect(normalizeUrlPath('/library/example%2520name.pdf'))
            .toBe('/library/example%2520name.pdf');
    });
});
