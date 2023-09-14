package com.haru.ppobbi.domain.grave.controller;

import com.haru.ppobbi.domain.grave.constant.CommentResponseMessage;
import com.haru.ppobbi.domain.grave.dto.CommentRequestDto;
import com.haru.ppobbi.domain.grave.entity.Comment;
import com.haru.ppobbi.domain.grave.service.CommentService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping()
    public ResponseEntity<ResponseDto<?>> registComment(@RequestBody CommentRequestDto commentRequestDto){
        Comment comment = commentService.registComment(commentRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CommentResponseMessage.CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<List<Comment>>> getComments(@PathVariable Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CommentResponseMessage.READ_SUCCESS, commentService.selectComments(graveNo)));
    }

    @DeleteMapping("/{commentNo}")
    public ResponseEntity<ResponseDto<?>> deleteComment(@PathVariable Integer commentNo){
        commentService.deleteComment(commentNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CommentResponseMessage.DELETE_SUCCESS));
    }
}
