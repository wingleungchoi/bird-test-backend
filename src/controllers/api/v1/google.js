// import * as R from 'ramda';
import { google } from 'googleapis';

import response from 'src/libs/response';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URL,
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/drive'
];

const generateAuthUrl = (ctx) => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  response.ok(ctx, { url, });
};


export {
  generateAuthUrl
};

export default {
  generateAuthUrl,
};
