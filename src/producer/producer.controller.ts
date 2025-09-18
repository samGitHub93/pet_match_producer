import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('requests')
export class ProducerController {

    constructor(private readonly producerService: ProducerService) {}

    @Post('start')
    async startRequest(@Body() request: any) {
        await this.producerService.publishRequest(request);
        // immediate response
        return { message: 'Sended' };
    }
}
