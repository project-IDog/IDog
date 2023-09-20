package com.haru.ppobbi.domain.grave.controller;

import static com.haru.ppobbi.domain.grave.constant.GraveResponseMessage.*;

import com.haru.ppobbi.domain.grave.dto.GraveRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.service.GraveService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/grave")
@Slf4j
public class GraveController {
    private final GraveService graveService;

    @PostMapping()
    public ResponseEntity<ResponseDto<?>> registGrave(@RequestAttribute("userId") String userId, @RequestBody RegistRequestDto registRequestDto){
        Grave grave = graveService.registGrave(userId, registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<?>> getGraveInfo(@PathVariable Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGrave(graveNo)));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<?>> getAllGraves(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGraves()));
    }
}
