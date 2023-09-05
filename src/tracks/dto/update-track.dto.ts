import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string;

  albumId: string;

  @IsNotEmpty()
  duration: number;
}
