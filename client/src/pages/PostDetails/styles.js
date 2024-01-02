import { makeStyles } from '@mui/styles';
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '600px',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [useTheme().breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [useTheme().breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [useTheme().breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));