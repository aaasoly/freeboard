import { useMutation } from "@apollo/client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import BoardCommentWriteUI from "./BoardComment.presenter";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardComment.queries";
import { FETCH_BOARD_COMMENTS } from "../list/CommentList.queries";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";

export default function BoardCommentWrite(props) {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };
  const onChangeStar = (value: number) => {
    setStar(value);
  };
  // const onChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };
  // 댓글 등록 버튼
  const onClickCreateComment = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: String(router.query.boardId),
          // 게시글에 달린 댓글이기 때문에 boardId
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      alert("댓글이 등록되었습니다.");
      // router.push(`${router.query.boardId}`);
      setWriter("");
      setPassword("");
      setContents("");
      // state 이용해서 입력버튼 클릭 후 input 창 비워주기(state가 input창에 바인딩 된 상태)
    } catch (error) {
      alert(error.message);
    }
  };

  // update comment
  // const [isEdit, setIsEdit] = useState(false);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

  // const onClickMoveToUpdate = () => {
  //   props.setIsEdit(true);
  //   console.log("true");
  // };

  const onClickUpdate = async (event) => {
    console.log("111");
    if (!contents) {
      alert("내용이 수정되지 않았었니다");
      return;
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      if (!props.el?._id) return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput: { contents: contents },
          password: password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      props.setIsEdit?.(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <BoardCommentWriteUI
        onClickCreateComment={onClickCreateComment}
        onChangeWriter={onChangeWriter}
        onChangePassword={onChangePassword}
        onChangeContents={onChangeContents}
        // onChangeRating={onChangeRating}
        onChangeStar={onChangeStar}
        // state를 props로 넘겨주기 > 제어 컴포넌트 만들기
        contents={contents}
        writer={writer}
        password={password}
        onClickUpdate={onClickUpdate}
        el={props.el}
        isEdit={props.isEdit}
        // onClickMoveToUpdate={onClickMoveToUpdate}
      />
    </div>
  );
}
