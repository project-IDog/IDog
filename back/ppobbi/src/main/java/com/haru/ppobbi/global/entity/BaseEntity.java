package com.haru.ppobbi.global.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@Getter
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    private LocalDateTime modifyDate;

    @Column(name = "canceled")
    private int canceled;

    public void setCanceled(Integer canceled) {
        this.canceled = canceled;
    }
}
