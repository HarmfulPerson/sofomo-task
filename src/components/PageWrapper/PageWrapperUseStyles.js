import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  PageWrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#EEEEEE',
    display: 'flex',
  },
  PageWrapperButtonSearch: {
    width: '20%',
    padding: '5px',
    height: 'calc(100% - 10px)',
  },
  mapsAndSearchFormWrapper: {
    height: 'calc(100vh - 20px)',
    width: '100%',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  PageWrapperInputSearch: {
    width: '60%',
    padding: '5px',
    borderBottom: 'none !important',
    '& > div': {
      '&::before': {
        borderBottom: 'none !important',
      },
      '&::after': {
        borderBottom: 'none !important',
      },
      '& > input': {
        padding: '10px 12px',
      },
    },
  },
  formWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapAndInfoCardWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
  },
}));

export { useStyles };
