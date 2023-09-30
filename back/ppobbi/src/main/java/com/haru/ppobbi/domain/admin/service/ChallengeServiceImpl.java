package com.haru.ppobbi.domain.admin.service;

import static com.haru.ppobbi.domain.admin.constant.ChallengeResponseMessage.*;
import com.haru.ppobbi.domain.admin.dto.ChallengeRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.admin.dto.ChallengeResponseDto.*;
import com.haru.ppobbi.domain.admin.entity.Challenge;
import com.haru.ppobbi.domain.admin.entity.ChallengeType;
import com.haru.ppobbi.domain.admin.repo.ChallengeRepository;
import com.haru.ppobbi.domain.admin.repo.ChallengeTypeRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{
    private final ChallengeRepository challengeRepository;
    private final ChallengeTypeRepository challengeTypeRepository;
    @Override
    public Challenge registChallenge(RegistRequestDto registRequestDto) {
        Optional<ChallengeType> optionalChallengeType = challengeTypeRepository
                .findChallengeTypeByChallengeTypeNameAndCanceled(registRequestDto.getChallengeTypeName(), BaseConstant.NOTCANCELED);
        ChallengeType challengeType;
        if(optionalChallengeType.isPresent()){
            challengeType = optionalChallengeType.get();
        }else{
            challengeType = challengeTypeRepository.save(ChallengeType.builder()
                    .challengeTypeName(registRequestDto.getChallengeTypeName())
                    .build());
        }

        return challengeRepository.save(Challenge.builder()
                .challengeType(challengeType)
                .challengeName(registRequestDto.getChallengeName())
                .challengeDesc(registRequestDto.getChallengeDesc())
                .challengeCompleteCnt(registRequestDto.getChallengeCompleteCnt())
                .challengeImageUrl(registRequestDto.getChallengeImageUrl())
                .challengeTriggerName(registRequestDto.getChallengeTriggerName())
                .build());
    }

    @Override
    public ChallengeInfoDto selectChallengeInfo(Integer challengeNo) {
        Challenge challenge = challengeRepository.findChallengeByChallengeNoAndCanceled(challengeNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(READ_FAIL_NO_CHALLENGE.message()));
        return ChallengeInfoDto.builder()
                .challengeNo(challenge.getChallengeNo())
                .challengeTypeName(challenge.getChallengeType().getChallengeTypeName())
                .challengeName(challenge.getChallengeName())
                .challengeDesc(challenge.getChallengeDesc())
                .challengeCompleteCnt(challenge.getChallengeCompleteCnt())
                .challengeImageUrl(challenge.getChallengeImageUrl())
                .challengeTriggerName(challenge.getChallengeTriggerName())
                .build();

    }

    @Override
    public List<ChallengeListDto> selectChallenges() {
        List<Challenge> challengeList = challengeRepository.findAllByCanceled(BaseConstant.NOTCANCELED);
        return challengeList.stream()
                .map(ChallengeListDto::new)
                .collect(Collectors.toList());
    }
}
