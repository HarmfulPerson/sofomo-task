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
      `https://api.ipstack.com/${ip}`,
      {
        params: {
          access_key: 'edd63b3bf666122a74d874ff048f788c',
        },
      },
      config
    );
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
