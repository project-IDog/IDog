package com.haru.ppobbi.domain.walking.entity;

import java.time.LocalDateTime;

public interface WalkingSummary {
    LocalDateTime getWalkingStartDate();
    Integer getCountSum();
    Integer getTimeSum();
}
