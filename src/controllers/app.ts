import { AppService } from '../services';
import { DtoAppGetConfigs, DtoAppUpConfig } from '../types';

export class AppController {
  constructor(private readonly appService: AppService) {}

  public async appConfigs(params: DtoAppGetConfigs) {
    try {
      const configs = await this.appService.getConfigs(params);

      return {
        status: 200,
        success: true,
        data: configs,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        error: (error as Error).message,
      };
    }
  }

  public async upConfig(code: string, body: DtoAppUpConfig) {
    try {
      const upConfig = await this.appService.upConfig(code, body);

      return {
        status: 200,
        success: true,
        data: upConfig,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        error: (error as Error).message,
      };
    }
  }
}
