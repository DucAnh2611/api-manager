import { Like } from 'typeorm';
import { IApiKey } from '../db';
import { formatString, generateBytes, hash, verify } from '../helpers';
import {
  DtoApiKeyCheckKeyType,
  DtoApiKeyGenerate,
  DtoApiKeyList,
  DtoApiKeyReset,
  DtoApiKeyToggle,
  DtoApiKeyValidate,
} from '../types';
import { AppService } from './app';
import { ApiKeyRepository } from '../repositories';
import { API_KEY_CONFIG } from '../configs';

export class ApiKeyService {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly appService: AppService
  ) {}

  public async validate(dto: DtoApiKeyValidate) {
    const app = await this.appService.getByCode(dto.appCode);
    if (!app) {
      throw new Error('App not exist!');
    }

    const apiKeys = await this.apiKeyRepository.find({
      where: {
        appId: app.id,
        active: true,
      },
    });

    for (const apiKey of apiKeys) {
      if (verify(dto.apiKey, apiKey.key)) {
        return true;
      }
    }

    return false;
  }

  public async toggle(dto: DtoApiKeyToggle) {
    const apiKey = await this.getById(dto.id);
    if (!apiKey) {
      throw new Error('ApiKey not exist!');
    }

    const app = await this.appService.getByCode(dto.code);
    if (!app) {
      throw new Error('App not exist!');
    }

    const updateApiKey: Partial<IApiKey> = {};

    updateApiKey.active = !apiKey.active;
    updateApiKey.revokedAt = updateApiKey.active ? null : new Date();

    const toggled = await this.apiKeyRepository.update(
      {
        id: dto.id,
        appId: app.id,
      },
      updateApiKey
    );

    return { ...dto, type: apiKey.type, active: updateApiKey.active };
  }

  public async generate(dto: DtoApiKeyGenerate) {
    const app = await this.appService.getByCode(dto.code);
    if (!app) {
      throw new Error('App not exist!');
    }

    const key = generateBytes(Number(dto.length));

    const saved = await this.apiKeyRepository.save({
      appId: app.id,
      key: hash(key, Number(dto.length)),
      description: dto.description,
      type: dto.type,
      active: true,
    });

    return {
      ...saved,
      formattedKey: formatString(
        API_KEY_CONFIG.stringFormat.format,
        { APP_CODE: app.code, KEY_TYPE: dto.type, KEY: key },
        API_KEY_CONFIG.stringFormat.separate
      ),
    };
  }

  public async list(dto: DtoApiKeyList) {
    return this.apiKeyRepository.find({
      where: {
        app: {
          code: Like(`%${dto.code}%`),
        },
      },
      order: {
        type: 'ASC',
      },
    });
  }

  public async reset(dto: DtoApiKeyReset) {
    const apiKey = await this.getById(dto.id);
    if (!apiKey) {
      throw new Error('ApiKey not exist!');
    }

    const app = await this.appService.getByCode(dto.code);
    if (!app) {
      throw new Error('App not exist!');
    }

    const key = generateBytes(Number(dto.length));

    await this.apiKeyRepository.update(
      { id: dto.id },
      {
        key: hash(key, Number(dto.length)),
        active: true,
      }
    );

    return {
      ...apiKey,
      formattedKey: formatString(
        API_KEY_CONFIG.stringFormat.format,
        { APP_CODE: app.code, KEY_TYPE: apiKey.type, KEY: key },
        API_KEY_CONFIG.stringFormat.separate
      ),
    };
  }

  public async getById(id: string) {
    return this.apiKeyRepository.findOneBy({ id });
  }

  public async getByApp(appId: string) {
    return this.apiKeyRepository.find({ where: { appId } });
  }

  public async checkKeyType(dto: DtoApiKeyCheckKeyType) {
    const apiKeys = await this.apiKeyRepository.find({
      where: {
        type: dto.type,
        app: {
          code: dto.appCode,
        },
        active: true,
      },
    });

    for (const apiKey of apiKeys) {
      if (verify(dto.key, apiKey.key)) {
        return true;
      }
    }

    return false;
  }
}
