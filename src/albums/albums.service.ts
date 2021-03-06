import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Album } from './album.entity';
import { FindAlbumDTO } from './dto/find-album.dto';
import { UpdateAlbumDTO } from './dto/update-album.dto';
import { InsertAlbumDTO } from './dto/insert-album-dto';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private albumsRepository: Repository<Album>) { }

  async create(insertAlbumDTO: InsertAlbumDTO): Promise<Album> {
    return await this.albumsRepository.save(insertAlbumDTO);
  }

  async find(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  async findOne(album: FindAlbumDTO): Promise<Album> {
    return await this.albumsRepository.findOne({ id: album.id });
  }

  async update(album: FindAlbumDTO, albumData: UpdateAlbumDTO): Promise<UpdateResult> {
    return await this.albumsRepository.update({ id: album.id }, albumData);
  }

  async delete(album: FindAlbumDTO): Promise<DeleteResult> {
    return await this.albumsRepository.delete(album);
  }
}
