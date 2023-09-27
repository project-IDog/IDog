package com.haru.ppobbi.domain.grave.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "flower")
public class Flower {
    @Id
    private Integer graveNo;

    private List<LocalDateTime> flowers;

    @TimeToLive
    private long ttl;

    @Builder
    Flower(Integer graveNo, List<LocalDateTime> flowers, long ttl){
        this.graveNo = graveNo;
        this.flowers = flowers;
        this.ttl = ttl;
    }
}
