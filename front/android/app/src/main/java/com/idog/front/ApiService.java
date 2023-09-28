package com.idog.front;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface ApiService {
    @POST("https://idog.store/api/walking/")
    @Headers("Content-Type: application/json")
//    Call<Void> sendWalkingData(@Body String data);
    Call<Void> sendWalkingData(@Body RequestBody data);
}

class WalkingData {
    private int dogNo;
    private int walkingTime;
    private String walkingStartDate;

    // 생성자
    public WalkingData(int dogNo, int walkingTime, String walkingStartDate) {
        this.dogNo = dogNo;
        this.walkingTime = walkingTime;
        this.walkingStartDate = walkingStartDate;
    }

    // Getter and Setter
    public int getDogNo() {
        return dogNo;
    }

    public void setDogNo(int dogNo) {
        this.dogNo = dogNo;
    }

    public int getWalkingTime() {
        return walkingTime;
    }

    public void setWalkingTime(int walkingTime) {
        this.walkingTime = walkingTime;
    }

    public String getWalkingStartDate() {
        return walkingStartDate;
    }

    public void setWalkingStartDate(String walkingStartDate) {
        this.walkingStartDate = walkingStartDate;
    }
}
