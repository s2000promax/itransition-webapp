import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/app/appConfig';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        PrismaModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
            {
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
            },
        AppService,
    ],
})
export class AppModule {}
