import { render } from '@testing-library/react';
import { RaceView } from './Race';

const renderHome = () => {
  const utils = render(<RaceView />);

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
