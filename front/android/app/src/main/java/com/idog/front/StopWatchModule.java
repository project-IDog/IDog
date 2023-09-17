package com.idog.front;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

public class StopWatchModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public StopWatchModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "StopWatchModule";
    }

    @ReactMethod
    public void getNumber(int appWidgetId) {
        SharedPreferences prefs = this.reactContext.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        int number = prefs.getInt("number_" + appWidgetId, 0);
        Log.d("StopWatchModule", "This is a simple log from Native Module!");
    }
}
