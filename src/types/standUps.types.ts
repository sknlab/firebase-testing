import { Timestamp } from "firebase/firestore";

export type CreateStandUpType = {
  user_uid?: string;
  user_email?: string;
  todaysPlan?: string;
  blockers?: string;
  questions?: string;
  previousPlanAccomplished?: string;
  previousPlanExceeded?: string;
  date?: string;
  createdAt?: Timestamp;
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
