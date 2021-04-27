import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    /**
     * It's also worth noting that we could do a database lookup or 
     * call a RESTful API to extract more information about the user,
     * resulting in a more enriched user object being available in 
     * our Request. This is also the place we may decide to do further
     * token validation, such as looking up the userId in a list of 
     * revoked tokens, enabling us to perform token revocation.
     */
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
