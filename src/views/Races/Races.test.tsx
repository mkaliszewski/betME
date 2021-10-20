import { render } from '@testing-library/react';
import { Races } from './Races';

const renderHome = () => {
  const utils = render(<Races />);

  return { ...utils };
};

describe('Races page', () => {
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
