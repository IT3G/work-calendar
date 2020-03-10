import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SettingsDto {
  @Expose()
  @ApiModelProperty()
  FEATURE_AUTH_TYPE: 'PASSWORD' | 'LDAP';

  @Expose()
  @ApiModelProperty()
  FEATURE_AVATAR_SOURCE: 'NO' | 'CONFLUENCE';

  @Expose()
  @ApiModelProperty()
  FEATURE_FILE_STORAGE: 'NO' | 'YES';

  @Expose()
  @ApiModelProperty()
  MAIL_POSTFIX: string;

  @Expose()
  @ApiModelProperty()
  PRINT_COMPANY_NAME: string;

  @Expose()
  @ApiModelProperty()
  PRINT_HEAD_MANAGER_NAME: string;

  @Expose()
  @ApiModelProperty()
  PRINT_HEAD_MANAGER_POSITION: string;

  @Expose()
  @ApiModelProperty()
  FEATURE_WEB_PUSH: 'NO' | 'YES';

  @Expose()
  @ApiModelProperty()
  PUSH_PUBLIC_KEY: string;

  @Expose()
  @ApiModelProperty()
  LOGO_NAME: string;

  @Expose()
  @ApiModelProperty()
  TITLE: string;
}
