import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../infraestructure/dto/user.dto';
import { UpdateUserDto } from '../infraestructure/dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {

  constructor(
   @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async create(userDto: UserDto) {
    try {
      
      const user = this.userRepository.create(userDto);
  
      return await this.userRepository.save(user);

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
      
        const user = await this.userRepository.findOne({
          where: {
            id
          }
        });
  
        if (!user) throw new RpcException({ 
                                status: 404, 
                                message: `User with Id ${id} is not found`
                              });
  
        return user;
      
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload(updateUserDto)

    if (!user) throw new RpcException({ 
      status: 404, 
      message: `User with Id ${id} is not found`
    });

    return await this.userRepository.save(user);
  }

  async remove(id: string) {



    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!user) throw new RpcException({ 
                          status: 404, 
                          message: `User with Id ${id} is not found`
                        });
    
    return await this.userRepository.softDelete(id);
  }
}
