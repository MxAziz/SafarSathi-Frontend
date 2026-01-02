/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IInputErrorState {
  success: boolean;
  errors?: {
    field: string;
    message: string;
  }[];
  data?: Record<string, any>;
  message?: string;
  error?: string;
}

export function getInputFieldError(
  fieldName: string,
  state: IInputErrorState | null | undefined
) {
  if (state?.errors?.length) {
    const error = state.errors.find((err) => err.field === fieldName);
    return error?.message || null;
  }
  return null;
}