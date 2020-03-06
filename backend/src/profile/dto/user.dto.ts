import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import * as moment from 'moment';
import { DictionaryDto } from '../../dictionary/dto/dictionary.dto';
import { ProjectNewMetadataEntity } from '../../entity/entities/project-new-metadata.entity';
import { UserEntity } from '../../entity/entities/user.entity';
import { LastProjectDto } from './last-project.dto';
import { ProjectNewDto } from './project-new.dto';

export class UserDto {
  @Expose()
  @Transform((val, src) => src.id)
  @ApiModelProperty()
  _id: string;

  @Expose()
  @ApiModelProperty()
  username: string;

  @Expose()
  @ApiModelProperty()
  patronymic: string;

  @Expose()
  @ApiModelProperty()
  location: string;

  @Expose()
  @ApiModelProperty()
  position: string;

  @Expose()
  @ApiModelProperty()
  whenCreated: string;

  @Expose()
  @ApiModelProperty()
  email: string;

  @Expose()
  @ApiModelProperty()
  telNumber: string;

  @Expose()
  @ApiModelProperty()
  skype: string;

  @Expose()
  @ApiModelProperty()
  telegram: string;

  @Expose()
  @ApiModelProperty()
  physicalDeliveryOfficeName: string;

  @Expose()
  @ApiModelProperty()
  mailNickname: string;

  @Expose()
  @ApiModelProperty()
  isAdmin: boolean;

  @Expose()
  @ApiModelProperty()
  hasMailing: boolean;

  @Expose()
  @Type(() => DictionaryDto)
  @ApiModelProperty()
  subdivision: DictionaryDto;

  @Expose()
  @Type(() => DictionaryDto)
  @ApiModelProperty()
  jobPosition: DictionaryDto;

  @Expose()
  @Type(() => ProjectNewDto)
  @ApiModelProperty()
  projectsNew: ProjectNewDto[];

  @ApiModelProperty()
  authType: string;

  @ApiModelProperty()
  hashPassword: string;

  @Expose()
  @ApiModelProperty()
  accessKey: string;

  @Expose()
  @ApiModelProperty()
  terminationDate: string;

  @Expose()
  @Type(() => LastProjectDto)
  @Transform(lastProjectsMapper)
  @ApiModelProperty()
  lastProjects: LastProjectDto[];
}

/** Получение последних активных проектов */
function lastProjectsMapper(val: null, src: UserEntity): LastProjectDto[] {
  if (!src.projectsNew) {
    return [];
  }

  const projectsMetadata: ProjectNewMetadataEntity[] = src.projectsNew
    .reduce((acc, p) => [...acc, ...p.metadata], [])
    .sort((a, b) => {
      if (b.year - a.year !== 0) {
        return b.year - a.year;
      }

      return b.month - a.month;
    });

  const lastMetadata: ProjectNewMetadataEntity = projectsMetadata[0];
  const currentDate = moment();

  if (!lastMetadata) {
    return [];
  }

  return src.projectsNew
    .map(p => {
      const projectLastMetadata = p.metadata.find(m => m.year === lastMetadata.year && m.month === lastMetadata.month);

      /** Если нет проекта в последнем месяце, то проект не включаем */
      if (!projectLastMetadata) {
        return null;
      }

      const projectLastMetadataDate = moment(`${projectLastMetadata}-${projectLastMetadata.year}`, 'M-YYYY');

      /** Если последний месяц был больше 3х месяцев назад, то проект не включаем */
      if (currentDate.diff(projectLastMetadataDate, 'months') > 3) {
        return null;
      }

      return {
        project_id: p.project_id,
        project_name: p.project_name,
        year: projectLastMetadata.year,
        month: projectLastMetadata.month,
        percent: projectLastMetadata.percent
      };
    })
    .filter(p => !!p);
}