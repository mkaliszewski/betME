import { renderWithRouter } from '../../utils';
import { LoadingWrapper, LoadingWrapperProps } from './LoadingWrapper';

const childContent = 'This is child';
const MockChild = (): JSX.Element => <p>{childContent}</p>;

const renderLoadingWrapper = ({
  isLoading,
  isError,
  children
}: LoadingWrapperProps) => {
  const utils = renderWithRouter(
    <LoadingWrapper isLoading={isLoading} isError={isError}>
      {children}
    </LoadingWrapper>,
    {
      route: '/'
    }
  );
  return { ...utils };
};

describe('Loading wrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const { unmount } = renderLoadingWrapper({
      isLoading: false,
      isError: false,
      children: <MockChild />
    });

    unmount();
  });

  it('renders spinner when is loading', () => {
    const { getByTestId } = renderLoadingWrapper({
      isLoading: true,
      isError: false,
      children: <MockChild />
    });
    const spinnerContainer = getByTestId('spinner-container');
    const spinnerChildren = spinnerContainer.childNodes;

    expect(spinnerChildren).toHaveLength(1);
  });

  it('renders error message when is error', () => {
    const { getByText } = renderLoadingWrapper({
      isLoading: false,
      isError: true,
      children: <MockChild />
    });
    const errorMsg = getByText(
      `Oooops... something went wrong. Try to refresh the page.`
    );

    expect(errorMsg).toBeInTheDocument();
  });

  it('renders children when there is no error and is not loading', () => {
    const { getByText } = renderLoadingWrapper({
      isLoading: false,
      isError: false,
      children: <MockChild />
    });
    const child = getByText(childContent);

    expect(child).toBeInTheDocument();
  });
});
