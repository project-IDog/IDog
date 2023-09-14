package com.haru.ppobbi.domain.photo.controller;

import static com.haru.ppobbi.domain.photo.constant.PhotoResponseMessage.*;

import com.haru.ppobbi.domain.photo.constant.PhotoResponseMessage;
import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto;
import com.haru.ppobbi.domain.photo.entity.Photo;
import com.haru.ppobbi.domain.photo.service.PhotoService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photo")
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping()
    public ResponseEntity<ResponseDto<?>> registPhoto(@RequestBody PhotoRequestDto photoRequestDto){
        Photo photo = photoService.registPhoto(photoRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/user/{userNo}")
    public ResponseEntity<ResponseDto<List<Photo>>> getAllAlbum(@PathVariable Integer userNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhotosByUserNo(userNo)));
    }

    @GetMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<Photo>> getPhotoInfo(@PathVariable Integer photoNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhoto(photoNo)));
    }

    @DeleteMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<?>> deletePhoto(@PathVariable Integer photoNo){
        photoService.deletePhoto(photoNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(DELETE_SUCCESS));
    }

    @GetMapping("/dog/{dogNo}")
    public ResponseEntity<ResponseDto<List<Photo>>> getAlbum(@PathVariable Integer dogNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhotosByDogNo(dogNo)));
    }

    @PutMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<?>> updatePhotoGoat(@PathVariable Integer photoNo){
        photoService.setGoatPhoto(photoNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(UPDATE_SUCCESS));
    }
}
