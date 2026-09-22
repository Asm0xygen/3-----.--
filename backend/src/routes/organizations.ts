import { Router } from 'express';
import { env } from '../config/load-env';
import { ApiError } from '../errors/api-error';
import { lookupOrganizationByInn } from '../services/organization-lookup';

const router = Router();

router.post('/lookup', async (req, res, next) => {
  try {
    const inn = typeof req.body?.inn === 'string' ? req.body.inn : '';

    if (!/^\d{10}(?:\d{2})?$/.test(inn)) {
      throw new ApiError({
        code: 'INVALID_INN',
        message: 'ИНН должен состоять из 10 или 12 цифр.',
        status: 400,
      });
    }

    if (!env.datanewton.apiKey) {
      throw new ApiError({
        code: 'ORGANIZATION_LOOKUP_NOT_CONFIGURED',
        message: 'Проверка организаций не настроена.',
        status: 503,
      });
    }

    const organization = await lookupOrganizationByInn(inn, {
      apiKey: env.datanewton.apiKey,
      apiUrl: env.datanewton.apiUrl,
    });

    res.json({ organization });
  } catch (error) {
    next(error);
  }
});

export default router;
