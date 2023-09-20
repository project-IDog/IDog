package com.haru.ppobbi.domain.photo.controller;

import static com.haru.ppobbi.domain.photo.constant.PhotoResponseMessage.*;

import com.haru.ppobbi.domain.photo.constant.PhotoResponseMessage;
import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.photo.dto.PhotoResponseDto.PhotoInfoDto;
import com.haru.ppobbi.domain.photo.entity.Photo;
import com.haru.ppobbi.domain.photo.service.PhotoService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photo")
@Slf4j
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> registPhoto(@RequestAttribute("userId") String userId, @RequestBody RegistRequestDto registRequestDto){
        Photo photo = photoService.registPhoto(userId, registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/user/{userNo}")
    public ResponseEntity<ResponseDto<List<PhotoInfoDto>>> getAllAlbum(@PathVariable Integer userNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhotosByUserNo(userNo)));
    }

    @GetMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<PhotoInfoDto>> getPhotoInfo(@PathVariable Integer photoNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhoto(photoNo)));
    }

    @DeleteMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<String>> deletePhoto(@PathVariable Integer photoNo){
        photoService.deletePhoto(photoNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(DELETE_SUCCESS));
    }

    @GetMapping("/dog/{dogNo}")
    public ResponseEntity<ResponseDto<List<PhotoInfoDto>>> getAlbum(@PathVariable Integer dogNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, photoService.selectPhotosByDogNo(dogNo)));
    }

    @PutMapping("/{photoNo}")
    public ResponseEntity<ResponseDto<String>> updatePhotoGoat(@PathVariable Integer photoNo){
        photoService.setGoatPhoto(photoNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(UPDATE_SUCCESS));
    }
}
