package com.haru.ppobbi.global.error.mmlog;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.haru.ppobbi.global.error.mmlog.MatterMostMessageDto.*;

@Component
@RequiredArgsConstructor
public class MatterMostSender {
    private final RestTemplate restTemplate;
    private final MatterMostProperties matterMostProperties;

    public void sendMessage(Exception exception, String url, String params){
        if(!matterMostProperties.isEnabled()){ // property 설정이 꺼져있을 경우 알림 금지
            return;
        }
        try{
            Attachments attachments = new Attachments();
            // attachment 만들기
            Attachment attachment = Attachment.builder()
                    .fallback(matterMostProperties.getFallback())
                    .pretext(matterMostProperties.getPretext())
                    .authorName(matterMostProperties.getAuthorName())
                    .authorIcon(matterMostProperties.getAuthorIcon())
                    .color(matterMostProperties.getColor())
                    .footer(matterMostProperties.getFooter()).build();
            attachment.setText(exception, url, params);
            attachments.addAttachment(attachment);
            // props 만들기
            attachments.addProps(exception);
            String payload = attachments.getJson();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(matterMostProperties.getWebhookUrl(), entity, String.class);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

}
