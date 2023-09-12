package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.CommentRequestDto;
import com.haru.ppobbi.domain.grave.entity.Comment;

import java.util.List;

public interface CommentService {
    /**
     * CommentRequestDto 객체를 받아 등록
     * @author Geon
     * @param commentRequestDto 등록할 CommentRequestDto 객체
     * @return Comment
     */
    public Comment registComment(CommentRequestDto commentRequestDto);

    /**
     * graveNo를 받아 Comment 조회
     * @author Geon
     * @param graveNo 조회할 Grave 기본 키
     * @return {@code List<Comment>}
     */
    public List<Comment> selectComments(Integer graveNo);

    /**
     * commentNo를 받아 Comment 삭제
     * @param commentNo 삭제할 Comment 기본 키
     */
    public void deleteComment(Integer commentNo);
}
