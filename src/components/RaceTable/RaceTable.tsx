import { ChangeEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

import { Race, Participant, Bets, Places } from '../../types';

interface RacesTableProps {
  race: Race;
  participants: Participant[];
  bets: Bets;
  handleChange: (event: ChangeEvent<HTMLInputElement>, place: Places) => void;
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

export const RaceTable = ({
  race,
  participants,
  bets,
  handleChange
}: RacesTableProps) => {
  const activeParticipants: Participant[] = [];
  race.participants.forEach(participant => {
    participants.forEach(racer => {
      if (racer.id === participant) {
        activeParticipants.push(racer);
      }
    });
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="Race table">
        <TableHead>
          <TableRow>
            <TableCell>Participant name</TableCell>
            <TableCell align="center">Winner</TableCell>
            <TableCell align="center">2nd place</TableCell>
            <TableCell align="center">3rd place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeParticipants.map(({ id, body }) => (
            <StyledTableRow key={id}>
              <TableCell component="th" scope="row">
                {body}
              </TableCell>
              <TableCell align="center">
                <Radio
                  checked={bets.first === id}
                  onChange={event => handleChange(event, Places.First)}
                  value={id}
                  disabled={!race.active}
                />
              </TableCell>
              <TableCell align="center">
                <Radio
                  checked={bets.second === id}
                  onChange={event => handleChange(event, Places.Second)}
                  value={id}
                  disabled={!race.active}
                />
              </TableCell>
              <TableCell align="center">
                <Radio
                  checked={bets.third === id}
                  onChange={event => handleChange(event, Places.Third)}
                  value={id}
                  disabled={!race.active}
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
