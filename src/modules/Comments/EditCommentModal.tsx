import { Comment } from "../../types/comments.types";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment;
}

export const EditCommentModal: React.FC<CommentProps> = ({ isOpen, onClose, ...comment }) => {
  return <>Edit comments</>;
};
