import { makeStyles } from '@mui/styles';
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [useTheme().breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  paper: {
    padding: useTheme().spacing(2),
  },
}));