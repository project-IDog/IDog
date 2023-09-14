package com.haru.ppobbi.domain.grave.controller;

import static com.haru.ppobbi.domain.grave.constant.GraveResponseMessage.*;

import com.haru.ppobbi.domain.grave.dto.GraveRequestDto;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.service.GraveService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/grave")
public class GraveController {
    private final GraveService graveService;

    @PostMapping()
    public ResponseEntity<ResponseDto<?>> registGrave(@RequestBody GraveRequestDto graveRequestDto){
        Grave grave = graveService.registGrave(graveRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<Grave>> getGraveInfo(@PathVariable Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGrave(graveNo)));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<Grave>>> getAllGraves(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGraves()));
    }
}
