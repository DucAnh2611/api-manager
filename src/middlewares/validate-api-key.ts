import { NextFunction, Request, Response } from 'express';
import { EApiKeyType } from '../enums/api-key';
import { ApiKeyService, AppService } from '../services';
import { apiKeyRepository, appRepository } from '../repositories';
import { API_KEY_CONFIG } from '../configs';

export const ValidateApiKey = (type: EApiKeyType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const apiKeyHeader: string = req.headers['x-api-key'] as string;
    if (!apiKeyHeader) {
      return res.status(403).json({
        status: 403,
        success: false,
        error: 'Missing Api key',
      });
    }

    const [appCodeHeader, typeApiKeyHeader, keyHeader] = apiKeyHeader.split(
      API_KEY_CONFIG.stringFormat.separate
    );

    if (typeApiKeyHeader !== type) {
      return res.status(403).json({
        status: 403,
        success: false,
        error: 'Mismatch API Key type',
      });
    }

    const apiKeyService = new ApiKeyService(apiKeyRepository, new AppService(appRepository));

    const valid = await apiKeyService.checkKeyType({
      type,
      key: keyHeader,
      appCode: appCodeHeader,
    });

    if (!valid) {
      return res.status(403).json({
        status: 403,
        success: false,
        error: 'Invalid API Key',
      });
    }

    (req as any).apiKey = {
      type,
      appCode: appCodeHeader,
    };

    next();
  };
};
