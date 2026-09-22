export type ApiErrorField = {
  path: string;
  message: string;
};

export type ApiErrorOptions = {
  status: number;
  code: string;
  message: string;
  fields?: ApiErrorField[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: ApiErrorField[];

  constructor({ status, code, message, fields }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}
