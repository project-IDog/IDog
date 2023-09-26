package com.haru.ppobbi.global.error.mmlog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;

@Slf4j
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

            /* sb.append(jsonObject.toJSONString())
                    .append(']').append(",\"props\": {\"card\": \"").append(props.card).append("\"}")
                    .append("}");*/
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

        public void setText(Exception exception, String url, String method, String params){
            this.title = exception.getClass().getSimpleName();
            StringBuilder sb = new StringBuilder();
            sb.append("**Error Message**").append('\n').append('\n').append(exception.getMessage()).append('\n').append('\n');
            sb.append("**Error Trace**").append('\n').append('\n').append(exception.getStackTrace()[0].toString()).append('\n').append('\n');
            sb.append("**Request Url**").append('\n').append('\n').append(url).append('\n').append('\n');
            sb.append("**Request Method**").append('\n').append('\n').append(method).append('\n').append('\n');
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
            log.debug("{}", (Object) e.getStackTrace()[0]);

            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String converted = sw.toString().replaceAll("\r\n", " ")
                    .replaceAll("\t", " ");


            sb.append("**Stack Trace**\\n\\n").append("```");
            sb.append(converted, 0, Math.min(4000, converted.length())).append("```");

            this.card = sb.toString();
        }
    }
}
