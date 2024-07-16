import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';

@Module({
  imports: [JwtModule.register({
    secret: 'secretkey',
    signOptions: {expiresIn: '24h'},
  }),
  MongooseModule.forFeature([{
    name: Auth.name,
    schema: AuthSchema

}])],
  providers: [AuthResolver, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
