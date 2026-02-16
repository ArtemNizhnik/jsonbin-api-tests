import { APIRequestContext, APIResponse } from '@playwright/test';

export class BinController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBin(data: object): Promise<APIResponse> {
    return await this.request.post('/v3/b', {
      data,
    });
  }

  async getBin(id: string): Promise<APIResponse> {
    return await this.request.get(`/v3/b/${id}`);
  }

  async updateBin(id: string, data: object): Promise<APIResponse> {
    return await this.request.put(`/v3/b/${id}`, {
      data,
    });
  }

  async deleteBin(id: string): Promise<APIResponse> {
    return await this.request.delete(`/v3/b/${id}`);
  }
}
