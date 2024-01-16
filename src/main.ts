import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MailQueue } from './user/infraestructure/enum';
import { ExceptionFilter } from './common/infraestructure/infraestructure/filters/exception.filter';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options:{
      urls: [process.env.AMQP_URL],
      queue: MailQueue.UserQueue
    }
  });

  // app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}
bootstrap();
