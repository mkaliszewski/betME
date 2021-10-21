import { Header } from './Header';

import { renderWithRouter } from '../../../utils';
import { fireEvent } from '@testing-library/dom';

const routes = {
  initial: '/test',
  target: '/'
};

const appName = 'betME';

const renderHeader = () => {
  const utils = renderWithRouter(<Header />, { route: routes.initial });

  return { ...utils };
};

describe('Header', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders', () => {
    const { unmount } = renderHeader();

    unmount();
  });
  it('has app name', () => {
    const { getByText } = renderHeader();
    const headerText = getByText(appName);

    expect(headerText).toBeInTheDocument();
  });
  it('redirects to homepage after click on app name', () => {
    const { getByText, history } = renderHeader();
    const headerText = getByText(appName);

    expect(history.location.pathname).toBe(routes.initial);

    fireEvent.click(headerText);

    expect(history.location.pathname).toBe(routes.target);
  });
});
