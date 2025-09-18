import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProducerService implements OnModuleInit {
    // OnModuleInit() is called
  
    // Client Kafka inject with 'KAFKA_SERVICE' token
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    // This is an hook called by NestJs when the module is ready
    async onModuleInit() {
        // Broker connection
        await this.kafkaClient.connect();
    }

    async publishRequest(request: any) {
        /**
         *  emit() --> fire and forget method (async)
         *  send() --> waits for a response by consumer (sync)
         * 
         */
        this.kafkaClient.emit('request_started', request);
    }
}
