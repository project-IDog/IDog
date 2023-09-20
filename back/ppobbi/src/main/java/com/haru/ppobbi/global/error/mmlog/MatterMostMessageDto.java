package com.haru.ppobbi.global.error.mmlog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;

public class MatterMostMessageDto {
    @Getter
    @NoArgsConstructor
    public static class Attachments{
        private Props props;
        private Attachment attachment;

        public void addAttachment(Attachment attachment){
            this.attachment = attachment;
        }

        public void addProps(Exception e){
            this.props = new Props(e);
        }

        public String getJson(){
            StringBuilder sb = new StringBuilder("{\"attachments\":[");
            HashMap<String, String> map = new HashMap<>();
            map.put("fallback", attachment.getFallback());
            map.put("pretext", attachment.getPretext());

            map.put("author_name", attachment.getAuthorName());
            map.put("author_icon", attachment.getAuthorIcon());

            map.put("title", attachment.getTitle());
            map.put("color", attachment.getColor());
            map.put("text", attachment.getText());
            map.put("footer", attachment.getFooter());

            JSONObject jsonObject = new JSONObject(map);

            sb.append(jsonObject.toJSONString()).append("]}");
            return sb.toString();
        }
    }


    @Getter
    @Builder
    @AllArgsConstructor
    public static class Attachment{
        private String fallback;
        private String pretext;
        private String authorName;
        private String authorIcon;

        private String title;
        private String color;
        private String text;
        private String footer;

        public void setText(Exception exception, String url, String params){
            this.title = exception.getClass().getSimpleName();
            StringBuilder sb = new StringBuilder();
            sb.append("**Error Message**").append('\n').append('\n').append(exception.getMessage()).append('\n').append('\n');
            sb.append("**Request Url**").append('\n').append('\n').append(url).append('\n').append('\n');
            sb.append("**Parameters**").append('\n').append('\n').append(params).append('\n').append('\n');
            this.text = sb.toString();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Props{
        private String card;

        public Props(Exception e){
            StringBuilder sb = new StringBuilder();

            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));

            sb.append("**Stack Trace**").append("/n/n").append("```");
            sb.append(sw.toString(), 0, Math.min(4000, sw.toString().length())).append("/n.../n/n");

            this.card = sb.toString();
        }
    }
}
