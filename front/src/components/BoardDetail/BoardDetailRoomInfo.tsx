import React from "react";

import tw from "tailwind-styled-components";

import PoepleNumImg from "assets/img/people-num.svg";
import RoomImg from "assets/img/room-default.png";

type RoomInfoProps = {
  roomTitle: string;
  roomDescription: string;
  roomMCount: number;
  roomCapacity: number;
  roomLink: string | null;
  roomId: number;
};
// export const BoardDetailRoomInfo: React.FC<{ roomId: string }> = (props) => {
export const BoardDetailRoomInfo: React.FC<{
  roomTitle: string;
  roomDescription: string;
  roomMCount: number;
  roomCapacity: number;
  roomLink: string | null;
  roomId: number;
}> = (props: RoomInfoProps) => {
  //방 ID로 방 조회해서 가져올 것들
  //방 제목

  //방 링크 이것도 제대로 만들어야 할 것 같다.
  const roomLink = `${process.env.REACT_APP_API_SERVER_URL}/room/${props.roomId}`;

  //이미지도 가져오고

  return (
    <RoomHyper>
      <TotalContainer>
        <RoomImgContainer src={RoomImg} alt="" />
        <RoomInfo>
          <TitleAndNumContainer>
            <RoomTitle>{props.roomTitle}</RoomTitle>
            <RoomPeople>
              <PeopleImg src={PoepleNumImg} alt="" />
              <RoomPeopleNum>
                {props.roomMCount} / {props.roomCapacity}{" "}
              </RoomPeopleNum>
            </RoomPeople>
          </TitleAndNumContainer>
          <RoomEx>{props.roomDescription}</RoomEx>

          <RoomHyperLink>{roomLink}</RoomHyperLink>
        </RoomInfo>
      </TotalContainer>
    </RoomHyper>
  );
};

//전체를 링크로 구성
const RoomHyper = tw.div`
`;

//전체 컨테이너
const TotalContainer = tw.div`
flex
mx-10
mt-10
rounded-lg
break-words
bg-[#1F1C29]
`;

//룸 이미지 컨테이너인데 h-70으로 설정해뒀는데
//룸 설명이 길어져서 전체 컨테이너가 70보다 길어지면 밑에가 뜬다
//몇 줄 이상은 말줄임표로 구성한뒤 h 조절 필요
const RoomImgContainer = tw.img`
rounded-l-lg
w-40
min-h-70
object-cover
`;

//이미지 제외 모든 정보
const RoomInfo = tw.div`
flex
flex-col
w-full
p-7
space-y-5
`;

//제목과 인원수 컨테이너
const TitleAndNumContainer = tw.div`
flex
w-full

`;

//방 제목
const RoomTitle = tw.div`
flex
flex-grow
text-xl
font-bold
`;

//인원수 아이콘 + 인원수
const RoomPeople = tw.div`
flex
items-center
`;

//인원수 아이콘 이미지
const PeopleImg = tw.img`
w-6
h-6
mr-1
`;

//인원수
const RoomPeopleNum = tw.div`
items-end
`;

//방 설명
const RoomEx = tw.div`
text-gray-400
`;

//진짜 링크 부분
const RoomHyperLink = tw.div`
transition-colors
hover:text-blue-500
hover:border-blue-500
`;
