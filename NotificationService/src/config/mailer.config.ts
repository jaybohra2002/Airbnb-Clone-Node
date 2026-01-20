import mailer from 'nodemailer';
import { serverConfig } from '.';

const transporter=mailer.createTransport({
    service:'Gmail',
    auth:{
        user:serverConfig.MAIL_USER,
        pass:serverConfig.MAIL_PASS
    }
});

export default transporter;