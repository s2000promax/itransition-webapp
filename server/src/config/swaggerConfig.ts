import { DocumentBuilder } from '@nestjs/swagger';

export default () => new DocumentBuilder()
    .setTitle('itransition-webapp')
    .setDescription('The itransition-webapp API description')
    .setVersion('0.1.0')
    .build();
