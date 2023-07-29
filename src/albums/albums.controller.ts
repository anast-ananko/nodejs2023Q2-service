import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumsService.delete(id);
  }
}
