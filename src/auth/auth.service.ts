import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<AuthDocument>,
    private jwtService: JwtService 
  ){

  }
 
  async createAuth(createAuthInput: CreateAuthInput) {
    const createdAuth= new this.authModel(createAuthInput)
    return createdAuth.save();
  }

  async validate(authPayload : CreateAuthInput){

    const findUser = await this.findOneByEmail(authPayload.email);

    if (findUser && (findUser.password === authPayload.password)) {
        
      const {password, ...user } = findUser;
      return this.jwtService.sign(user);

    }else{
      return findUser;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOneByEmail(email: string) {
    
    return this.authModel.findOne({email: email})
  
  }

  async findOne(id: number) {
    return this.authModel.findById(id);
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
