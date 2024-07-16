import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/eventsystem')
    ,AuthModule, TaskModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
