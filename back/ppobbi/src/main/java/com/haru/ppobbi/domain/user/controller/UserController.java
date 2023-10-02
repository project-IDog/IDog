package com.haru.ppobbi.domain.user.controller;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserWalletPwRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.service.UserService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.haru.ppobbi.domain.user.constant.UserResponseMessage.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<ResponseDto<TokenInfo>> signUpOrIn(
        @RequestAttribute("userInfo") UserInfoRequestDto userInfoRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(SIGN_IN_SUCCESS,
                userService.signUpOrIn(userInfoRequestDto))
        );
    }

    @GetMapping("")
    public ResponseEntity<ResponseDto<UserInfoResponseDto>> getUserInfo(
        @RequestAttribute("userNo") Integer userNo) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(GET_USER_INFO_SUCCESS,
                userService.getUserInfo(userNo))
        );
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDto<String>> deleteUser(
        @RequestAttribute("userNo") Integer userNo) {
        userService.deleteUser(userNo);
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(DELETE_USER_SUCCESS)
        );
    }

    @PutMapping("/message")
    public ResponseEntity<ResponseDto<String>> updateUserMessage(
        @RequestAttribute("userNo") Integer userNo,
        @RequestBody UpdateUserMessageRequestDto updateUserMessageRequestDto) {
        userService.updateUserMessage(userNo, updateUserMessageRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(UPDATE_USER_MESSAGE_SUCCESS)
        );
    }

    @PostMapping("/token")
    public ResponseEntity<ResponseDto<AccessTokenResponseDto>> reissueAccessToken(
        @RequestAttribute("userNo") Integer userNo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ResponseDto.create(REISSUE_ACCESS_TOKEN__SUCCESS,
                userService.reissueAccessToken(userNo))
        );
    }

    @PutMapping("/name")
    public ResponseEntity<ResponseDto<String>> updateUserName(
        @RequestAttribute("userNo") Integer userNo, @RequestBody UpdateUserInfoRequestDto updateUserInfoRequestDto) {
        userService.updateUserName(userNo, updateUserInfoRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(UPDATE_USER_NAME_SUCCESS)
        );
    }

    @PutMapping("/wallet")
    public ResponseEntity<ResponseDto<String>> updateUserWalletPw(
            @RequestAttribute("userNo") Integer userNo, @RequestBody UserWalletPwRequestDto userWalletPwRequestDto) {
        userService.updateUserWalletPw(userNo, userWalletPwRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseDto.create(UPDATE_USER_WALLET_PW_SUCCESS)
        );
    }

    @PostMapping("wallet/check")
    public ResponseEntity<ResponseDto<String>> checkUserWalletPw(
            @RequestAttribute("userNo") Integer userNo, @RequestBody UserWalletPwRequestDto userWalletPwRequestDto) {
        String status = userService.checkUserWalletPw(userNo, userWalletPwRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseDto.create(status)
        );
    }

}
