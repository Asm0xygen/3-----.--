export type Organization = {
  address: string;
  inn: string;
  managerName: string;
  name: string;
};

type OrganizationLookupResponse = {
  error?: { message?: string };
  organization?: Organization;
};

const DEFAULT_ERROR_MESSAGE = 'Не удалось проверить организацию по ИНН.';

export async function lookupOrganization(
  inn: string,
  fetcher: typeof fetch = fetch,
): Promise<Organization> {
  const response = await fetcher('/api/organizations/lookup', {
    body: JSON.stringify({ inn }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  });
  const body = await response.text();
  let payload: OrganizationLookupResponse = {};

  if (body) {
    try {
      payload = JSON.parse(body) as OrganizationLookupResponse;
    } catch {
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
  }

  if (!response.ok || !payload.organization) {
    throw new Error(payload.error?.message || DEFAULT_ERROR_MESSAGE);
  }

  return payload.organization;
}
