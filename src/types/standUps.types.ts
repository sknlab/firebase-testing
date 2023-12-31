export type CreateStandUpType = {
  user_uid: string;
  user_email: string;
  title: string;
  description: string;
  date?: string;
};

export type StandUpProps = {
  doc_id: string;
  user_email?: string;
  user_uid?: string;
  title: string;
  description: string;
  createdAt?: string;
  date?: string;
  likes?: string[];
};
