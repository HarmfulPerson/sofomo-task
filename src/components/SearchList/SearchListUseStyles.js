import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  SearchListCard: {
    width: '200px',
    height: 'calc(100vh - 20px)',
    margin: '10px',
  },
  eachListItem: {
    fontSize: '12px',
  },
}));

export { useStyles };
