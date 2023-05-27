import { plainToInstance } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return validateConfig;
}
