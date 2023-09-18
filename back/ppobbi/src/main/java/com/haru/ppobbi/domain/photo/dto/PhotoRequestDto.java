package com.haru.ppobbi.domain.photo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PhotoRequestDto {
    private Integer dogNo;
    private String photoUrl;
    private String photoComment;
}
