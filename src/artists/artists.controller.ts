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
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }

    const artist = this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }

    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }

    const artist = this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artistsService.delete(id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Artist deleted successfully',
    };
  }
}
