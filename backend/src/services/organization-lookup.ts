import { ApiError } from '../errors/api-error';

type DatanewtonSuggestion = {
  active?: boolean;
  address?: string;
  inn?: string;
  manager_name?: string;
  name?: string;
};

type DatanewtonSuggestionsResponse = {
  data?: DatanewtonSuggestion[];
};

type LookupOptions = {
  apiKey: string;
  apiUrl: string;
  fetcher?: typeof fetch;
};

export type OrganizationLookup = {
  address: string;
  inn: string;
  managerName: string;
  name: string;
};

export async function lookupOrganizationByInn(
  inn: string,
  { apiKey, apiUrl, fetcher = fetch }: LookupOptions,
): Promise<OrganizationLookup> {
  const endpoint = new URL('/api_ext/v1/suggestions', apiUrl);
  endpoint.searchParams.set('key', apiKey);

  let response: Response;
  try {
    response = await fetcher(endpoint.toString(), {
      body: JSON.stringify({ is_active: true, search_query: inn, type: 'all' }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new ApiError({
      code: 'ORGANIZATION_LOOKUP_UNAVAILABLE',
      message: 'Сервис проверки организаций временно недоступен.',
      status: 503,
    });
  }

  if (!response.ok) {
    throw new ApiError({
      code: 'ORGANIZATION_LOOKUP_FAILED',
      message: 'Не удалось проверить организацию по ИНН.',
      status: 502,
    });
  }

  const payload = (await response.json()) as DatanewtonSuggestionsResponse;
  const organization = payload.data?.find((item) => item.inn === inn && item.active);

  if (!organization?.name || !organization.address || !organization.manager_name) {
    throw new ApiError({
      code: 'ORGANIZATION_NOT_FOUND',
      message: 'Действующая организация с указанным ИНН не найдена.',
      status: 404,
    });
  }

  return {
    address: organization.address,
    inn,
    managerName: organization.manager_name,
    name: organization.name,
  };
}
