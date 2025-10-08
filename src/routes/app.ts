import { Router } from 'express';
import { ValidateApiKey, ValidateDto } from '../middlewares';
import { DtoAppUpConfig } from '../types';
import { EValidateDtoType } from '../enums';
import { AppService } from '../services';
import { appRepository } from '../repositories';
import { AppController } from '../controllers';
import { EApiKeyType } from '../enums/api-key';

export const AppRouter = Router();

const appService = new AppService(appRepository);
const appController = new AppController(appService);

AppRouter.put(
  '/cfg',
  ValidateDto(DtoAppUpConfig, [EValidateDtoType.BODY]),
  ValidateApiKey(EApiKeyType.UP_CONFIG),
  async (req, res) => {
    const resData = await appController.upConfig(req.body);

    return res.status(resData.status).json(resData);
  }
);

AppRouter.get('/cfg', ValidateApiKey(EApiKeyType.CONFIG), async (req, res) => {
  const { appCode } = (req as any).apiKey;
  const resData = await appController.appConfigs({ code: appCode });

  return res.status(resData.status).json(resData);
});
