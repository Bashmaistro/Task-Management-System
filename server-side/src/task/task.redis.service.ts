import { Injectable } from '@nestjs/common';

import Redis, { Redis as RedisClient } from 'ioredis';


@Injectable()
export class TaskRedisService {


    private publisher: RedisClient;
    private subscriber: RedisClient;

    constructor() {
        this.publisher = new Redis(); 
        this.subscriber = this.publisher.duplicate(); 
    }


    async publish(channel:string , message: any){
        
        
        await this.publisher.publish(channel, JSON.stringify(message));
    }

    async subscribe(channel: string, callback: (message: any) => void) {
        
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (chan, msg) => {
          if (chan === channel) {
            callback(JSON.parse(msg));
          }
        });}



    setPublisher( pubClient : any)    {
        this.publisher = pubClient;
    }
    setSubscriber( subClient : any)    {
        this.subscribe = subClient;
    }

    getPublisher(): RedisClient{
        return this.publisher;

    } 
    
    getSubscriber() : RedisClient
    {
        return this.subscriber;
    }

}