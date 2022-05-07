import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

import env from './env';

@Module({
  imports: [
    MongooseModule.forRoot(env.URL_DB,{}),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
