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
        error: error,
      };
    }
  }

  public async upConfig(body: DtoAppUpConfig) {
    try {
      const upConfig = await this.appService.upConfig(body);

      return {
        status: 200,
        success: true,
        data: upConfig,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        error: error,
      };
    }
  }
}
