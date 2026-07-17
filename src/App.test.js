import { render, screen } from '@testing-library/react';
import Figure from './components/Figure';

/* Real smoke test (replaces the CRA default that asserted a "learn react"
   link and had failed since the template was replaced). Figure is pure —
   no router, no context, no matchMedia — so this runs green anywhere. */
test('renders a blueprint figure with number and caption', () => {
  render(
    <Figure
      num="T-00"
      src="/docs/svg/plates/P0_system_at_a_glance.svg"
      caption="System at a glance"
    />
  );
  expect(screen.getByText(/System at a glance/)).toBeInTheDocument();
  expect(screen.getByText(/Fig\. T-00/)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', '/docs/svg/plates/P0_system_at_a_glance.svg');
});
