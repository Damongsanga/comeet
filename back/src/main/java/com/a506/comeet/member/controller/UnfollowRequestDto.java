package com.a506.comeet.member.controller;

import lombok.Getter;

@Getter
public class UnfollowRequestDto {

    private String memberId;

    public UnfollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
