import { renderWithRouter } from '../../utils';
import { RacesTable } from './RacesTable';
import mockData from '../../_mocks/races.json';
import { fireEvent } from '@testing-library/dom';

const renderRacesTable = () => {
  const utils = renderWithRouter(<RacesTable races={mockData} />, {
    route: '/races'
  });
  return { ...utils };
};

describe('Races table', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    const { unmount } = renderRacesTable();

    unmount();
  });

  it('renders table', () => {
    const { getByText } = renderRacesTable();
    const name = getByText('Race name');
    const participants = getByText('Numer of participants');
    const status = getByText('Status');

    expect(name).toBeInTheDocument();
    expect(participants).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  describe('Renders mocked races', () => {
    mockData.forEach(data => {
      it(`renders ${data.name}`, () => {
        const { getByText } = renderRacesTable();
        const name = getByText(data.name);

        expect(name).toBeInTheDocument();
      });
    });
  });

  it('navigates to race page after click on table item', () => {
    const { history, getByText } = renderRacesTable();
    const name = getByText(mockData[0].name);

    expect(history.location.pathname).toBe('/races');
    fireEvent.click(name);

    expect(history.location.pathname).toBe(`/race/${mockData[0].id}`);
  });
});
