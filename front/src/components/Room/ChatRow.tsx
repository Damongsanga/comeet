import MarkdownRenderer from "components/MarkdownRenderer";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

interface IProps {
  chat: any;
}

export default function ChatRow({ chat }: IProps) {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/userpage/${chat.memberId}`);
  };

  return (
    <ChatRowContainer>
      <ProfileImg
        onClick={navigateToProfile}
        style={{
          backgroundImage: `url(
            ${chat.profileImage})`,
        }}
      />
      <Info>
        <WriterRow>
          <Writer onClick={navigateToProfile}>{chat.nickname}</Writer>
          <SendAt>{chat.createdAt.slice(0, 21)}</SendAt>
        </WriterRow>
        <MarkdownContainer>
          <MarkdownRenderer raw={chat.message} />
        </MarkdownContainer>
      </Info>
    </ChatRowContainer>
  );
}

const ChatRowContainer = tw.div`
w-full
min-h-10
flex
space-x-4
`;

const Info = tw.div`
flex
flex-col
space-y-2
flex-grow-[1]
`;

const WriterRow = tw.div`
flex
items-center
space-x-4
`;

const ProfileImg = tw.div`
bg-slate-200
w-10
h-10
min-w-10
min-h-10
rounded-full
bg-cover
bg-center
cursor-pointer
`;

const Writer = tw.h1`
text-md
font-semibold
cursor-pointer
`;

const SendAt = tw.p`
text-xs
text-slate-300/50
`;

const MarkdownContainer = tw.pre`
font-light
text-wrap
text-sm
`;
