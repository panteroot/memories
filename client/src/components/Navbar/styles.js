import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => ({
  appBar: { 
    // borderRadius: 15,
    // margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '10px 50px',
    [useTheme().breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  // toolbar: {
  //   height: '100%',
  //   width: '100% !important',
  // },
  // toolbar: useTheme().mixins.toolbar,
  heading: {
    color: useTheme().palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  // toolbar: {
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   width: '400px',
  //   [useTheme().breakpoints.down('sm')]: {
  //     width: 'auto',
  //   },
  // },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [useTheme().breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: useTheme().palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));