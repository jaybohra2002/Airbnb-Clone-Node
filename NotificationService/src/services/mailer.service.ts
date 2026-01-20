import logger from "../config/logger.config";
import transporter from "../config/mailer.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(to:string,subject:string,templateId:string,body:string,params?:Record<string, any>){
    try {
        transporter.sendMail({
            from:`"Airbnb" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html:body 
        });
        logger.info(`Email sent to ${to} with subject: ${subject}`);
    } catch (error) {
        throw new InternalServerError('Error sending email');
    }
}