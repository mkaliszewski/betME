import Chip from '@mui/material/Chip';

interface StatusChipProps {
  isActive: boolean;
}

export const StatusChip = ({ isActive }: StatusChipProps) =>
  isActive ? (
    <Chip label="Active" color="success" />
  ) : (
    <Chip label="Inactive" color="error" />
  );
