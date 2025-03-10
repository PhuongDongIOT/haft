import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { UserAlreadyExistsException } from './user-already-exists.exception';
import { isDatabaseError } from '../database/databse-error';
import { PostgresTransaction } from '../database/postgres-transaction';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getByEmail(email: string) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(databaseSchema.users.email, email),
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(databaseSchema.users.userId, id),
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(user: UserDto) {
    try {
      const createdUsers = await this.drizzleService.db
        .insert(databaseSchema.users)
        .values(user)
        .returning();

      return createdUsers.pop();
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.UniqueViolation
      ) {
        throw new UserAlreadyExistsException(user.email);
      }
      throw error;
    }
  }

  async delete(userId: number, transaction?: PostgresTransaction) {
    const database = transaction ?? this.drizzleService.db;

    try {
      const deletedUsers = await database
        .delete(databaseSchema.users)
        .where(eq(databaseSchema.users.userId, userId))
        .returning();
      if (deletedUsers.length === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.ForeignKeyViolation
      ) {
        throw new BadRequestException(
          'Can not remove a user that is an author of an article',
        );
      }
      throw error;
    }
  }
  
}
