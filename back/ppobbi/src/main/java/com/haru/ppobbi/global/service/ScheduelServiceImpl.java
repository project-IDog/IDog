package com.haru.ppobbi.global.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.dto.PolygonJsonResponseDto;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.util.List;

import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduelServiceImpl{

    private final DogRepository dogRepository;
    private final UserRepository userRepository;

    static String basePolygonScanApi = "https://api.polygonscan.com/api";
    @Value("${appkey.polygon.value}")
    private String POLYGON_APP_KEY;

    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create(basePolygonScanApi);
    }

//    @Scheduled(cron = "0 0/10 * * * *")
    @Scheduled(cron = "0 * * * * *")
    public void updateDogNftByTokenId() { //10분마다
        //강아지 테이블에서 dog_hash에 값이 있는 것만 리스트업
        List<Dog> dogList = dogRepository.findByDogHashIsNotNullAndCanceled(BaseConstant.NOTCANCELED);

        //for문을 돌면서 address 값을 넣어서 api를 호출하고
        for (int i = 0; i < dogList.size(); i++) {
            Dog dog = dogList.get(i);
            Integer nowUserNo = dogList.get(i).getUserNo();
            User user = userRepository.findUserByUserNoAndCanceled(nowUserNo, NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
            String userAddress = user.getUserAddress();
            String searchUri = "?module=account&action=tokennfttx&contractaddress=0xdB983532a92837Ee0faF0e67854993a858f621d2&address="
                    + userAddress
                    + "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey="
                    + POLYGON_APP_KEY;

            Mono<PolygonJsonResponseDto> response = webClient.get()
                    .uri(searchUri)
                    .retrieve()
                    .bodyToMono(PolygonJsonResponseDto.class)
                    .onErrorMap(err -> new Exception("민팅 후 토큰아이디 업데이트 실패",err));

            PolygonJsonResponseDto data = response.share().block();

            System.out.println(dog.getDogHash());

            //결과로 받은 값의 transaction hash를 비교하면서 dog_nft 업데이트를 진행
            for (int j = 0; j < data.getResult().size(); j++) {
                String nowHash = data.getResult().get(j).getHash();
                Integer tokenId = Integer.parseInt(data.getResult().get(j).getTokenID());

                if(dog.getDogHash().equals(nowHash)){
                    dog.updateDogNft(tokenId);
                    dog.setDogHash(null);
                    dogRepository.save(dog);
                    break;
                }
            }

        }


    }
}
