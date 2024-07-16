import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "../auth.service";
import { CreateAuthInput } from "../dto/create-auth.input";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authServicer: AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password',
          });
    }

    async validate(username: string , password: string){

        const newAuth = new CreateAuthInput();

        newAuth.email = username;
        newAuth.password = password

        
        const user = await this.authServicer.validate(newAuth);
        
        

        if(!user){
            throw new UnauthorizedException();
            
        }else{
            return user;
        }
    }



}