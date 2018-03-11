import * as express from 'express'
const router = express.Router()
import fetch from 'node-fetch'
import btoa from 'btoa'
import { catchAsyncErrors } from '../utils'

const redirect = encodeURIComponent('https://young-brook-14583.herokuapp.com/api/discord/callback');

router.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsyncErrors(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`,
            },
        });
    const json = await response.json();
    res.cookie('access_token', `${json.access_token}`, {
        domain: 'young-brook-14583.herokuapp.com', 
        path: '/',
        secure: true
    })
}));

module.exports = router;