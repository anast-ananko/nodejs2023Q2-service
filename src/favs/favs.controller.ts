import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';

import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid trackId');
    }

    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId');
    }

    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }

    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId');
    }

    return this.favsService.deleteArtist(id);
  }
}
