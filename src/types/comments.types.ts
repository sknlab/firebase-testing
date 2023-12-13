export type CreateCommentType = {
  user_uid: string;
  user_email: string;
  article_id?: string;
  comment: string;
  date?: string;
};

export type Comment = {
  artcile_id: string;
  comment: string;
  date: string;
  doc_id: string;
  user_email: string;
  user_uid: string;
};
