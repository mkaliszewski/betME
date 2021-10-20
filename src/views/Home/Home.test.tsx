import { render } from '@testing-library/react';
import { Home } from './Home';

const renderHome = () => {
  const utils = render(<Home />);

  return { ...utils };
};

describe('Home page', () => {
  it('renders', () => {
    const { unmount } = renderHome();

    unmount();
  });
  it('has text', () => {
    const { getByText } = renderHome();

    const homeText = getByText('This is homepage!');
    expect(homeText).toBeInTheDocument();
  });
});
