package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserAddressRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserWalletPwRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;

public interface UserService {

    TokenInfo signUpOrIn(UserInfoRequestDto userInfoRequestDto);

    UserInfoResponseDto getUserInfo(Integer userNo);

    void deleteUser(Integer userNo);

    void updateUserMessage(Integer userNo,
        UpdateUserMessageRequestDto updateUserMessageRequestDto);

    AccessTokenResponseDto reissueAccessToken(Integer userNo);

    void updateUserName(Integer userNo, UpdateUserInfoRequestDto updateUserInfoRequestDto);

    void updateUserWalletPw(Integer userNo, UserWalletPwRequestDto userWalletPwRequestDto);

    String checkUserWalletPw(Integer userNo, UserWalletPwRequestDto userWalletPwRequestDto);

    void updateUserAddress(Integer userNo, UserAddressRequestDto userAddressRequestDto);


}
