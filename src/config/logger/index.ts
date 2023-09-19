import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format } from 'winston';
import { MongoDB } from 'winston-mongodb';

export const MongoLogger = async (configService: ConfigService) => {
  const collection = configService.get<string>('MONGO_LOG_DB');
  const consoleFormat = format.combine(
    format.timestamp(),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(
      configService.get<string>('APP_NAME') ?? 'Nest',
      {
        colors: true,
        prettyPrint: true,
      },
    ),
  );
  const mongoFormat = format.combine(
    format.timestamp(),
    format.ms(),
    format.json(),
    format.errors({ stack: true }),
    format.metadata(),
  );

  return {
    transports: [
      new transports.Console({ format: consoleFormat }),
      new MongoDB({
        level: 'info',
        options: {
          useUnifiedTopology: true,
        },
        db: String(configService.get('URL_CONNECTION')) + collection,
        collection,
        format: mongoFormat,
      }),
    ],
  };
};
