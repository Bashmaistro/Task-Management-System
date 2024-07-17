import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "../auth.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly authService : AuthService){
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretkey'
        })
    }

    async validate(payload: any) {
        
        
        const user = await this.authService.validate({email :payload._doc.email, password: payload._doc.password})
        

        const userWithToken = {
            ...payload._doc,
            token: user
          };
        
        
        if (!user) {
            throw new UnauthorizedException(
              'Could not log-in with the provided credentials',
            );
          }
      
          return userWithToken;
      }

}