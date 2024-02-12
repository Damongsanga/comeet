import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Video from "../../assets/img/video.png";
import Audio from "../../assets/img/audio.png";
import Lock from "../../assets/img/lock.png";
import {
  LockClosedIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { ROOM_CONSTRAINTS } from "models/Enums.type";

interface IProps {
  setSortByLatest: React.Dispatch<React.SetStateAction<boolean>>;
  sortByLatest: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxCountHandler: (maxcount: number) => void;
  setRoomOption: (option: ROOM_CONSTRAINTS) => void;
}

export default function FilterMenu({
  setSortByLatest,
  sortByLatest,
  setPage,
  maxCountHandler,
  setRoomOption,
}: IProps) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [maxcount, setMaxcount] = useState<number>(0);
  const [option, setOption] = useState<ROOM_CONSTRAINTS>("FREE");
  useEffect(() => {
    setPage(0);
    if (isMuted && !isVideoOff) {
      setOption("VIDEOONMICOFF");
      return;
    }
    if (isMuted) {
      setOption("MICOFF");
      return;
    } else if (!isVideoOff) {
      setOption("VIDEOON");
      return;
    } else {
      setOption("FREE");
      return;
    }
  }, [isLocked, isMuted, isVideoOff, maxcount]);

  useEffect(() => {
    maxCountHandler(maxcount);
  }, [maxcount]);

  useEffect(() => {
    setRoomOption(option);
  }, [option]);

  const maxcountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxcount(Number(e.target.value));
  };

  return (
    <Wrapper>
      <SortButton onClick={() => setSortByLatest(!sortByLatest)}>
        {sortByLatest ? "최신순" : "오래된순"}
      </SortButton>
      <SearchOptionContainer>
        <CheckBoxContainer>
          <Title>방 기본 설정</Title>
          {/* TODO: 체크박스 커스텀하기 */}
          <CheckBoxOption>
            <CheckBox>
              <LockClosedIcon className="w-5 h-5" />
              <input
                type="checkbox"
                checked={isLocked}
                onChange={() => setIsLocked(!isLocked)}
              />
            </CheckBox>
            <CheckBox>
              <SpeakerWaveIcon className="w-5 h-5" />
              <input
                type="checkbox"
                checked={isMuted}
                onChange={() => setIsMuted(!isMuted)}
              />
            </CheckBox>
            <CheckBox>
              <VideoCameraIcon className="w-5 h-5" />
              <input
                type="checkbox"
                checked={isVideoOff}
                onChange={() => setIsVideoOff(!isVideoOff)}
              />
            </CheckBox>
          </CheckBoxOption>
        </CheckBoxContainer>

        <RangeWrapper>
          <Title>최대인원 설정</Title>
          <RangeContainer>
            <input type="range" onChange={maxcountHandler} value={maxcount} />
            {maxcount}
          </RangeContainer>
        </RangeWrapper>
      </SearchOptionContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-col
items-center
fixed
space-y-10
w-52
`;

const SearchOptionContainer = tw.div`
w-full
bg-gray-50
border-[1px]
border-slate-200
rounded-md
shadow-sm
flex
flex-col
items-center
divide-y
divide-slate-200
overflow-hidden
`;

const Img = tw.img`
w-5
`;

const CheckBox = tw.div`
flex
items-center
space-x-2
`;

const CheckBoxContainer = tw.div`
p-6
w-full
flex
flex-col
gap-3
`;

const RangeContainer = tw.div`
flex
gap-2
w-full
`;
const CheckBoxOption = tw.div`
flex
gap-3
`;
const Title = tw.div`
font-bold
`;

const RangeWrapper = tw.div`
w-full
p-6
`;

const SortButton = tw.button`
w-full
p-2
border-2
border-gray-300
rounded-md
bg-gray-200
hover:bg-gray-500
hover:text-white
transition
`;
