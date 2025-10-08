import { NextFunction, Request, Response } from 'express';
import { EValidateDtoType } from '../enums';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const ValidateDto = (dtoClass: any, sources: EValidateDtoType[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const source of sources) {
      await validateEachSource(dtoClass, source, req, res);
    }

    (req as any).isValidateDto = true;

    next();
  };
};

const validateEachSource = async (
  dtoClass: any,
  source: EValidateDtoType,
  req: Request,
  res: Response
) => {
  const data = req[source];
  const dtoInstance = plainToInstance(dtoClass, data);
  const errors = await validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });

  if (errors.length > 0) {
    const formatted = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
      children: err.children?.length ? err.children : undefined,
    }));

    return res.status(400).json({
      success: false,
      status: 400,
      message: `Validation failed in ${source}`,
      errors: formatted,
    });
  }

  (req as any)[source] = dtoInstance;
};
