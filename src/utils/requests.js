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
          access_key: 'd7557820373f6cc17650656ee6fd2602',
        },
      },
      config
    );
  } catch (error) {
    return error.response;
  }
};
