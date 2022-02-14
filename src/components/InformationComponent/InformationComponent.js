import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { useStyles } from './InformationComponentUseStyles';

const InformationComponent = (props) => {
  const classes = useStyles();
  const { searchedItemInformations } = props;
  return (
    <Card className={classes.InfoCard}>
      <div className={classes.InfoCardHeader}>
        <p>Information board</p>
      </div>
      {!!Object.keys(searchedItemInformations).length && (
        <div className={classes.InfoCardBody}>
          {searchedItemInformations.ip && (
            <p>IP: {searchedItemInformations.ip}</p>
          )}
          {searchedItemInformations.city && (
            <p>City: {searchedItemInformations.city}</p>
          )}
          {searchedItemInformations.country_name && (
            <p>Country: {searchedItemInformations.country_name}</p>
          )}
          {searchedItemInformations.continent_name && (
            <p>Continent: {searchedItemInformations.continent_name}</p>
          )}
          {searchedItemInformations.region_name && (
            <p>Region: {searchedItemInformations.region_name}</p>
          )}
          {searchedItemInformations.zip && (
            <p>ZIP: {searchedItemInformations.zip}</p>
          )}
          {searchedItemInformations.longitude &&
            searchedItemInformations.latitude && (
              <p>
                Location: lon - {searchedItemInformations.longitude.toFixed(3)},
                lat - {searchedItemInformations.latitude.toFixed(3)}
              </p>
            )}
        </div>
      )}
    </Card>
  );
};

InformationComponent.propTypes = {
  searchedItemInformations: PropTypes.object,
};

export default InformationComponent;
