import { randomUUID } from "crypto";
import { test as authTest, expect } from "../../fixtures/auth.fixture";
import { test as contextTest } from "../../fixtures/context.fixture";
import { mergeTests } from "@playwright/test";
import { PostRequest, PostResponse } from "../../models/jsonplaceholder-model";

const test = mergeTests(authTest, contextTest);

test.describe("POST JSONPlaceholder", () => {
  test("should create a new post", async ({
    secretHash,
    jsonPlaceholderApi,
  }) => {
    const postData: PostRequest = {
      title: "New Post",
      body: { name: "This is a new post." },
      userId: randomUUID(),
    };

    const response = await jsonPlaceholderApi.createPost(postData);
    expect(response.status()).toBe(201);

    const data: PostResponse = await response.json();

    expect(data).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      body: {
        name: expect.any(String),
      },
      userId: expect.any(String),
    });
    expect(data).toHaveProperty("id");
    expect(data.id).toBeGreaterThan(0);
    expect(data.body.name).toBe("This is a new post.");
  });
});
