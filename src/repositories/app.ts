import { Repository } from 'typeorm';
import { AppDataSource, AppEntity, IApp } from '../db';

export type AppRepository = Repository<IApp>;

export const appRepository = AppDataSource.getRepository(AppEntity);
