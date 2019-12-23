import { ApiError } from './error';

export function status(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(
      new ApiError(
        'HTTP error, status = ' + response.status + ', ' + response.statusText,
        response
      )
    );
  }
}

export function json(response) {
  return response.json();
}

export async function resolveError(error) {
  let response = await error.resolve();
  return Promise.reject(response);
}
