import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { StatusChip } from '../StatusChip';
import type { Race } from '../../types';

interface RacesTableProps {
  races: Race[];
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.action.hover
  },

  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const RacesTable = ({ races }: RacesTableProps) => {
  const history = useHistory();
  const handleRowClick = (id: number) => {
    history.push(`/race/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="Races table">
        <TableHead>
          <TableRow>
            <TableCell>Race name</TableCell>
            <TableCell align="center">Numer of participants</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map(({ id, name, participants, active }) => (
            <StyledTableRow key={id} onClick={() => handleRowClick(id)}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="center">{participants.length}</TableCell>
              <TableCell align="center">
                <StatusChip isActive={active} />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
