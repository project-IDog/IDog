package com.haru.ppobbi.domain.grave.controller;

import static com.haru.ppobbi.domain.grave.constant.CommentResponseMessage.*;

import com.haru.ppobbi.domain.grave.dto.CommentRequestDto.RegistRequestDto;
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
    public ResponseEntity<ResponseDto<?>> registComment(@RequestBody RegistRequestDto registRequestDto){
        Comment comment = commentService.registComment(registRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<?>> getComments(@PathVariable Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, commentService.selectComments(graveNo)));
    }

    @DeleteMapping("/{commentNo}")
    public ResponseEntity<ResponseDto<?>> deleteComment(@PathVariable Integer commentNo){
        commentService.deleteComment(commentNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(DELETE_SUCCESS));
    }
}
