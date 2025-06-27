import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionController, Permissions } from './decorators/permissions.decorator';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.replace('Bearer ','');
      
      const permissions = this.reflector.get(Permissions, context.getHandler());
      const permissionController= this.reflector.get(PermissionController, context.getClass());

      if (token == null) {
        throw new UnauthorizedException('El token no existe');
      }
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
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || 'Token inválido';

        if (status === 401) {
          throw new UnauthorizedException(message);
        }
      }
      throw new Error('Fallo la comunicación con el servicio de autenticación');
    }
  }
}
