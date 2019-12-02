// import { Body, Controller, Inject, Post } from '@nestjs/common';
// import { ICrudService } from './crud.service';
//
// export interface ICrudController<T> {
//   create(dto: T): Promise<any>;
//   findAll();
//   findOne(id: number);
// }
//
// export function CrudController(
//   service: ICrudService,
//   prefix: string,
// ): ICrudController<any> {
//
//   @Controller(prefix)
//   class CrudControllerHost {
//     @Inject(service) private readonly crudService;
//
//     @Post()
//     async create(@Body() createEntityDto) {
//       await this.crudService.create(createEntityDto);
//     }
//   }
//   return CrudControllerHost;
// }
