import { In } from 'typeorm';
import {
  DtoAppCreate,
  DtoAppDelete,
  DtoAppDetail,
  DtoAppGetConfigs,
  DtoAppUpConfig,
  DtoAppUpdate,
} from '../types';
import { AppRepository } from '../repositories';

export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  public async getConfigs(dto: DtoAppGetConfigs) {
    const app = await this.getByCode(dto.code);
    if (!app) {
      throw new Error('Not exist!');
    }

    return app.configs;
  }

  public async upConfig(dto: DtoAppUpConfig) {
    const app = await this.getByCode(dto.code);
    if (!app) {
      throw new Error('Not exist!');
    }

    const { configs } = dto;

    await this.appRepository.update(
      {
        id: app.id,
      },
      {
        configs,
      }
    );

    return configs;
  }

  public async find() {
    return await this.appRepository.find({
      select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
    });
  }

  public async detail(dto: DtoAppDetail) {
    const isExist = await this.getById(dto.id);
    if (!isExist) {
      throw new Error('Not exist!');
    }

    return this.appRepository.findOne({
      where: {
        id: dto.id,
      },
      relations: {
        configs: true,
      },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        configs: false,
        apiKeys: false,
      },
    });
  }

  public async create(dto: DtoAppCreate) {
    const isExist = await this.getByCode(dto.code);
    if (isExist) {
      throw new Error('Existed!');
    }

    const { code, name } = dto;

    const saved = await this.appRepository.save({ code: this.safeCode(code), name });

    return saved;
  }

  public async update(dto: DtoAppUpdate) {
    const isExist = await this.getById(dto.id);
    if (!isExist) {
      throw new Error('Not exist!');
    }

    const { id, code, name } = dto;

    const saved = await this.appRepository.update(
      {
        id,
      },
      {
        code: this.safeCode(code),
        name,
      }
    );

    return !!saved.affected;
  }

  public async delete(dto: DtoAppDelete) {
    const deleted = await this.appRepository.softDelete({
      id: In(dto.ids),
    });

    return deleted.affected === dto.ids.length;
  }

  public getByCode(code: string) {
    return this.appRepository.findOneBy({
      code: code,
    });
  }

  public getById(id: string) {
    return this.appRepository.findOneBy({ id });
  }

  private safeCode(code: string) {
    return code.replace(new RegExp(' '), '_').toUpperCase();
  }
}
