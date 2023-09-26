package com.haru.ppobbi.global.error.mmlog;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Getter
@Setter
@ConfigurationProperties("notification.mattermost")
public class MatterMostProperties {
    private boolean enabled;
    private String webhookUrl;
    private String fallback;
    private String authorName;
    private String authorIcon;

    private String pretext = "@quso12358 @rabbit1999k @sunhee3859 안녕하세요?";
    private String title;
    private String color = "#00d1d1";
    private String text;
    private String footer = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
}
