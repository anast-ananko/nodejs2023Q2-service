import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }

    return this.tracksService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }

    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }

    return this.tracksService.delete(id);
  }
}
