import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FollowService } from './services/follow.service';
import { FollowerModel } from './models/follow.model';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './services/users.service';

@ApiBearerAuth()
@ApiUseTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService, private userService: UsersService) {
  }

  // @Get()
  // async getFollowers(@Res() res) {
  //   const users = await this.userService.getUsers();
  //   const followers = await this.followService.getFollowers(users);
  //   return res.status(HttpStatus.OK).json(followers);
  // }

  @Get('/following/:id')
  async getMyFollowing(@Res() res, @Param('id') userId) {
    const users = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(userId);
    const following = await this.followService.getMyFollowing(currentUser, users);
    return res.status(HttpStatus.OK).json(following);
  }

  @Get('/follower/:id')
  async getMyFollowers(@Res() res, @Param('id') userId) {
    const users = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(userId);
    const followers = await this.followService.getMyFollowers(currentUser, users);
    return res.status(HttpStatus.OK).json(followers);
  }

  @Post()
  async addFollow(@Res() res, @Body() data: FollowerModel) {
    const newFollow = await this.followService.addFollow(data);
    return res.status(HttpStatus.OK).json(newFollow);
  }

  // @Delete('/:id')
  // async delete(@Res() res, @Param('id') id) {
  //   const result = await this.followService.removeFollow(id);
  //
  //   return res.status(HttpStatus.OK).json(result);
  // }
}
