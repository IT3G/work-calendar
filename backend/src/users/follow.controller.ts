import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FollowService } from './services/follow.service';
import { FollowerResponseModel } from '../../dist/follow/models/follow.request.model';
import { FollowerModel } from './models/follow.model';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {
  }

  @Get()
  async getFollowers(@Res() res) {
    const followers = await this.followService.getFollowers();
    return res.status(HttpStatus.OK).json(followers);
  }

  @Get('/following/:id')
  async getMyFollowing(@Res() res, @Param('id') userId) {
    const following = await this.followService.getMyFollowing(userId);
    return res.status(HttpStatus.OK).json(following);
  }

  @Get('/follower/:id')
  async getMyFollowers(@Res() res, @Param('id') userId) {
    const followers = await this.followService.getMyFollowers(userId);
    return res.status(HttpStatus.OK).json(followers);
  }

  @Post()
  async addFollow(@Res() res, @Body() data: FollowerModel) {
    const newFollow = await this.followService.addFollow(data);
    return res.status(HttpStatus.OK).json(newFollow);
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id) {
    const result = await this.followService.delete(id);

    return res.status(HttpStatus.OK).json(result);
  }
}
