export type ApiSuccess<T> = Readonly<{
  data: T;
  meta?: Record<string, unknown>;
  success: true;
}>;

export type ApiFailure = Readonly<{
  error: Readonly<{
    code: string;
    details?: readonly Readonly<{ field: string; message: string }>[];
    message: string;
  }>;
  success: false;
}>;

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;
