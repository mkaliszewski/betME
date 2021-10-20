import { useEffect } from 'react';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { LoadingWrapper } from '../../components/LoadingWrapper';
import { RacesTable } from '../../components/RacesTable';
import { useFetch } from '../../hooks';
import { Race, Status } from '../../types';
import { useStore, Actions } from '../../store';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  padding: `${theme.spacing(4)} 0`
}));

export const RacesView = () => {
  const { data, isLoading, isError } = useFetch({
    url: 'https://my-json-server.typicode.com/hdjfye/bet-api/races'
  });
  const [{ status, filtredRaces }, dispatch] = useStore();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch({ type: Actions.SET_RACES, payload: data as Race[] });
      if (!filtredRaces.length) {
        dispatch({ type: Actions.SET_FILTRED_RACES, payload: data as Race[] });
      }
    }
  }, [data, dispatch, filtredRaces.length, isError, isLoading]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    dispatch({
      type: Actions.SET_STATUS,
      payload: event.target.value as Status
    });
  };

  return (
    <LoadingWrapper isLoading={isLoading}>
      <StyledContainer maxWidth="md">
        <FormControl fullWidth>
          <InputLabel id="status">Race status</InputLabel>
          <Select
            labelId="status"
            id="status"
            value={status}
            label="Race status"
            onChange={handleStatusChange}
          >
            <MenuItem value={Status.Active}>{Status.Active}</MenuItem>
            <MenuItem value={Status.Inactive}>{Status.Inactive}</MenuItem>
            <MenuItem value={Status.Any}>{Status.Any}</MenuItem>
          </Select>
        </FormControl>
        <RacesTable races={filtredRaces} />
      </StyledContainer>
    </LoadingWrapper>
  );
};
