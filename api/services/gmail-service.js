const EmailService = require('./email-service');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const gmailConfigDefault = {
    type: 'OAuth2',
    user: process.env.GOOGLE_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
};

class GmailService extends EmailService {
    constructor(config = gmailConfigDefault) {
        super(config);
        if (typeof GmailService.instance === 'object') {
            // console.log('singleton GmailService');
            return GmailService.instance;
        }
        // console.log('nueva instancia GmailService');

        this.email = config.user;
        this.transport = (async () => await this.getTransport())();
        GmailService.instance = this;
        return this;
    }

    async getTransport() {
        try {
            const accessToken = await this.getAccessToken();
            const transport = await this.mailServiceTransport.createTransport({
                service: 'gmail',
                auth: {
                    accessToken: accessToken,
                    ...this.config,
                },
            });
            return transport;
        } catch (error) {
            console.log(
                'No se puede conectar al servidor de correo %o',
                error.message
            );
        }
    }
    async getAccessToken() {
        const myOAuth2Client = new OAuth2(
            this.config.clientId,
            this.config.clientSecret,
            'https://developers.google.com/oauthplayground'
        );

        myOAuth2Client.setCredentials({
            refresh_token: this.config.refreshToken,
        });
        try {
            return await myOAuth2Client.getAccessToken();
        } catch (error) {
            console.log('Error de acceso %o', error.message);
            throw error;
        }
    }
}

module.exports = GmailService;
