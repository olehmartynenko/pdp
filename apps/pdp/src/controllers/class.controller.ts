import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClassDto } from '../dto/class';

@Controller()
export class ClassController {
  constructor(
    @Inject('BASE_ENTITIES_SERVICE')
    private readonly baseEntitiesService: ClientProxy,
  ) {}

  @Get('/classes')
  async getClasses() {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-classes',
      },
      {},
    );
  }

  @Get('/class/:id')
  async getClass(@Param('id') id: number) {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-class',
      },
      { id },
    );
  }

  @Post('/class')
  async addClass(@Body() body: CreateClassDto) {
    return this.baseEntitiesService.send(
      {
        cmd: 'add-class',
      },
      body,
    );
  }
}
