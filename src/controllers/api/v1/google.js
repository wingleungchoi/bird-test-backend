// import * as R from 'ramda';
import { google } from 'googleapis';

import response from 'src/libs/response';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  'http://localhost:8080/api/v1/google/redirectUrl',
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  // list of google drive scopes ref: https://developers.google.com/identity/protocols/googlescopes#drivev3
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

const redirectUrl = async (ctx) => {
  const { code, } = ctx.query;
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  try {
    const { tokens, } = await oauth2Client.getToken(code);
    response.ok(ctx, { tokens, });
  } catch (error) {
    response.error(ctx, error);
  }
  // oauth2Client.setCredentials(tokens);
};


export {
  generateAuthUrl,
  redirectUrl
};

export default {
  generateAuthUrl,
  redirectUrl,
};
