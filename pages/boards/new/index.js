import { 
  Container, 
  MainTitle, 
  User, 
  UserInfo, 
  Title,
  Contents,
  Item, 
  Blank, 
  MainContents, 
  Post, 
  PostBlank, 
  PostSearch, 
  Address,
  AddressBlank,
  Youtube,
  Picture, 
  Upload,
  PicAttach, 
  Select, 
  Setting,
  Radio, 
  RadioLabel,
  BtnSubmit,
  Error
} from '../../../styles/new'
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`

export default function WritePost() {
  const router = useRouter()

  const [ name, setName ] = useState("")
  const [ nameError, setNameError ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ passwordError, setPasswordError ] = useState("")
  const [ title, setTitle ] = useState("")

  const [ titleError, setTitleError ] = useState("")
  const [ contents, setContents ] = useState("")
  const [ contentsError, setContentsError ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ addressError, setAddressError ] = useState("")

  const [createBoard] = useMutation(CREATE_BOARD);

  function onChangeName(event) {
    setName(event.target.value)
  }
  function onChangePassword(event) {
    setPassword(event.target.value)
  }
  function onChangeTitle(event) {
    setTitle(event.target.value)
  }
  function onChangeContents(event) {
    setContents(event.target.value)
  }
  function onChangeAddress(event) {
    setAddress(event.target.value)
  }

  const onClickSubmit = async () => {

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: name,
            password: password,
            title: title,
            contents: contents
          }
        }
      })
    if( name === "") {
      setNameError("이름을 적어주세요")
    } else {
      setNameError("")
    }
    if( password === "") {
      setPasswordError("비밀번호를 적어주세요")
    } else {
      setPasswordError("")
    }
    if( title === "") {
      setTitleError("비밀번호를 적어주세요")
    } else {
      setTitleError("")
    }
    if( contents === "") {
      setContentsError("내용을 적어주세요")
    } else {
      setContentsError("")
    }
    if( address === "") {
      setAddressError("주소를 적어주세요")
    } else {
      setAddressError("")
    }
    if(name !== "" && password !== "" && title !== "" && contents !== "") {
      alert("게시물 등록에 성공하였습니다!")
    }
      router.push(`/boards/${result.data.createBoard._id}`)
      } catch(error) {
        console.log(error.message)
      }
}


  return (

    <Container>
      <MainTitle>게시물 등록</MainTitle>

      <User>
        <UserInfo>
          <Item>작성자</Item>
          <Blank type="text" placeholder='이름을 적어주세요.' onChange={onChangeName} />
          <Error>{nameError}</Error>
        </UserInfo>
        <UserInfo>
          <Item>비밀번호</Item>
          <Blank type="password" placeholder='비밀번호를 입력하세요.' onChange={onChangePassword} />
          <Error>{passwordError}</Error>
        </UserInfo>
      </User>

      <Title>
        <Item>제목</Item>
        <Blank type="text" placeholder='제목을 작성해주세요.' onChange={onChangeTitle} />
        <Error>{titleError}</Error>
      </Title>

      <Contents>
        <Item>내용</Item>
        <MainContents type="text" placeholder='내용을 작성해주세요.' onChange={onChangeContents} />
        <Error>{contentsError}</Error>
      </Contents>

      <Address>
        <Item>주소</Item>
        <Post>
          <PostBlank type="text" placeholder='07250' />
          <PostSearch>우편번호 검색</PostSearch>
        </Post>
            <AddressBlank type="text" onChange={onChangeAddress} />
            <AddressBlank type="text" onChange={onChangeAddress} />
        <Error>{addressError}</Error>
      </Address>

      <Youtube>
        <Item>유튜브</Item>
        <Blank type="text" placeholder='링크를 복사해주세요.'/>
      </Youtube>

      <Picture>
        <Item>사진첨부</Item>
        <Upload>
          <PicAttach>+<br/>Upload</PicAttach>
          <PicAttach>+<br/>Upload</PicAttach>
          <PicAttach>+<br/>Upload</PicAttach>
        </Upload>
      </Picture>

      <Setting>
        <Item>메인 설정</Item>
        <Select>
          <Radio type="radio" name="setting" /><RadioLabel>유튜브</RadioLabel>
          <Radio type="radio" name="setting" /><RadioLabel>사진</RadioLabel>
        </Select>
      </Setting>

      <BtnSubmit onClick={onClickSubmit}>등록하기</BtnSubmit>


    </Container>


  )

}