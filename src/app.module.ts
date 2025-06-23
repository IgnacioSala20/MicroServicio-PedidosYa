import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { PersonaModule } from './persona/persona.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { PaisModule } from './pais/pais.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5435,
        database: 'personas',
        username: 'postgres',
        password: 'postgres',
        synchronize: true,
        entities,
      }),
      TypeOrmModule.forFeature(entities),
      PersonaModule,
      CiudadModule,
      ProvinciaModule,
      PaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
