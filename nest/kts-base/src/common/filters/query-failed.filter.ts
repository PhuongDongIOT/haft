import { STATUS_CODES } from 'node:http';

import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';

import { constraintErrors } from './constraint-errors';

export class QueryFailedFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) { }

    catch(
        exception: { constraint?: string },
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.constraint?.startsWith('UQ')
            ? HttpStatus.CONFLICT
            : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            statusCode: status,
            error: STATUS_CODES[status],
            message: exception.constraint
                ? constraintErrors[exception.constraint]
                : undefined,
        });
    }
}
