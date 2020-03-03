import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { EntityToDtoMapperService } from '../../shared/services/entity-to-dto-mapper.service';
import { FollowDto } from '../dto/follow.dto';
import { UserFollowDto } from '../dto/user-follow.dto';
import { FollowDeleteGuard } from '../guards/follow-delete.guard';
import { FollowEditGuard } from '../guards/follow-edit.guard';
import { FollowService } from '../services/follow.service';

@ApiBearerAuth()
@ApiUseTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService, private mapper: EntityToDtoMapperService) {}

  @Get('/user-follow/:id')
  async getUserFollow(@Param('id') userId): Promise<UserFollowDto> {
    const userFollow = await this.followService.getUserFollow(userId);

    return this.mapper.map(UserFollowDto, userFollow);
  }

  @Post()
  @UseGuards(FollowEditGuard)
  async addFollow(@Body() data: FollowDto): Promise<UserFollowDto> {
    const newFollow = await this.followService.addFollow(data);
    return this.mapper.map(UserFollowDto, newFollow);
  }

  @Delete('/:id')
  @UseGuards(FollowDeleteGuard)
  async deleteFollow(@Param('id') id): Promise<UserFollowDto> {
    const result = await this.followService.deleteFollow(id);

    return this.mapper.map(UserFollowDto, result);
  }
}
