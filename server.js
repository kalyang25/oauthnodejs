const express = require('express');
const cors = require('cors');

const CLIENT_ID = "Ov23liKk2wBEKveN93Md";
const CLIENT_SEC = "5e47cf1490b18d04ad2974dcef280281a1ad474b";
const GITLOGIN_URL = "https://github.com/login/oauth/access_token";
const PORT = 8080;

// Initialize the application
const app = express();
app.use(cors({ credentials: true, origin: true }));

// Start the server
app.listen(PORT, () => {
    console.log('Server started on port 8080');
});

app.get('/oauth/redirect', (req,res) => {
    console.log('req: ', req.query.code);
    // fetch({
    //     method: "POST",
    //     url: `${GITLOGIN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SEC}&code=${req.query.code}`,
    //     headers: {
    //         Accept: "application/json",
    //     },
    // }).then((response) => {
    //     console.log('response after redirect: ', response);
    //     res.redirect(`http://localhost:3000?access_token=${response.data.access_token}`);
    // }).catch(error => console.error(error));
    fetch(`${GITLOGIN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SEC}&code=${req.query.code}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
        console.log('response after redirect: ', response);
        res.redirect(`http://localhost:3000?access_token=${response.data.access_token}`);
    }).catch(error => console.error(error));
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/home', (req, res) => {
    res.send('Welcome to Authe in Nodejs!');
});