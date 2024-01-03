export type CreateCommentType = {
  user_uid: string;
  user_email: string;
  standUp_id?: string;
  comment: string;
  date?: string;
};

export type CommentProps = {
  standUp_id?: string;
  comment: string;
  date?: string;
  doc_id: string;
  user_email?: string;
  user_uid?: string;
  likes?: string[];
};
