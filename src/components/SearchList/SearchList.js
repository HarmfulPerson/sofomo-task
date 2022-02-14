import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { useStyles } from './SearchListUseStyles';

const SearchList = (props) => {
  const classes = useStyles();
  const { listOfSearches } = props;
  return (
    <Card className={classes.SearchListCard}>
      {listOfSearches?.length ? (
        <>
          <p>Your recent searches</p>
          {listOfSearches.map((searchedItem, index) => (
            <p className={classes.eachListItem}>{`${index + 1}. ${
              searchedItem.ip
            } - ${searchedItem?.region_name}`}</p>
          ))}
        </>
      ) : (
        <p>There is no records searched</p>
      )}
    </Card>
  );
};

SearchList.propTypes = {
  listOfSearches: PropTypes.array,
};

export default SearchList;
