import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/app/swaggerConfig';
import appConfig from './config/app/appConfig';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        bodyParser: true,
    });
    app.enableShutdownHooks();
    app.enableCors({
        allowedHeaders: [
            'content-type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
            'Authorization',
            'Accept',
        ],
        origin: 'https://itransition-4.netlify.app',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix('api');

    if (process.env.NODE_ENV !== 'production') {
        const document = SwaggerModule.createDocument(app, swaggerConfig());
        SwaggerModule.setup('api-doc', app, document);
    }

    const port = appConfig().port;

    await app.listen(port);
}

bootstrap();
