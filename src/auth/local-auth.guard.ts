/**
 * Passing the strategy name directly to the AuthGuard() introduces magic
 * strings in the codebase. Instead, we recommend creating your own class
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() 
export class LocalAuthGuard extends AuthGuard('local') {}
