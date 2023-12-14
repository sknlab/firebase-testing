export type LikesApiProps = {
  array: string[];
  doc_id: string;
};

export type LikesComponentProps = {
  doc_id: string;
  likesArray: string[] | undefined;
  handleUpdateLikes: (res: string[] | undefined) => void;
};
