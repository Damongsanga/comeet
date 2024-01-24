import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function Chat({ channelId, username }) {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = useRef(null);

  useEffect(() => {
    setRows([]);

    stompClient.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:5000/chatting");
      return sock;
    });

    // connect(header,연결 성공시 콜백,에러발생시 콜백)
    stompClient.current.connect(
      {},
      function () {
        //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
        stompClient.current.subscribe(`/topic/${channelId}`, function (e) {
          //e.body에 전송된 data가 들어있다
          showMessage(JSON.parse(e.body));
        });
      },
      function (e) {
        //에러 콜백
        alert("에러발생!!!!!!");
      }
    );
  }, [channelId]);

  //화면에 메시지를 표시하는 함수
  function showMessage(data) {
    setRows((prev) => [...prev, data.sender + ":" + data.contents]);
  }

  //메시지 브로커로 메시지 전송
  function send(e) {
    e.preventDefault();

    const data = {
      channelId,
      sender: username,
      contents: message,
    };
    // send(destination,헤더,페이로드)
    stompClient.current.send("/app/chat/send", {}, JSON.stringify(data));
    setMessage("");
  }

  useEffect(() => {
    const chatcontent = document.getElementById("chatcontent");
    const position = chatcontent.scrollHeight;
    chatcontent.scrollTop = position;
  }, [rows]);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContainer>
      <ChatInputContainer onSubmit={send}>
        <ChatInput onChange={onChangeMessage} value={message} />
      </ChatInputContainer>
      <ChatContentContainer id="chatcontent">
        <ChatContent>
          {rows.map((r, i) => (
            <ChatRow key={i}>{r}</ChatRow>
          ))}
        </ChatContent>
      </ChatContentContainer>
    </ChatContainer>
  );
}

const ChatContainer = tw.div`
w-full
h-full
flex
flex-col-reverse
`;

const ChatInputContainer = tw.form`
h-14
rounded-full
relative
p-2
`;

const ChatInput = tw.input`
w-full
h-full
rounded-full
text-slate-800
p-3
`;

const ChatContentContainer = tw.div`
overflow-y-scroll
h-20
flex-grow-[1]
`;

const ChatContent = tw.div`
px-4
`;

const ChatRow = tw.div`
w-full
h-10
`;
