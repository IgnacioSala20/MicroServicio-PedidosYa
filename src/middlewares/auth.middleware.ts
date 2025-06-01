/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionController, Permissions } from './decorators/permissions.decorator';
import axios from 'axios';
import { TokenException } from './tokenException';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const token = request.headers.authorization.replace('Bearer ','');
      
      
      const permissions = this.reflector.get(Permissions, context.getHandler());
      const permissionController= this.reflector.get(PermissionController, context.getClass());

      if (token == null) {
        throw new UnauthorizedException('El token no existe');
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await axios.get(`http://localhost:3001/users/can-do/${permissions}_${permissionController}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
      }
      return true;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new TokenException(error);
    }
  }
}
