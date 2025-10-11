import { EntitySchema } from 'typeorm';
import { IApiKey } from './api-key';

export interface IApp {
  id: string;
  code: string;
  name: string;
  configs: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  apiKeys?: IApiKey[];
}

export const AppEntity = new EntitySchema<IApp>({
  name: 'App',
  tableName: 'apps',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    code: {
      type: 'varchar',
      length: 50,
    },
    name: {
      type: 'varchar',
      length: 50,
    },
    configs: {
      type: 'jsonb',
      default: {},
    },
    createdAt: {
      type: 'timestamp with time zone',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp with time zone',
      updateDate: true,
    },
    deletedAt: {
      type: 'timestamp with time zone',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    apiKeys: {
      type: 'one-to-many',
      target: 'ApiKey',
      inverseSide: 'app',
      cascade: true,
    },
  },
});
