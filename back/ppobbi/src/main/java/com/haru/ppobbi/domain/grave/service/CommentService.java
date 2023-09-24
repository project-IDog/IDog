package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.CommentRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.CommentResponseDto.CommentInfoDto;
import com.haru.ppobbi.domain.grave.entity.Comment;

import java.util.List;

public interface CommentService {
    /**
     * CommentRequestDto 객체를 받아 등록
     * @author Geon
     * @param userNo 작성자 id
     * @param registRequestDto 등록할 CommentRequestDto 객체
     * @return Comment
     */
    public Comment registComment(Integer userNo, RegistRequestDto registRequestDto);

    /**
     * graveNo를 받아 Comment 조회
     * @author Geon
     * @param graveNo 조회할 Grave 기본 키
     * @return {@code List<Comment>}
     */
    public List<CommentInfoDto> selectComments(Integer graveNo);

    /**
     * commentNo를 받아 Comment 삭제
     * @param commentNo 삭제할 Comment 기본 키
     */
    public void deleteComment(Integer commentNo);
}
