import { readFile } from 'node:fs/promises';

const openApiPath = new URL('../backend/openapi/openapi.json', import.meta.url);

async function readOpenApi(): Promise<Record<string, any> | undefined> {
  try {
    return JSON.parse(await readFile(openApiPath, 'utf8'));
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return undefined;
    }

    throw error;
  }
}

test('описывает OpenAPI 3.0 с базовым путём /api/v1 и bearer-аутентификацией', async () => {
  const document = await readOpenApi();

  expect(document).toMatchObject({
    openapi: expect.stringMatching(/^3\.0\./),
    servers: [{ url: '/api/v1' }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  });
});

test('описывает единый контракт API-ошибок и стандартные коды ответов', async () => {
  const document = await readOpenApi();

  expect(document?.components?.schemas?.ErrorResponse).toMatchObject({
    type: 'object',
    required: ['error'],
    properties: {
      error: { $ref: '#/components/schemas/ApiError' },
    },
  });
  expect(document?.components?.schemas?.ApiError).toMatchObject({
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: { type: 'string' },
      message: { type: 'string' },
      fields: {
        type: 'array',
        items: { $ref: '#/components/schemas/ApiErrorField' },
      },
    },
  });

  const expectedCodes = ['400', '401', '403', '404', '409', '413', '415', '422', '429', '500'];
  expect(Object.keys(document?.components?.responses ?? {})).toEqual(
    expect.arrayContaining(expectedCodes),
  );
  expect(document?.components?.responses?.['422']).toMatchObject({
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
      },
    },
  });
});

test('описывает параметры и форму постраничных списков', async () => {
  const document = await readOpenApi();

  expect(document?.components?.parameters?.page).toMatchObject({
    name: 'page',
    in: 'query',
    schema: { type: 'integer', minimum: 1 },
  });
  expect(document?.components?.parameters?.pageSize).toMatchObject({
    name: 'pageSize',
    in: 'query',
    schema: { type: 'integer', minimum: 1, maximum: 100 },
  });
  expect(document?.components?.schemas?.PaginatedResponse).toMatchObject({
    type: 'object',
    required: ['items', 'page', 'pageSize', 'total'],
    properties: {
      items: { type: 'array' },
      page: { type: 'integer', minimum: 1 },
      pageSize: { type: 'integer', minimum: 1, maximum: 100 },
      total: { type: 'integer', minimum: 0 },
    },
  });
});

test('описывает нейтральную регистрацию с подтверждением email и сессионные v1 маршруты', async () => {
  const document = await readOpenApi();
  const paths = document?.paths;

  expect(paths?.['/auth/register']?.post).toMatchObject({
    security: [],
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/RegisterRequest' },
        },
      },
    },
    responses: {
      '202': { description: expect.any(String) },
      '422': { $ref: '#/components/responses/422' },
    },
  });
  expect(paths?.['/auth/verify-email']?.post).toMatchObject({
    security: [],
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthSessionResponse' },
          },
        },
      },
    },
  });
  expect(paths?.['/auth/login']?.post?.security).toEqual([]);
  expect(paths?.['/auth/refresh']?.post?.security).toEqual([{ refreshCookie: [] }]);
  expect(paths?.['/auth/logout']?.post).toMatchObject({
    security: [{ refreshCookie: [] }],
    responses: { '204': { description: expect.any(String) } },
  });
});

test('описывает защищённую карточку организации без клиентского organizationId', async () => {
  const document = await readOpenApi();
  const organization = document?.paths?.['/organization'];

  expect(organization?.get).toMatchObject({
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Organization' },
          },
        },
      },
      '401': { $ref: '#/components/responses/401' },
    },
  });
  expect(organization?.patch?.requestBody).toMatchObject({
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateOrganizationRequest' },
      },
    },
  });
  expect(document?.components?.schemas?.RegisterRequest?.properties?.organizationId).toBeUndefined();
  expect(
    document?.components?.schemas?.UpdateOrganizationRequest?.properties?.organizationId,
  ).toBeUndefined();
});
