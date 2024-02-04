import React, { useState, useRef } from "react";

import useOutsideClick from "hooks/useOutsideClick";

import tw from "tailwind-styled-components";

import ProifleImg from "assets/img/test-user.jpeg";
import ProifleModify from "assets/img/profile-modify.svg";
import CarmeraImg from "assets/img/carmera.svg";
import EditPencil from "assets/img/edit-pencil.svg";
import Modal from "components/Common/Modal";

export const MyProfile = () => {
  //임시 데이터들
  const followingNum = 152;
  const followerNum = 20;
  const nickName = "망곰이";
  const message = "프론트엔드 지망생입니다! 잘 부탁드려용";
  const url = "http://github.com/mangmang";
  const recentTime = "2024-01-23";

  //프로필 사진 마우스 오버로 바꾸기
  const [isHovering, setIsHovering] = useState<boolean>(false);

  //프로필 변경 이미지 클릭시
  const [isModifyImg, setIsModifyImg] = useState<boolean>(false);
  //팔로잉, 팔로워 클릭시
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);

  const followerModalHandler = () => {
    setFollowerModal(!followerModal);
  };
  const followingModalHandler = () => {
    setFollowingModal(!followingModal);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleModifyImg = () => {
    setIsModifyImg(!isModifyImg);
  };

  const handleModifyImgFalse = () => {
    setIsModifyImg(false);
  };

  const modifyImgRef = useRef(null);
  useOutsideClick<HTMLDivElement>(modifyImgRef, () => {
    if (isModifyImg) {
      setIsModifyImg(false);
    }
  });

  return (
    <TotalContainer>
      <ProfileModButton>
        <ProfileModImg src={ProifleModify} alt="" />
      </ProfileModButton>
      <FullContainer>
        <LeftContainer>
          <ul ref={modifyImgRef}>
            {isHovering ? (
              <StyleProfileImgHover
                style={{ backgroundImage: `url(${ProifleImg})` }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <button onClick={handleModifyImg}>
                  <StyleCarmera src={CarmeraImg} alt="" />
                </button>
              </StyleProfileImgHover>
            ) : (
              <StyleProfileImg
                style={{ backgroundImage: `url(${ProifleImg})` }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            )}
            {isModifyImg && (
              <ProfileDropdown>
                {/* 변경 클릭시 이미지 업로드 모달 나오게 하기 */}
                <DropdownButton>프로필 사진 변경</DropdownButton>
                {/* 제거 클릭시 ! 확인 모달 나오게 하기*/}
                <DropdownButton>제거</DropdownButton>
              </ProfileDropdown>
            )}
          </ul>
        </LeftContainer>
        <RightContainer>
          <FollowContainer>
            <SytleFollowing onClick={followingModalHandler}>
              {followingModal ? (
                <Modal
                  toggleModal={followingModalHandler}
                  option={"following"}
                ></Modal>
              ) : null}
              <FollowText>팔로잉</FollowText>
              <FollowNumber>{followingNum}</FollowNumber>
            </SytleFollowing>
            <StyleFllower onClick={followerModalHandler}>
              {followerModal ? (
                <Modal
                  toggleModal={followerModalHandler}
                  option={"follower"}
                ></Modal>
              ) : null}
              <FollowText>팔로워</FollowText>
              <FollowNumber>{followerNum}</FollowNumber>
            </StyleFllower>
          </FollowContainer>
          <div className="flex">
            <StyleNickName>{nickName}</StyleNickName>
            <button>
              <StyleEdit src={EditPencil} />
            </button>
          </div>

          <div className="flex">
            <StyleMessage>{message}</StyleMessage>
            <button>
              <StyleEdit src={EditPencil} />
            </button>
          </div>
          <SytleUrl>
            <StyleA href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </StyleA>
          </SytleUrl>
        </RightContainer>
      </FullContainer>
      <RecentIn>최근 접속 시간: {recentTime}</RecentIn>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
text-white
flex
flex-col
`;

//수정 버튼
const ProfileModButton = tw.button`
self-end
mb-auto
`;

//수정 버튼 이미지
const ProfileModImg = tw.img`
w-7
h-7
mr-2
mt-1
rounded-full
hover:filter
hover:invert
transition duration-300 ease-in-out
`;

//정보 수정 버튼, 접속 시간 제외한 모든 컨테이너
const FullContainer = tw.div`
flex
flex-grow
items-center

`;

//프로필 이미지 보여주는 왼쪽 컨테이너
const LeftContainer = tw.div`
    ml-16
    mr-10
`;

//프로필 이미지
const StyleProfileImg = tw.div`
bg-white
rounded-full
w-36
h-36
relative
bg-cover
bg-center
`;

//프로필 이미지 - hover 했을 때
const StyleProfileImgHover = tw.div`
bg-white
rounded-full
w-36
h-36
bg-cover
bg-center
opacity-80
relative
`;

// hover 했을 때 뜨는 카메라 아이콘
const StyleCarmera = tw.img`
absolute
top-1/2
left-1/2
transform
-gpu
translate-x-[-50%]
translate-y-[-50%]
w-8
h-8
`;

//카메라 클릭 후 나오는 드롭다운
const ProfileDropdown = tw.div`
absolute
text-black
top-[29%]

shadow-lg
z-50
rounded-md
bg-gray-100
text-base
`;

//드롭다운버튼들...
const DropdownButton = tw.div`
rounded-md
w-44
px-4
py-2
cursor-pointer
transition-colors
hover:bg-gray-300
`;

//팔로잉, 팔로우, 닉네임, 메세지, url 들어있는 오른쪽 컨테이너
const RightContainer = tw.div`
flex
flex-col
justify-center

`;

//팔로잉, 팔로우 나타내는 컨테이너
const FollowContainer = tw.div`
flex
space-x-4
mb-2
`;

//팔로잉
const SytleFollowing = tw.div`
flex
transition-colors
hover:text-blue-500
hover:border-blue-500
cursor-pointer
`;

//팔로우
const StyleFllower = tw.div`
transition-colors
hover:text-blue-500
hover:border-blue-500
cursor-pointer
flex`;

//팔로잉, 팔로우 글씨
const FollowText = tw.div`
text-base
mr-2
`;

//팔로잉, 팔로우 숫자
const FollowNumber = tw.div`
font-semibold
text-base
`;

//닉네임
const StyleNickName = tw.div`
font-extrabold
text-3xl
mb-2
`;

const StyleEdit = tw.img`
ml-1
w-4
h-4
hover:filter
hover:invert
transition duration-300 ease-in-out
`;

//메세지
const StyleMessage = tw.div`
text-base
mb-2
`;

//url
const SytleUrl = tw.div`
text-base

`;

//url의 A태그
const StyleA = tw.a`
border-b
transition-colors
hover:text-blue-500
hover:border-blue-500
`;

//최근 접속 시간
const RecentIn = tw.div`
self-end
text-sm
pb-3
pr-3
text-[#9E9E9E]
`;
