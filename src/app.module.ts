import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_DATABASE } from './common/infraestructure/infraestructure/database.config';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }), CONFIG_DATABASE(),
  UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
