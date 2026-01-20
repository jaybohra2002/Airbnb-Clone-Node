import { Job, Worker } from "bullmq";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { getRedisClient } from "../config/redis.config";

export const setupMailerProcessor=async ()=>{
        const emailProcessor=new Worker<NotificationDTO>(
        MAILER_QUEUE,
        //this function will procsess the job
        async (job:Job)=>{
            // if job name is not of the expected type, we throw error.
            if (job.name !== MAILER_PAYLOAD) {
                throw new Error (`Unknown job name: ${job.name}`);
            }
            console.log(`Processing email job: ${job.id} with data: ${JSON.stringify(job.data)}`);
            // we will send the part to service layer as all business logic will be there. below
        },
        {connection:getRedisClient()}
    );
    emailProcessor.on('completed',(job:Job)=>{
        console.log(`Email job completed: ${job.id}`);
    });

    emailProcessor.on('failed',(job:Job<NotificationDTO>|undefined,err:Error,prev:string)=>{
        console.error(`Email job failed: ${job?.id}, error: ${err.message}`);
    });
}