import { readFile } from 'node:fs/promises';

const openApiPath = new URL('../backend/openapi/openapi.json', import.meta.url);

async function readOpenApi(): Promise<Record<string, any>> {
  return JSON.parse(await readFile(openApiPath, 'utf8'));
}

test('описывает v1 маршруты помещений с архивированием и tenant-безопасным 404', async () => {
  const document = await readOpenApi();
  const paths = document.paths;

  expect(paths['/rooms']?.get).toMatchObject({
    parameters: [
      { name: 'includeArchived', in: 'query', schema: { type: 'boolean' } },
      { $ref: '#/components/parameters/page' },
      { $ref: '#/components/parameters/pageSize' },
    ],
    responses: {
      '200': {
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/RoomPage' } },
        },
      },
      '401': { $ref: '#/components/responses/401' },
    },
  });
  expect(paths['/rooms']?.post?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/CreateRoomRequest' } },
    },
  });
  expect(paths['/rooms/{roomId}']?.get?.responses?.['404']).toEqual({
    $ref: '#/components/responses/404',
  });
  expect(paths['/rooms/{roomId}']?.patch?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/UpdateRoomRequest' } },
    },
  });
  expect(paths['/rooms/{roomId}/archive']?.post?.responses?.['409']).toEqual({
    $ref: '#/components/responses/409',
  });
});

test('описывает v1 маршруты реестра ОС с фильтрами, пагинацией и строковой стоимостью', async () => {
  const document = await readOpenApi();
  const paths = document.paths;

  expect(paths['/assets']?.get).toMatchObject({
    parameters: expect.arrayContaining([
      { name: 'query', in: 'query', schema: { type: 'string' } },
      { name: 'roomId', in: 'query', schema: { type: 'string' } },
      { name: 'status', in: 'query', schema: { $ref: '#/components/schemas/AssetStatus' } },
      {
        name: 'importState',
        in: 'query',
        schema: { $ref: '#/components/schemas/AssetImportState' },
      },
      { name: 'includeArchived', in: 'query', schema: { type: 'boolean' } },
      { $ref: '#/components/parameters/page' },
      { $ref: '#/components/parameters/pageSize' },
    ]),
    responses: {
      '200': {
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/AssetPage' } },
        },
      },
    },
  });
  expect(paths['/assets']?.post?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/CreateAssetRequest' } },
    },
  });
  expect(paths['/assets/{assetId}']?.get?.responses?.['404']).toEqual({
    $ref: '#/components/responses/404',
  });
  expect(paths['/assets/{assetId}']?.patch?.requestBody).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/UpdateAssetRequest' } },
    },
  });
  expect(paths['/assets/{assetId}/archive']?.post?.responses?.['409']).toEqual({
    $ref: '#/components/responses/409',
  });
  expect(document.components.schemas.Asset.properties.cost).toMatchObject({ type: 'string' });
});

test('описывает перемещения ОС и исключает organizationId из предметных команд', async () => {
  const document = await readOpenApi();
  const movements = document.paths['/assets/{assetId}/movements'];

  expect(movements?.post).toMatchObject({
    requestBody: {
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/CreateMovementRequest' } },
      },
    },
    responses: {
      '201': {
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/Movement' } },
        },
      },
      '404': { $ref: '#/components/responses/404' },
      '422': { $ref: '#/components/responses/422' },
    },
  });
  expect(movements?.get?.responses?.['200']).toMatchObject({
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/MovementPage' } },
    },
  });

  for (const name of [
    'CreateRoomRequest',
    'UpdateRoomRequest',
    'CreateAssetRequest',
    'UpdateAssetRequest',
    'CreateMovementRequest',
  ]) {
    expect(document.components.schemas[name].properties.organizationId).toBeUndefined();
  }
});
