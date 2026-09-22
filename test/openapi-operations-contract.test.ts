import { readFile } from 'node:fs/promises';

const openApiPath = new URL('../backend/openapi/openapi.json', import.meta.url);

async function readOpenApi(): Promise<Record<string, any>> {
  return JSON.parse(await readFile(openApiPath, 'utf8'));
}

test('описывает staged-импорт с multipart-файлом, лимитами и tenant-безопасными ответами', async () => {
  const document = await readOpenApi();
  const paths = document.paths;

  expect(paths['/imports']?.post).toMatchObject({
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: { $ref: '#/components/schemas/CreateImportRequest' },
        },
      },
    },
    responses: {
      '201': {
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/ImportJob' } },
        },
      },
      '413': { $ref: '#/components/responses/413' },
      '415': { $ref: '#/components/responses/415' },
      '422': { $ref: '#/components/responses/422' },
    },
  });
  expect(document.components.schemas.CreateImportRequest).toMatchObject({
    required: ['file'],
    properties: {
      file: { type: 'string', format: 'binary' },
    },
  });
  expect(paths['/imports/{importId}']?.get?.responses?.['404']).toEqual({
    $ref: '#/components/responses/404',
  });
  expect(paths['/imports/{importId}/mapping']?.put?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/ImportMappingRequest' } },
    },
  });
  expect(paths['/imports/{importId}/rows']?.get).toMatchObject({
    parameters: expect.arrayContaining([
      { name: 'action', in: 'query', schema: { $ref: '#/components/schemas/ImportRowAction' } },
      { $ref: '#/components/parameters/page' },
      { $ref: '#/components/parameters/pageSize' },
    ]),
  });
  expect(paths['/imports/{importId}/confirm']?.post?.responses?.['409']).toEqual({
    $ref: '#/components/responses/409',
  });
  expect(paths['/imports/{importId}/cancel']?.post?.responses?.['204']).toBeDefined();
});

test('описывает QR-метки без предметных данных в токене и создание печатного PDF', async () => {
  const document = await readOpenApi();
  const paths = document.paths;

  expect(paths['/assets/{assetId}/labels']?.post).toMatchObject({
    responses: {
      '201': {
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/AssetLabel' } },
        },
      },
      '404': { $ref: '#/components/responses/404' },
    },
  });
  expect(document.components.schemas.AssetLabel).toMatchObject({
    required: ['id', 'assetId', 'version', 'token', 'isActive', 'createdAt'],
    properties: { token: { type: 'string' } },
  });
  expect(paths['/labels/print']?.post).toMatchObject({
    requestBody: {
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/PrintLabelsRequest' } },
      },
    },
    responses: {
      '200': {
        content: { 'application/pdf': { schema: { type: 'string', format: 'binary' } } },
      },
    },
  });
  expect(document.components.schemas.PrintLabelsRequest.properties.organizationId).toBeUndefined();
});

test('описывает инвентаризацию, сканирование и скачивание PDF/XLSX ведомости', async () => {
  const document = await readOpenApi();
  const paths = document.paths;

  expect(paths['/inventories']?.post?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/CreateInventoryRequest' } },
    },
  });
  expect(paths['/inventories']?.get?.responses?.['200']).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/InventoryPage' } },
    },
  });
  expect(paths['/inventories/{inventoryId}/start']?.post?.responses?.['409']).toEqual({
    $ref: '#/components/responses/409',
  });
  expect(paths['/inventories/{inventoryId}/scan']?.post).toMatchObject({
    requestBody: {
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/ScanInventoryRequest' } },
      },
    },
    responses: {
      '404': { $ref: '#/components/responses/404' },
      '409': { $ref: '#/components/responses/409' },
      '422': { $ref: '#/components/responses/422' },
    },
  });
  expect(paths['/inventories/{inventoryId}/items']?.get?.responses?.['200']).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/InventoryItemPage' } },
    },
  });
  expect(paths['/inventories/{inventoryId}/report']?.get).toMatchObject({
    parameters: expect.arrayContaining([
      {
        name: 'format',
        in: 'query',
        required: true,
        schema: { type: 'string', enum: ['pdf', 'xlsx'] },
      },
    ]),
    responses: {
      '200': {
        content: expect.objectContaining({
          'application/pdf': { schema: { type: 'string', format: 'binary' } },
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
            schema: { type: 'string', format: 'binary' },
          },
        }),
      },
    },
  });

  for (const name of ['CreateImportRequest', 'ImportMappingRequest', 'PrintLabelsRequest', 'CreateInventoryRequest', 'ScanInventoryRequest']) {
    expect(document.components.schemas[name].properties.organizationId).toBeUndefined();
  }
});
