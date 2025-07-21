import { APIRequestContext } from "@playwright/test";
import { PostRequest } from "../models/jsonplaceholder-model";

const baseUrl = process.env.JSON_PLACEHOLDER_BASE_URL;
if (!baseUrl) {
  throw new Error(
    "JSON_PLACEHOLDER_BASE_URL environment variable is required."
  );
}

export class JsonPlaceholderApi {
  constructor(private request: APIRequestContext) {}

  async createPost(postData: PostRequest) {
    return await this.request.post(`${baseUrl}/posts`, { data: postData });
  }
}
