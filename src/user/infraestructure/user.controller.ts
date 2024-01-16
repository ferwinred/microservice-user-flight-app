import { BadRequestException, Controller, NotFoundException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from '../application/user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMSG } from './enum';
import { ExceptionFilter } from '../../common/infraestructure/infraestructure/filters/exception.filter';

@UseFilters(new ExceptionFilter())
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @MessagePattern(UserMSG.CREATE)
  async create(@Payload() userDto: UserDto) {
    return await this.userService.create(userDto);
  }
  
  @MessagePattern(UserMSG.FIND_ALL)
  async findAll() {
    return await this.userService.findAll();
  }
  
  
  @MessagePattern(UserMSG.FIND_ONE)
  async findOne(@Payload() id: string) {

    if (!id) throw new RpcException({
                        status: 400,
                        message: 'Id is required' });

    const user = await this.userService.findOne(id);

    return user;
  }

  @MessagePattern(UserMSG.UPDATE)
  async update(@Payload() updateUserDto: UpdateUserDto) {
    
    if (!updateUserDto.id) throw new RpcException({
      status: 400,
      message: 'Id is required' });

    return await this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(UserMSG.DELETE)
  async remove(@Payload() id: string) {
    
    if (!id) throw new RpcException({
      status: 400,
      message: 'Id is required' });

    return await this.userService.remove(id);
  }
}
