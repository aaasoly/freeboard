import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  IQueryFetchBoardArgs,
  IQuery,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./CommentList.presenter";
import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./CommentList.queries";
import { Modal } from "antd";

export default function BoardCommentList() {
  // FETCH_COMMENTS Comments list
  const router = useRouter();
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

  const onClickWriter = (event: MouseEvent<HTMLDivElement>) => {
    alert(event.currentTarget.id + "님이 작성한 글입니다");
    // 이벤트가 있는 태그에 id값을 설정
    // 어떤 자식 태그를 클릭하더라도 상위에 있는 onClick 이벤트 실행
  };

  // infinite scrolling
  const onLoadMore = () => {
    if (!data) return; // 처음엔 data가 존재하지 않기 때문에 return 요청

    fetchMore({
      variables: { page: Math.ceil(data.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  // update comment
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = (event) => {
    setIsEdit(true);
  };

  // DELETE_COMMENTS
  const [deleteId, setDeleteId] = useState("");
  const [commentpassword, setCommentpassword] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

  const onClickDeleteComment = async () => {
    try {
      await deleteBoardComment({
        variables: {
          password: commentpassword,
          boardCommentId: deleteId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
      setDeleteId("");
      Modal.success({
        content: "댓글이 삭제되었습니다!",
      });
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  function onClickOpenDeleteModal(event: MouseEvent<HTMLDivElement>) {
    setIsOpenDeleteModal(true);
    if (event.target instanceof Element) setDeleteId(event.currentTarget.id);
  }

  function onClickCloseDeleteModal(event: MouseEvent<HTMLDivElement>) {
    setIsOpenDeleteModal(false);
  }

  function onChangeDeletePassword(event: ChangeEvent<HTMLInputElement>) {
    setCommentpassword(event.target.value);
  }

  return (
    <BoardCommentListUI
      data={data}
      onClickWriter={onClickWriter}
      onClickDeleteComment={onClickDeleteComment}
      onChangeDeletePassword={onChangeDeletePassword}
      isOpenDeleteModal={isOpenDeleteModal}
      onClickOpenDeleteModal={onClickOpenDeleteModal}
      onClickCloseDeleteModal={onClickCloseDeleteModal}
      onLoadMore={onLoadMore}
      isEdit={isEdit}
      onClickEdit={onClickEdit}
    />
  );
}
