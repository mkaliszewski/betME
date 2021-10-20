import { render } from '@testing-library/react';
import { RacesView } from './Races';

const renderHome = () => {
  const utils = render(<RacesView />);

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
