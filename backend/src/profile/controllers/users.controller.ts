import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserEntityToDtoMapper } from '../mappers/user-entity-to-dto.mapper';
import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private entityToDtoMapper: UserEntityToDtoMapper) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return this.entityToDtoMapper.mapArray(users);
  }

  @Get(':id')
  async getUserById(@Param('id') id): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return this.entityToDtoMapper.map(user);
  }

  @Get('/login/:login')
  async getUserByLogin(@Param('login') login): Promise<UserDto> {
    const user = await this.userService.getUserByLogin(login);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return this.entityToDtoMapper.map(user);
  }

  @Post('/login/:login')
  async editUserByLogin(@Param('login') login, @Body() data: UserDto): Promise<UserDto> {
    const editedUser = await this.userService.updateUserByLogin(login, data);

    if (!editedUser) {
      throw new NotFoundException('User does not exist!');
    }

    return this.entityToDtoMapper.map(editedUser);
  }

  @Post('/patronymic/:login')
  async editUserPatronymic(@Param('login') login, @Body() data): Promise<UserDto> {
    const editedUser = await this.userService.getUserByLogin(login);

    if (!editedUser) {
      throw new NotFoundException('User does not exist!');
    }

    editedUser.patronymic = data.patronymic;
    await editedUser.save();

    return this.entityToDtoMapper.map(editedUser);
  }
}
