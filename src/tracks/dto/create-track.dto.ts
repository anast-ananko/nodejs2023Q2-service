import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string;

  albumId: string;

  @IsNotEmpty()
  duration: number;
}
