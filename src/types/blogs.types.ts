export type CreateArticleType = {
  user_uid: string;
  user_email: string;
  title: string;
  description: string;
};

export type ArticleProps = {
  doc_id: string;
  user_email?: string;
  user_uid?: string;
  title: string;
  description: string;
};
