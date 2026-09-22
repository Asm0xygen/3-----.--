import { lookupOrganizationByInn } from '../backend/src/services/organization-lookup';

test('запрашивает действующую организацию по ИНН и возвращает название, адрес и руководителя', async () => {
  const fetcher = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify({
        data: [
          {
            active: true,
            address: 'г. Москва, ул. Пример, д. 1',
            inn: '7707083893',
            manager_name: 'Иванов Иван Иванович',
            name: 'ООО «Пример»',
          },
        ],
      }),
      { status: 200 },
    ),
  );

  await expect(
    lookupOrganizationByInn('7707083893', {
      apiKey: 'secret-api-key',
      apiUrl: 'https://datanewton.example.test',
      fetcher,
    }),
  ).resolves.toEqual({
    address: 'г. Москва, ул. Пример, д. 1',
    inn: '7707083893',
    managerName: 'Иванов Иван Иванович',
    name: 'ООО «Пример»',
  });

  expect(fetcher).toHaveBeenCalledWith(
    'https://datanewton.example.test/api_ext/v1/suggestions?key=secret-api-key',
    expect.objectContaining({
      body: JSON.stringify({ is_active: true, search_query: '7707083893', type: 'all' }),
      method: 'POST',
    }),
  );
});

test('отклоняет ответ, не содержащий точного совпадения по ИНН', async () => {
  const fetcher = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ data: [{ active: true, inn: '7707083894' }] }), { status: 200 }),
  );

  await expect(
    lookupOrganizationByInn('7707083893', {
      apiKey: 'secret-api-key',
      apiUrl: 'https://datanewton.example.test',
      fetcher,
    }),
  ).rejects.toMatchObject({ code: 'ORGANIZATION_NOT_FOUND', status: 404 });
});
