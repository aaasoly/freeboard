import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./CommentList.styles";
import { IBoardCommentListUIProps } from "./CommentList.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIProps
) {
  return (
    <div>
      {props.isOpenDeleteModal && (
        <Modal
          visible={props.isOpenDeleteModal}
          onOk={props.onClickDeleteComment}
          onCancel={props.onClickCloseDeleteModal}
        >
          <div>비밀번호 입력: </div>
          <S.PasswordInput
            type="password"
            onChange={props.onChangeDeletePassword}
          />
        </Modal>
      )}
      <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
        {/* {props.data?.fetchBoardComments.map((el) => ( */}
        {props.isEdit === false && (
          <S.CommentBox
            key={props.el._id}
            id={String(props.el.writer)}
            onClick={props.onClickWriter}
          >
            <S.CommentUserIcon>
              <FontAwesomeIcon icon={faCircleUser} size="2x" />
            </S.CommentUserIcon>

            <S.CommentUnit>
              <S.CommentUnitHeader>
                <S.UserName>{props.el.writer}</S.UserName>
                <S.UserStar value={props.el?.rating} disabled></S.UserStar>
              </S.CommentUnitHeader>

              <S.CommentContents>{props.el.contents}</S.CommentContents>

              <S.CommentDate>{getDate(props.el.createdAt)}</S.CommentDate>
            </S.CommentUnit>

            <S.CommentSetting>
              <S.CommentChange>
                <EditOutlined onClick={props.onClickEdit} />
              </S.CommentChange>
              <S.CommentDelete>
                <CloseOutlined
                  id={props.el._id}
                  onClick={props.onClickOpenDeleteModal}
                />
              </S.CommentDelete>
            </S.CommentSetting>
          </S.CommentBox>
        )}
        {/* ))} */}
        {props.isEdit === true && <input type="text"></input>}
      </InfiniteScroll>
    </div>
  );
}
