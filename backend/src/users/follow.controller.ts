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

  @Get('/follow-all/:id')
  async getAllForMe(@Res() res, @Param('id') userId) {
    const following = await this.followService.getAll(userId);
    return res.status(HttpStatus.OK).json(following);
  }

  @Get('/following/:id')
  async getMyFollowing(@Res() res, @Param('id') userId) {
    const users = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(userId);
    const following = await this.followService.getMyFollowing(currentUser, users);
    return res.status(HttpStatus.OK).json(following);
  }

  @Get('/remove-following/:id')
  async getMyRemovedFollowing(@Res() res, @Param('id') userId) {
    const removedFollowing = await this.followService.getMyRemovedFollowing(userId);
    return res.status(HttpStatus.OK).json(removedFollowing);
  }

  @Get('/add-following/:id')
  async getMyAddedFollowing(@Res() res, @Param('id') userId) {
    const addFollowing = await this.followService.getMyAddedFollowing(userId);
    return res.status(HttpStatus.OK).json(addFollowing);
  }

  @Post()
  async addFollow(@Res() res, @Body() data: FollowerModel) {
    const newFollow = await this.followService.addFollow(data);
    return res.status(HttpStatus.OK).json(newFollow);
  }

  @Delete('/:id')
  async deleteFollow(@Res() res, @Param('id') id) {
    const result = await this.followService.deleteFollow(id);

    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/follower/:id')
  async getMyFollowers(@Res() res, @Param('id') userId) {
    const users = await this.userService.getUsers();
    const currentUser = await this.userService.getUserById(userId);
    const followers = await this.followService.getMyFollowers(currentUser, users);
    return res.status(HttpStatus.OK).json(followers);
  }
}
