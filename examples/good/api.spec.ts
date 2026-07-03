import { test, expect } from '@playwright/test';

test('create user profile via direct API requests', async ({ request }) => {
  const response = await request.post('https://example.com/api/users', {
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Editor',
    },
  });
  
  // Validate request status code directly without UI layer dependency
  expect(response.status()).toBe(201);
  
  // Strongly assert response body schema and exact fields
  const responseBody = await response.json();
  expect(responseBody).toMatchObject({
    id: expect.any(String),
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Editor',
    createdAt: expect.any(String),
  });
});
