package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.CommentRequestDto;
import com.haru.ppobbi.domain.grave.entity.Comment;
import com.haru.ppobbi.domain.grave.repo.CommentRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    @Override
    public Comment registComment(CommentRequestDto commentRequestDto) {
        // commenter 찾기
        Optional<User> commenter = userRepository.findById(commentRequestDto.getUserNo());
        // commenter가 존재할 경우 comment 등록
        if(commenter.isPresent()) {
            Comment comment = Comment.builder()
                    .user(commenter.get())
                    .graveNo(commentRequestDto.getGraveNo())
                    .commentContent(commentRequestDto.getCommentContent()).build();
            return commentRepository.save(comment);
        }
        // comment가 없을 경우 null 반환
        return null;
    }

    @Override
    public List<Comment> selectComments(Integer graveNo) {
        return commentRepository.findAllByGraveNoAndCanceled(graveNo, BaseConstant.NOTCANCELED);
    }

    @Override
    public void deleteComment(Integer commentNo) {
        commentRepository.deleteById(commentNo);
    }
}
