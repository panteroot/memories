import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

export default makeStyles(() => ({
    

    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        marginLeft: '15px',
    },
    

    // [useMediaQuery(useTheme().breakpoints.up('sm'))]: {
    //     mainContainer: {
    //     //    display: 'flex',
    //        flexDirection: 'column-reverse'
    //     }
    // }
}));


// export const responsiveContainer =  styled('div')(({theme}) => ({
//     [theme.breakpoints.down('sm')]: {
//         mainContainer: {
//         //    display: 'flex',
//            flexDirection: 'column-reverse'
//         }
//     }})
// ) ; 
//     // const matches = useMediaQuery(
//     //     theme.breakpoints.up('sm'): {
//     //         flexDirection: 'column-reverse'
//     //     }
//     // );

//     // const matches = useMediaQuery(
//     //     json2mq({
//     //       minWidth: 600,
//     //     }),
//     //   );
  
//     // return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
  