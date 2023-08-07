import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/app/swaggerConfig';
import appConfig from './config/app/appConfig';

// import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();
    app.enableCors();
    // app.use(cookieParser());
    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup('api-doc', app, document);

    const port = appConfig().port;

    await app.listen(port);
}
bootstrap();
