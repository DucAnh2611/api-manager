import { ApiKeyService } from '../services';
import { DtoApiKeyValidate } from '../types';

export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  public async check(body: DtoApiKeyValidate) {
    try {
      const check = await this.apiKeyService.validate(body);

      return {
        status: 200,
        success: true,
        data: {
          check,
        },
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
