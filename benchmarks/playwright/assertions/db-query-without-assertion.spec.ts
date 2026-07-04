import { test } from '@playwright/test';

class DatabaseActions {
  async connectDB(): Promise<void> {}
  async query(_sql: string): Promise<unknown[]> {
    return [];
  }
}

test('connect to database and query users', async () => {
  const db = new DatabaseActions();

  await db.connectDB();
  await db.query('SELECT * FROM users');
});
