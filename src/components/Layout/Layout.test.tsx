import { renderWithRouter } from '../../utils';
import { Layout } from './Layout';

const childContent = 'This is child';

const renderLayout = () => {
  const utils = renderWithRouter(
    <Layout>
      <p>{childContent}</p>
    </Layout>,
    {
      route: '/'
    }
  );
  return { ...utils };
};

describe('Layout', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const { unmount } = renderLayout();

    unmount();
  });

  it('renders header', () => {
    const { getByText } = renderLayout();
    const header = getByText('betME');

    expect(header).toBeInTheDocument();
  });

  it('renders given child', () => {
    const { getByText } = renderLayout();
    const child = getByText(childContent);

    expect(child).toBeInTheDocument();
  });
});
