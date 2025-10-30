// src/services/authService.js

// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      // Where we are storing the token for later use. (putting it in our back pocket)
      /*
        {
          "token": "<the actual token string>"
        }
      */
      localStorage.setItem('token', data.token);

      // we need to get the data from the token payload

      // 1. extract the middle of the token (payload)
      const middleOfJWT = data.token.split('.')[1];
      // 2. decode the middle of the JWT into actual info.
      const decodedMiddle = atob(middleOfJWT); // (stringified JSON object)
      // 3. parse the stringified object to to actual JSON
      const payload = JSON.parse(decodedMiddle).payload;

      return payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { signUp, signIn };
