import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schemas: ZodValidationSchemas) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = this.getValidationSchema(
      metadata.type as ZodValidationSchemaTypes,
    );

    if (!schema) return value;

    try {
      const parsedValue = schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }

  private getValidationSchema(type: ZodValidationSchemaTypes) {
    return this.schemas[type];
  }
}

type ZodValidationSchemaTypes = 'body' | 'param' | 'query';

type ZodValidationSchemas = {
  [key in ZodValidationSchemaTypes]?: ZodSchema;
};
