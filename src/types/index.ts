export interface IArticle {
  id: number,
  title: string,
  context: string,
  createdAt: string,
  views: number,
  updatedAt: string,
  publishedAt: string
  cover: {
    url: string
  }
}

export interface IBlog {
  id: number,
  documentId: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  title: string,
  slug: string,
  views: number,
  owner: string,
  image: {
    url: string
    id: number
  },
  description: string,
  author: IAuthor | null
}

export interface IAuthor {
  id: number,
  username: string,
  email: string,
  userId: number,
  blogs: IBlog[] | null,
  image: string | null
}

// Auth API user payload returned from /auth/* endpoints
export interface IAuthUser {
  id: number,
  documentId: string,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
}