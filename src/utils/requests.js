import axios from 'axios';

export const apiGetRequest = async (ip) => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    return await axios.get(
      `http://api.ipstack.com/${ip}`,
      {
        params: {
          access_key: 'a35750cf30302e95b5af80198ced1d2e',
        },
      },
      config
    );
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
