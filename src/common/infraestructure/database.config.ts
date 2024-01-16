import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dialect } from './infraestructure/enum';
import { Entity } from 'typeorm';
import { User } from 'src/user/domain/entities/user.entity';

ConfigModule.forRoot({
	isGlobal: true,
})

export const CONFIG_DATABASE = () =>
	TypeOrmModule.forRoot({
		type: process.env.DIALECT as Dialect || 'postgres',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		entities: [User],
		synchronize: true,
	});