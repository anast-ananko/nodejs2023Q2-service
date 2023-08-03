import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  HttpCode,
  UnprocessableEntityException,
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

  // @Post('track/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addTrack(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid trackId');
  //   }

  //   const track = this.favsService.addTrack(id);
  //   if (!track) {
  //     throw new UnprocessableEntityException('Track not found');
  //   }
  // }

  // @Delete('track/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteTrack(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid trackId');
  //   }

  //   const track = this.favsService.deleteTrack(id);
  //   if (!track) {
  //     throw new NotFoundException('Track not found');
  //   }
  // }

  // @Post('album/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addAlbum(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid albumId');
  //   }

  //   const album = this.favsService.addAlbum(id);

  //   if (!album) {
  //     throw new UnprocessableEntityException('Album not found');
  //   }
  // }

  // @Delete('album/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteAlbum(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid albumId');
  //   }

  //   const album = this.favsService.deleteAlbum(id);
  //   if (!album) {
  //     throw new NotFoundException('Album not found');
  //   }
  // }

  // @Post('artist/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addArtist(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid artistId');
  //   }

  //   const artist = this.favsService.addArtist(id);

  //   if (!artist) {
  //     throw new UnprocessableEntityException('Artist not found');
  //   }
  // }

  // @Delete('artist/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteArtist(@Param('id') id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Invalid artistId');
  //   }

  //   const artist = this.favsService.deleteArtist(id);
  //   if (!artist) {
  //     throw new NotFoundException('Artist not found');
  //   }
  // }
}
