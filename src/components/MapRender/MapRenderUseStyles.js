import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  MapRender: {
    '& > div': {
      '& :nth-child(3)': {
        display: 'none',
      },
    },
    width: '100%',
    height: '100%',
  },
  MapRenderWrapper: {
    height: 'calc(100% -20px)',
    width: '50%',
    padding: '10px',
    margin: '0px 5px',
  },
}));

export { useStyles };
