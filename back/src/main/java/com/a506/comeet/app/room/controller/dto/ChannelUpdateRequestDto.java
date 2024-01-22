package com.a506.comeet.app.room.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

@Getter
public class ChannelUpdateRequestDto {

    @NotBlank
    @Size(min = 2, max = 15)
    private String name;

    public ChannelUpdateRequestDto(String name) {
        this.name = name;
    }
}
