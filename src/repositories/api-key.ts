import { Repository } from 'typeorm';
import { ApiKeyEntity, AppDataSource, IApiKey } from '../db';

export type ApiKeyRepository = Repository<IApiKey>;

export const apiKeyRepository = AppDataSource.getRepository(ApiKeyEntity);
