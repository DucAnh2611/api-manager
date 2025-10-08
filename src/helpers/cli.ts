import { Command } from 'commander';

export interface ICliCommand {
  name: string;
  description: string;
  options?: Array<{
    required?: boolean;
    flags: string;
    description?: string;
    default?: string | boolean | string[];
  }>;
  action: (this: Command, ...args: any[]) => void | Promise<void>;
}

export const buildCliCommand = (
  commands: ICliCommand[],
  commandPrefix: string,
  program: Command
) => {
  for (const command of commands) {
    const sub = program
      .command(`${commandPrefix ? `${commandPrefix}:` : ''}${command.name}`)
      .description(command.description || 'No Description');

    if (command.options?.length) {
      for (const option of command.options) {
        if (option.required) {
          sub.requiredOption(option.flags, option.description, option.default);
          continue;
        }

        sub.option(option.flags, option.description, option.default);
      }
    }

    sub.action(command.action);
  }
};
