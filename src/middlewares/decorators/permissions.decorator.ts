
import { Reflector } from '@nestjs/core';

export const Permissions = Reflector.createDecorator<string[]>();

export const PermissionController = Reflector.createDecorator<string>();
