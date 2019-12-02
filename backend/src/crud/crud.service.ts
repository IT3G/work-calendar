// import { Body, Inject, Post } from '@nestjs/common';
// import { ICrudController } from './crud.controller';
//
// export interface ICrudService<T = any> {
//   create(dto: T): Promise<any>;
// }
//
// export function CrudService(
//   service: ICrudService,
// ): ICrudController<any> {
//
//   class CrudControllerHost {
//     @Inject(service) private readonly crudService;
//
//     @Post()
//     async create(@Body() createEntityDto) {
//       await this.crudService.create(createEntityDto);
//     }
//   }
// }
