import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { FollowerModel } from '../models/follow.model';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { FollowEditGuard } from '../guards/follow-edit.guard';
import { FollowDeleteGuard } from '../guards/follow-delete.guard';

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
  @UseGuards(FollowEditGuard)
  async addFollow(@Res() res, @Body() data: FollowerModel) {
    const newFollow = await this.followService.addFollow(data);
    return res.status(HttpStatus.OK).json(newFollow);
  }

  @Delete('/:id')
  @UseGuards(FollowDeleteGuard)
  async deleteFollow(@Res() res, @Param('id') id) {
    const result = await this.followService.deleteFollow(id);

    return res.status(HttpStatus.OK).json(result);
  }
}
