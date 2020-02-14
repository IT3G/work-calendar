import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FollowService } from './services/follow.service';
import { FollowerModel } from './models/follow.model';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Get('/user-follow/:id')
  async getUserFollow(@Res() res, @Param('id') userId) {
    const userFollow = await this.followService.getUserFollow(userId);
    return res.status(HttpStatus.OK).json(userFollow);
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
}
