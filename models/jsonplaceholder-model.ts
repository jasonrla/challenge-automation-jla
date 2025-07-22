export interface PostBody {
  name: string;
}

export interface PostRequest {
  title: string;
  body: PostBody;
  userId: string;
}

export interface PostResponse extends PostRequest {
  id: number;
}
