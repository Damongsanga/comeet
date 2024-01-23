package com.a506.webrtc.stomp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class StompController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/chat/send")
    @SendTo
    public void sendMsg(@Payload Map<String, Object> data){
        System.out.println(data);

        simpMessagingTemplate.convertAndSend("/topic/" + data.get("channelId"), data);
    }
}
