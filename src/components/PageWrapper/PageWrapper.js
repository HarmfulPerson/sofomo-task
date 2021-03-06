import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MapRender from '../MapRender/MapRender';
import { apiGetRequest } from '../../utils/requests';
import { useStyles } from './PageWrapperUseStyles';
import SearchList from '../SearchList/SearchList';
import InformationComponent from '../InformationComponent/InformationComponent';
import { mapNames } from '../../consts/main.js';

const PageWrapper = () => {
  const classes = useStyles();
  const [geolocationUserData, setGeolocationUserData] = React.useState(null);
  const [inputIp, setInputIp] = React.useState('');
  const [searchedItem, setSearchedItem] = React.useState({});
  const [historicSearches, setHistoricSearches] = React.useState([]);

  React.useEffect(() => {
    handleGetMyIp();
  }, []);

  const handleGetMyIp = async () => {
    const apiRequestResult = await apiGetRequest('check');
    if (apiRequestResult.status === 200) {
      setGeolocationUserData(apiRequestResult.data);
    } else {
      alert('Something went wrong');
    }
  };

  const handleApiRequest = async () => {
    const apiRequestResult = await apiGetRequest(inputIp);
    if (apiRequestResult.status === 200) {
      if (Object.keys(searchedItem).length)
        setHistoricSearches([searchedItem, ...historicSearches]);
      setSearchedItem(apiRequestResult.data);
    } else {
      alert('Something went wrong');
    }
  };

  const validateIpInput = (ip) => {
    const reg =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gm;

    return reg.test(ip);
  };

  const handleChangeInputIp = (e) => {
    const { value } = e.target;
    setInputIp(value);
  };

  return (
    <div className={classes.PageWrapper}>
      <SearchList listOfSearches={historicSearches} />
      {geolocationUserData && (
        <div className={classes.mapsAndSearchFormWrapper}>
          <div className={classes.mapAndInfoCardWrapper}>
            <MapRender
              nameOfMap={mapNames.homeMap}
              searchedItem={geolocationUserData}
            />
            <InformationComponent
              searchedItemInformations={geolocationUserData}
            />
          </div>
          <form className={classes.formWrapper}>
            <TextField
              id="filled-search"
              type="search"
              variant="filled"
              value={inputIp}
              onChange={handleChangeInputIp}
              className={classes.PageWrapperInputSearch}
            />
            <Button
              onClick={() => {
                handleApiRequest();
              }}
              color="primary"
              className={classes.PageWrapperButtonSearch}
              type="button"
              variant="outlined"
              disabled={!validateIpInput(inputIp)}
            >
              Search
            </Button>
          </form>
          <div className={classes.mapAndInfoCardWrapper}>
            <MapRender
              nameOfMap={mapNames.searchMap}
              searchedItem={searchedItem}
            />
            <InformationComponent searchedItemInformations={searchedItem} />
          </div>
        </div>
      )}
    </div>
  );
};
export default PageWrapper;
