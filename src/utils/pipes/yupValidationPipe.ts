import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Schema } from 'yup';

export class YupValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: unknown) {
    try {
      console.log(value);
      const parsedValue = this.schema.validate(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
