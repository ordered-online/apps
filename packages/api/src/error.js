export class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.code = response.status;
    this.status = response.statusText;
  }

  async resolve() {
    this.response = await this.response.json();
    this.reason = this.response.reason;
    return this;
  }
}
