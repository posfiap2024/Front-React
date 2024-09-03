import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IUser } from '../entities/user.interface';
import { Repository } from 'typeorm';
import { IPasswordHelper } from 'src/shared/helpers/password.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IPasswordHelper') private passwordHelper: IPasswordHelper,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async create(user: IUser) {
    user.password = await this.passwordHelper.hash(user.password);
    return this.repository.save(user);
  }

  async findAll(limit: number, page: number) {
    const _users = await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'username', 'role'],
    });
    return _users.sort((a, b) => a.id - b.id);
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'username', 'role'],
    });
  }

  async update(id: number, user: Partial<IUser>) {
    if (user.password) {
      user.password = await this.passwordHelper.hash(user.password);
    }
    return this.repository.update(id, user);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
