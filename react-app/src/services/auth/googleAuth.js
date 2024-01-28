import axios from 'axios';

const GoogleAuth = {
    // Function to handle the redirection to Google's OAuth 2.0 server
    redirectToGoogle: () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = `${window.location.origin}/auth`;
        const scope = 'email';
        const responseType = 'code';

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        // Redirect to Google's OAuth 2.0 server
        window.location.href = url;
    },

    // Function to handle the code exchange for tokens
    handleAuth: async (code) => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
        const redirectUri = `${window.location.origin}/auth`;

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            });

            console.log('Response:', response);

            // You now have the tokens, you can save them in your state, context, or however you manage your data.
            if (response && response.data) {
                return response.data;
            } else {
                console.log('Response or response.data is undefined');
                return null;
            }
        } catch (error) {
            console.log('Error:', error);
            if (error.response) {
                console.log('Error Response:', error.response);
            }
        }
    }
};

export default GoogleAuth;