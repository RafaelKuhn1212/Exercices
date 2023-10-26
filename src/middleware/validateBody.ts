import yup,{ Schema } from 'yup';
import { NextFunction, Request,Response } from 'express';
import AppErrorConstructor from '../Errors/errorConstructor';

  const schemaOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  export default function validateBody(schema:Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        
        req.body = await schema.validate(req.body, schemaOptions);
        next();
      } catch (error:any) {

        throw next(new AppErrorConstructor(error.errors,400))

      }
    };

  }
