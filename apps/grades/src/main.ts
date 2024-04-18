import { NestFactory } from '@nestjs/core';

import { BrokerService } from '@app/common/broker/broker.service';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const brokerService = app.get(BrokerService);

  const queue = 'grades_queue';

  app.connectMicroservice(brokerService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
