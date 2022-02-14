import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  InfoCard: {
    width: '50%',
    height: '100%',
    margin: '0px 5px',
  },
  InfoCardHeader: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > p': {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  },
  InfoCardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    '& > p': {
      textAlign: 'start',
    },
  },
}));

export { useStyles };
