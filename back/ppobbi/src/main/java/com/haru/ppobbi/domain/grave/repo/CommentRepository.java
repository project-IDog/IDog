package com.haru.ppobbi.domain.grave.repo;

import com.haru.ppobbi.domain.grave.entity.Comment;
import com.haru.ppobbi.global.constant.BaseConstant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    /**
     * graveNo를 조건으로 하는 Comment 조회
     * @author Geon
     * @param graveNo 조회할 Grave 기본 키
     * @param canceled 삭제 여부
     * @return {@code List<Comment>}
     */
    public List<Comment> findAllByGraveNoAndCanceled(Integer graveNo, Integer canceled);
}
