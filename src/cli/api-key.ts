import { Command } from 'commander';
import { ApiKeyService, AppService } from '../services';
import { apiKeyRepository, appRepository } from '../repositories';
import { printAppTable, buildCliCommand, ICliCommand } from '../helpers';
import { DtoApiKeyGenerate, DtoApiKeyList, DtoApiKeyReset, DtoApiKeyToggle } from '../types';
import { EApiKeyType } from '../enums/api-key';

const CommandPrefix = 'api_key';

const Commands = (apiKeyService: ApiKeyService): ICliCommand[] => [
  {
    name: 'toggle',
    description: 'Toggle active of api key',
    options: [
      { required: true, flags: '--code <code>', description: 'App code' },
      { required: true, flags: '--id <id>', description: 'API key id' },
    ],
    action: async (opts: DtoApiKeyToggle) => {
      const toggled = await apiKeyService.toggle(opts);

      printAppTable(
        [toggled],
        [
          ['id', 'Api Key Id'],
          ['type', 'Api key Type'],
          ['code', 'App Code'],
          ['active', 'Active'],
        ]
      );
    },
  },
  {
    name: 'new',
    description: 'Generate api key',
    options: [
      { required: true, flags: '--code <code>', description: 'App code' },
      { flags: '--description <description>', description: 'Api key description', default: '' },
      { flags: '--type <type>', description: 'Api key type', default: EApiKeyType.CONFIG },
      { flags: '--length <length>', description: 'Api key length', default: '32' },
    ],
    action: async (opts: DtoApiKeyGenerate) => {
      const reset = await apiKeyService.generate(opts);

      printAppTable(
        [{ ...reset, ...opts }],
        [
          ['id', 'Id'],
          ['type', 'Api key Type'],
          ['code', 'App Code'],
          ['formattedKey', 'Formatted Api Key'],
          ['description', 'Description'],
          ['active', 'Active'],
        ],
        ['description']
      );
    },
  },
  {
    name: 'list',
    description: 'list api key',
    options: [{ flags: '--code <code>', description: 'App code', default: '' }],
    action: async (opts: DtoApiKeyList) => {
      const list = await apiKeyService.list(opts);

      printAppTable(
        list,
        [
          ['id', 'Id'],
          ['key', 'Api Key'],
          ['appId', 'App Id'],
          ['type', 'Api Type'],
          ['active', 'Active'],
        ],
        ['key']
      );
    },
  },
  {
    name: 'reset',
    description: 'Reset api key',
    options: [
      { required: true, flags: '--code <code>', description: 'App code' },
      { required: true, flags: '--id <id>', description: 'Api key id', default: '' },
      { flags: '--length <length>', description: 'Api key length', default: '32' },
    ],
    action: async (opts: DtoApiKeyReset) => {
      const reset = await apiKeyService.reset(opts);

      printAppTable(
        [{ ...reset, ...opts }],
        [
          ['id', 'Id'],
          ['type', 'Api key Type'],
          ['code', 'App Code'],
          ['formattedKey', 'Formatted Api Key'],
          ['active', 'Active'],
        ]
      );
    },
  },
];

export const registerApiKeyCommands = (program: Command) => {
  const appService = new AppService(appRepository);
  const apiKeyService = new ApiKeyService(apiKeyRepository, appService);

  buildCliCommand(Commands(apiKeyService), CommandPrefix, program);
};
