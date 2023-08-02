import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';
import { configPostgres } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(configPostgres as DataSourceOptions),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
