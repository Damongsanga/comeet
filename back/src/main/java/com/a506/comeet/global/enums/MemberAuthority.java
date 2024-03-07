package com.a506.comeet.global.enums;

public enum MemberAuthority {
    USER("user"), ADMIN("admin");

    private String value;

    MemberAuthority(String value) {
        this.value = value;
    }
}
