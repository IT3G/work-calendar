import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { PresenceRequestDto } from '../dto/presence-request.dto';

import { PresenceSerivce } from '../services/presence.service';

@ApiBearerAuth()
@ApiUseTags('Presence')
@Controller('presence')
export class PresenceController {
  constructor(private presenceService: PresenceSerivce) {}

  @Get()
  async getPresence(@Query('since') dateStart: string, @Query('till') dateEnd: string): Promise<PresenceRequestDto[]> {
    return await this.presenceService.getPresenceByDate(dateStart, dateEnd);
  }
}
