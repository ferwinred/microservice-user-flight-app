import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './infraestructure/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User])
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
