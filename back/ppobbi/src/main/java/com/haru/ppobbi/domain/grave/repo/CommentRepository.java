package com.haru.ppobbi.domain.grave.repo;

import com.haru.ppobbi.domain.grave.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
