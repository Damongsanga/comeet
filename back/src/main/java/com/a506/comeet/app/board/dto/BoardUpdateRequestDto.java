package com.a506.comeet.app.board.dto;

import com.a506.comeet.global.enums.FreeBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardUpdateRequestDto {

    private String title;
    private String content;
    private FreeBoardCategory category;
    private Boolean isValid;
}
