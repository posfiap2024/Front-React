import { Injectable } from '@nestjs/common';
import { IPost } from '../entities/post.interface';
import { Like, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repository: Repository<Post>) {}

  create(post: IPost) {
    return this.repository.save(post);
  }

  search(query: string, limit: number, page: number) {
    return this.repository.find({
      where: [
        { title: Like(`%${query}%`), status: 'published' },
        { content: Like(`%${query}%`), status: 'published' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findAllPublished(limit: number, page: number) {
    return this.repository.find({
      where: { status: 'published' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findAll(limit: number, page: number) {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: string, post: IPost) {
    return this.repository.update(id, post);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
