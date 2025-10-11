import { Command } from 'commander';
import { ApiKeyService, AppService } from '../services';
import { apiKeyRepository, appRepository } from '../repositories';
import { printAppTable, buildCliCommand, ICliCommand, printGrid } from '../helpers';
import { DtoApiKeyGenerate, DtoApiKeyList, DtoApiKeyReset, DtoApiKeyToggle } from '../types';
import { EApiKeyType } from '../enums';

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
      const generate = await apiKeyService.generate(opts);

      const cols: Array<[keyof typeof generate, string]> = [
        ['id', 'Id'],
        ['formattedKey', 'Auth Key'],
      ];

      if (opts.type === EApiKeyType.THIRD_PARTY) {
        cols.push(['publicKey', 'Third Party public key']);
      }

      printGrid(generate, cols);
    },
  },
  {
    name: 'list',
    description: 'list api key',
    options: [{ flags: '--code <code>', description: 'App code', default: '' }],
    action: async (opts: DtoApiKeyList) => {
      const list = await apiKeyService.list(opts);

      printAppTable(list, [
        ['id', 'Id'],
        ['key', 'Api Key'],
        ['type', 'Api Type'],
        ['publicKey', 'Public Key'],
        ['active', 'Active'],
      ]);
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

      const cols: Array<[keyof typeof reset, string]> = [
        ['id', 'Id'],
        ['formattedKey', 'Auth Key'],
      ];

      if (reset.type === EApiKeyType.THIRD_PARTY) {
        cols.push(['publicKey', 'Third Party public key']);
      }

      printGrid(reset, cols);
    },
  },
];

export const registerApiKeyCommands = (program: Command) => {
  const appService = new AppService(appRepository);
  const apiKeyService = new ApiKeyService(apiKeyRepository, appService);

  buildCliCommand(Commands(apiKeyService), CommandPrefix, program);
};
