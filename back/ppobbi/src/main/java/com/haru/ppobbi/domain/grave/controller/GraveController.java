package com.haru.ppobbi.domain.grave.controller;

import static com.haru.ppobbi.domain.grave.constant.GraveResponseMessage.*;

import com.haru.ppobbi.domain.grave.dto.GraveRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.GraveResponseDto.*;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.service.GraveService;
import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.global.dto.ResponseDto;
import com.haru.ppobbi.global.util.jwt.JwtTokenHandler;
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
    private final JwtTokenHandler jwtTokenHandler;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> registGrave(@RequestAttribute("userNo") Integer userNo, @RequestBody RegistRequestDto registRequestDto){
        Grave grave = graveService.registGrave(userNo, registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<GraveInfoDto>> getGraveInfo(@PathVariable Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGrave(graveNo)));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<GraveListDto>>> getAllGraves(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGraves()));
    }

    @GetMapping("/user")
    public ResponseEntity<ResponseDto<List<GraveListDto>>> getGravesByUserNo(@RequestAttribute("userNo") Integer userNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESSS, graveService.selectGravesByUserNo(userNo)));
    }

    @GetMapping("/token")
    public ResponseEntity<TokenInfo> hi(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(jwtTokenHandler.generateToken(18));
    }

    @GetMapping("/log")
    public ResponseEntity<String> hello(){
        throw new RuntimeException("exception");
    }
    @PostMapping("/log")
    public ResponseEntity<String> holy(){throw new RuntimeException("post");}
}
