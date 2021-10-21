import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { LoadingWrapper } from '../../components/LoadingWrapper';
import { RacesTable } from '../../components/RacesTable';
import { Status } from '../../types';
import { fetchRaces, setStatus } from '../../store';
import type { State } from '../../store';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  padding: `${theme.spacing(4)} 0`
}));

export const RacesView = () => {
  const dispatch = useDispatch();
  const { status, filtredRaces, isLoading, isError } = useSelector(
    (state: State) => ({
      status: state.status,
      filtredRaces: state.filtredRaces,
      isLoading: state.isLoading,
      isError: state.isError
    })
  );

  useEffect(() => {
    dispatch(fetchRaces());
  }, [dispatch]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    dispatch(setStatus(event.target.value as Status));
  };

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError}>
      <StyledContainer maxWidth="lg">
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
