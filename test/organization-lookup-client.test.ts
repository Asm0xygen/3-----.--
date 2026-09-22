import { lookupOrganization } from '../frontend/src/api/organization';

test('сообщает понятную ошибку, когда проверка ИНН вернула пустой ответ', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 502 }));

  await expect(lookupOrganization('7707083893', fetcher)).rejects.toThrow(
    'Не удалось проверить организацию по ИНН.',
  );
});
