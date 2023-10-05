package com.haru.ppobbi.global.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

@Getter
public class PolygonJsonResponseDto {
    private String status;
    private String message;
    private List<Data> result;

    @Getter
    public static class Data implements Serializable {
        @JsonProperty
        private String blockNumber;
        @JsonProperty
        private String timeStamp;
        @JsonProperty
        private String hash;
        @JsonProperty
        private String nonce;
        @JsonProperty
        private String blockHash;
        @JsonProperty
        private String from;
        @JsonProperty
        private String contractAddress;
        @JsonProperty
        private String to;
        @JsonProperty
        private String tokenID;
        @JsonProperty
        private String tokenName;
        @JsonProperty
        private String tokenSymbol;
        @JsonProperty
        private String tokenDecimal;
        @JsonProperty
        private String transactionIndex;
        @JsonProperty
        private String gas;
        @JsonProperty
        private String gasPrice;
        @JsonProperty
        private String gasUsed;
        @JsonProperty
        private String cumulativeGasUsed;
        @JsonProperty
        private String input;
        @JsonProperty
        private String confirmations;



    }
}
