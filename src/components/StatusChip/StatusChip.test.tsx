import { render } from '@testing-library/react';

import { StatusChip } from './StatusChip';

const renderStatusChip = (isActive: boolean) => {
  const utils = render(<StatusChip isActive={isActive} />);

  return { ...utils };
};

describe('Status chip', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders', () => {
    const { unmount } = renderStatusChip(true);

    unmount();
  });
  it('has label for active status', () => {
    const { getByText } = renderStatusChip(true);
    const homeText = getByText('Active');

    expect(homeText).toBeInTheDocument();
  });
  it('has label for inactive status', () => {
    const { getByText } = renderStatusChip(false);
    const homeText = getByText('Inactive');

    expect(homeText).toBeInTheDocument();
  });
});
