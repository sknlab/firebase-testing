export type LikesApiProps = {
  array: string[];
  doc_id: string;
};

export type LikesComponentProps = {
  doc_id: string;
  likesArray: string[];
  handleUpdateArticleLikes: (res: string[] | undefined) => void;
};
