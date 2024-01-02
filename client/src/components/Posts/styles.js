import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles(() => ({
    mainContainer: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      smMargin: {
        margin: useTheme().spacing(1),
      },
      purple: {
        color: useTheme().palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      [useTheme().breakpoints.down('sm')]: {
        appBar: {
          padding: '10px 20px',
        },
        heading: {
          display: 'none',
        },
        userName: {
          display: 'none',
        },
        image: {
          marginLeft: '5px',
        },
        toolbar: {
          display: 'flex',
          justifyContent: 'flex-end',
          width: '160px',
        },
      },
    
      actionDiv: {
        textAlign: 'center',
      },
}));