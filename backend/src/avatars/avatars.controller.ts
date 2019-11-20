import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { ConfluenceAvatarService } from './confluence-avatars.service';

@Controller('avatar')
export class AvatarsController {
  constructor(private avatarService: ConfluenceAvatarService) {}

  @Get()
  @Header('Content-disposition', 'inline')
  public async getAvatarForUser(@Query('login') login: string, @Res() res) {
    const avatarResponse = await this.avatarService.getAvatarByLogin(login);
    res.set('Content-Type', avatarResponse.headers['content-type']);
    res.send(avatarResponse.data);
    res.end();
  }
}
