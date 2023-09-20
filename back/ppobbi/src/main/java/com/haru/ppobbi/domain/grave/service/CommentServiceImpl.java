package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.constant.CommentResponseMessage;
import com.haru.ppobbi.domain.grave.dto.CommentRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.CommentResponseDto.CommentInfoDto;
import com.haru.ppobbi.domain.grave.entity.Comment;
import com.haru.ppobbi.domain.grave.repo.CommentRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    @Override
    public Comment registComment(String userId, RegistRequestDto registRequestDto) {
        // commenter 찾기
        Optional<User> commenter = userRepository.findUserByUserIdAndCanceled(userId, BaseConstant.NOTCANCELED);
        // commenter가 존재할 경우 comment 등록
        if(commenter.isPresent()) {
            Comment comment = Comment.builder()
                    .user(commenter.get())
                    .graveNo(registRequestDto.getGraveNo())
                    .commentContent(registRequestDto.getCommentContent()).build();
            return commentRepository.save(comment);
        }else{
            throw new NotFoundException(CommentResponseMessage.CREATE_FAIL_NO_USER.message());
        }
    }

    @Override
    public List<CommentInfoDto> selectComments(Integer graveNo) {
        List<Comment> commentList = commentRepository.findAllByGraveNoAndCanceled(graveNo, BaseConstant.NOTCANCELED);
        return commentList.stream()
                .map(CommentInfoDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(Integer commentNo) {
        Comment comment = commentRepository.findCommentByCommentNoAndCanceled(commentNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(CommentResponseMessage.DELETE_FAIL.message()));
        comment.setCanceled(BaseConstant.CANCELED);
        commentRepository.save(comment);
    }
}
