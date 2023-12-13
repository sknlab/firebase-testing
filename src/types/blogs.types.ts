export type CreateArticleType = {
  user_uid: string;
  user_email: string;
  title: string;
  description: string;
  date?: string;
};

export type ArticleProps = {
  doc_id: string;
  user_email?: string;
  user_uid?: string;
  title: string;
  description: string;
  createdAt?: string;
  date?: string;
  likes?: string[];
};

export type LikesProps = {
  array: string[];
  doc_id: string;
};
