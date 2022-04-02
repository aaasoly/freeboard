import { IBoardCommentListUIProps } from "./CommentList.types";
import BoardCommentListUIItem from "./CommentList.presenterItem";

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <>
      {props.data?.fetchBoardComments.map((el) => (
        <BoardCommentListUIItem key={el._id} el={el} />
      ))}
    </>
  );
}
