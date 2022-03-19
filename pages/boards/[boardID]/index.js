import { PostUserIcon, PostInfo,Btn, BtnGroup, CommentBox, CommentChange, CommentDate, CommentContents, CommentDelete, UserName, CommentDetail, CommentHeader, CommentSetting, CommentWrapper, CommentInput, UserInput, UserInfo, CreateComment, Dislikebtn, LDbtns, Likebtn, PostBody, HeaderLeft, PostHeader, PostVideo, PostPictuer, PostText, PostTitle, PostDate, PostWrapper, CommentUserIcon, Wrapper, PostUser, HeaderIcon, LinkIcon, LocaIcon } from '../../../styles/board'
import { useQuery, gql } from "@apollo/client"
import { Router, useRouter } from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faLink, faLocationDot, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
// import { faLocationDot } from '@fortawesome/free-regular-svg-icons'

const FETCH_BOARD = gql`
  query fetchBoard($number: Int){
    fetchBoard(number:$number){
      number
      writer
      title
      contents
      createdAt
    }
  }
`

export default function BoardDetail() {

  const router = useRouter()

  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number)}
  })

  return (

    <Wrapper>
      <PostWrapper>
        <PostHeader>
          <HeaderLeft>
            <PostUserIcon><FontAwesomeIcon icon={faCircleUser} size="3x"/></PostUserIcon>
            <PostInfo>
              <PostUser>{data ? data.fetchBoard.writer : "loading..."}</PostUser>
              <PostDate>Date : {data? data.fetchBoard.createdAt : "loading..."}</PostDate>
            </PostInfo>
          </HeaderLeft>
          <HeaderIcon>
            <LinkIcon><FontAwesomeIcon icon={faLink} size="2x"/></LinkIcon>
            <LocaIcon><FontAwesomeIcon icon={faLocationDot} size="2x"/></LocaIcon>
          </HeaderIcon>
        </PostHeader>

        <PostBody>
          <PostTitle>{data? data.fetchBoard.title : "loading"}</PostTitle>
          <PostPictuer src="/image.png"></PostPictuer>
          <PostText>{data? data.fetchBoard.contents : "loading"}</PostText>
          <PostVideo></PostVideo>

          <LDbtns>
            <Likebtn><FontAwesomeIcon icon={faThumbsUp} /></Likebtn>
            <Dislikebtn><FontAwesomeIcon icon={faThumbsDown} /></Dislikebtn>
          </LDbtns>
        </PostBody>
      </PostWrapper>

      <BtnGroup>
          <Btn>목록으로</Btn>
          <Btn>수정하기</Btn>
          <Btn>삭제하기</Btn>
        </BtnGroup>

      <CommentWrapper>
        <CommentHeader>댓글</CommentHeader>
        <CreateComment>
          <UserInfo>
            <UserInput type="text" placeholder="작성자"></UserInput>
            <UserInput type="password" placeholder="비밀번호"></UserInput>
          </UserInfo>
          <CommentInput type="text" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다"></CommentInput>
        </CreateComment>

          <CommentBox>
            <CommentUserIcon><FontAwesomeIcon icon={faCircleUser} /></CommentUserIcon>

            <CommentSetting>
              <CommentChange></CommentChange>
              <CommentDelete></CommentDelete>
            </CommentSetting>

            <CommentDetail>
              <UserName>노원두</UserName>
              <CommentContents>진짜 유익하고 정말 필요한 정보인 것 같아요~! 앞으로도 좋은 정보 부탁드립니다~!</CommentContents>
              <CommentDate>2021.02.22</CommentDate>
            </CommentDetail>
          </CommentBox>
      </CommentWrapper>

    </Wrapper>


  )
}