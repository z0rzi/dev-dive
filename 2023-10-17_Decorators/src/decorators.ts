import { Response } from "express";
import { RequestWithUser } from "./middlewares";

export function BodyHas(prop: string, type: string, optional = false) {
  return function (
    _target: any,
    _propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value as Function;

    descriptor.value = function (req: RequestWithUser, res: Response) {
      if (!req.body[prop]) {
        if (!optional) {
          res.status(400).send(`Missing ${prop} in body`);
          return;
        }
      } else {
        if (typeof req.body[prop] !== type) {
          res
            .status(400)
            .send(
              `Wrong type for ${prop}, expected '${type}' but got '${typeof req
                .body[prop]}'`
            );

          return;
        }
      }

      originalMethod.call(this, ...arguments);
    };
  };
}

export function BodyHasNoMoreThan(...props: string[]) {
  return function (
    _target: any,
    _propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value as Function;

    descriptor.value = function (req: RequestWithUser, res: Response) {
      const bodyProps = Object.keys(req.body);
      const hasMoreProps = bodyProps.some((prop) => !props.includes(prop));

      const wrongProps = bodyProps.filter((prop) => !props.includes(prop));

      if (hasMoreProps) {
        res
          .status(400)
          .send(`Property "${wrongProps.join(', ')}" is not allowed in body`);
        return;
      }

      originalMethod.call(this, ...arguments);
    };
  };
}
