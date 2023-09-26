package com.haru.ppobbi.domain.dog.controller;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.*;

import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogOwnerUpdateRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogNftResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogProfileResposeDto;
import com.haru.ppobbi.domain.dog.entity.Breed;
import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.service.DogService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dog")
@Slf4j
public class DogController {

    private final DogService dogService;

    @PostMapping()
    public ResponseEntity<ResponseDto<Object>> registDog(@RequestBody DogSaveRequestDto dogSaveRequestDto) {
        log.info("DogController - registDog : 강아지 등록");
        dogService.registDog(dogSaveRequestDto);
        return  ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_DOG));
    }

    @GetMapping("/list/{userNo}")
    public ResponseEntity<ResponseDto<List<DogProfileResposeDto>>> getAllDogs(@PathVariable Integer userNo) {
        log.info("DogController - getAllDogs : 사용자의 전체 강아지 조회");
        List<DogProfileResposeDto> dogList = dogService.selectDogsByUserNo(userNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ALL_DOG_BY_USER, dogList));
    }

    @GetMapping("/{dogNo}")
    public ResponseEntity<ResponseDto<DogProfileResposeDto>> getOneDog(@PathVariable Integer dogNo) {
        log.info("DogController - getOneDog {}: 강아지 상세 조회", dogNo);
        DogProfileResposeDto dog = dogService.selectDogByDogNo(dogNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ONE_DOG, dog));
    }

    @GetMapping("/breed")
    public ResponseEntity<ResponseDto<List<Breed>>> getALLBreeds() {
        log.info("DogController - getALLBreeds : 모든 견종 조회 리스트");
        List<Breed> breedList = dogService.selectAllBreeds();
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ALL_BREED, breedList));
    }

    @GetMapping("/breed/{keyword}")
    public ResponseEntity<ResponseDto<List<Breed>>> getALLBreedsByKeyword(@PathVariable String keyword) {
        log.info("DogController - getALLBreedsByKeyword : 견종 키워드 검색 " );
        List<Breed> breedList = dogService.selectAllBreedsByKeyword(keyword);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ALL_BREED_BY_KEYWORD, breedList));
    }

    @GetMapping("/nft/{dogNo}")
    public ResponseEntity<ResponseDto<DogNftResponseDto>> getOneDogNftInfo(@PathVariable Integer dogNo) {
        log.info("DogController - getOneDogNftInfo : 강아지 1마리 nft 조회 " );
        DogNftResponseDto dogNftResponseDto = dogService.selectDogNftByDogNo(dogNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_ONE_DOG_NFT, dogNftResponseDto));
    }

    @PostMapping("/nft")
    public ResponseEntity<ResponseDto<Object>> changeOwner (@RequestBody DogOwnerUpdateRequestDto dogOwnerUpdateRequestDto){
        log.info("DogController - changeOwner : 강아지 입양시 견주 변경 " );
        dogService.updateDogOwner(dogOwnerUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(UPDATE_DOG_NFT_OWNER_SUCCESS));
    }

    @GetMapping("/nft/list/{userNo}")
    public ResponseEntity<ResponseDto<List<DogNftResponseDto>>> getAllDogNftInfo(@PathVariable Integer userNo){
        log.info("DogController - getAllDogNftInfo : 사용자의 모든 강아지 NFT 조회 " );
        List<DogNftResponseDto> dogNftResponseDtoList = dogService.selectDogNftsByUserNo(userNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_All_DOG_NFT_BY_USER,dogNftResponseDtoList));

    }






}
