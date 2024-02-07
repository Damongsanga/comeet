import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function RoomConfirm(props: any) {
  const navigate = useNavigate();
  const enterRoom = () => {
    navigate(`/room/${props.roomId}`);
  };
  return (
    <Wrapper>
      <Title> {props.title}</Title>
      <ProfileImg
        style={{
          backgroundImage: `url(
            ${
              props.roomImage &&
              (props.roomImage === "" || props.roomImage === "default_room_image_letsgo")
                ? "https://cdn1.iconfinder.com/data/icons/line-full-package/150/.svg-15-512.png"
                : props.roomImage
            })`,
        }}
      />
      <Description> {props.description}</Description>
      <Capacity> 최대인원: {props.capacity}</Capacity>
      <EnterButton onClick={enterRoom}>입장하기</EnterButton>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-col
w-96
h-96
p-10
space-y-4
bg-slate-200
shadow-xl
items-center
justify-between 
rounded-md 
`;

const ProfileImg = tw.div`
bg-slate-300
w-20
h-20
rounded-full
bg-cover
bg-center
`;

const Title = tw.h1`
text-xl
font-bold
mb-2
`;

const Description = tw.p`
overflow-clip
overflow-ellipsis
break-keep
line-clamp-2
font-medium
text-center
`;

const Capacity = tw.h4`
text-sm
font-medium
text-slate-500
`;

const EnterButton = tw.button`
shadow-md
w-40
h-12
rounded-md
px-4
py-2
bg-purple-600
text-white
font-semibold
hover:bg-purple-700
`;
