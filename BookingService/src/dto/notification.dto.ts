export interface NotificationDTO {
    to: string;
    subject: string;
    templateId:string;
    //body: string;
    params:Record<string, any>;
}