import { Router } from 'express';
import { ValidateDto } from '../middlewares';
import { ApiKeyService, AppService } from '../services';
import { apiKeyRepository, appRepository } from '../repositories';
import { ApiKeyController } from '../controllers';
import { DtoApiKeyValidate } from '../types';
import { EValidateDtoType } from '../enums';

export const ApiKeyRouter = Router();

const appService = new AppService(appRepository);
const apiKeyService = new ApiKeyService(apiKeyRepository, appService);
const apiKeyController = new ApiKeyController(apiKeyService);

ApiKeyRouter.post(
  '/check',
  ValidateDto([{ dto: DtoApiKeyValidate, type: EValidateDtoType.BODY }]),
  async (req, res) => {
    const resData = await apiKeyController.check(req.body);

    return res.status(resData.status).json(resData);
  }
);
