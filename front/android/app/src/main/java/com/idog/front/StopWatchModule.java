package com.idog.front;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.appwidget.AppWidgetManager;
import android.content.Intent;

import androidx.annotation.Nullable;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
public class StopWatchModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public StopWatchModule(ReactApplicationContext reactContext) {
        super(reactContext);
        StopWatchModule.reactContext = reactContext;
    }

    public static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        if (StopWatchModule.reactContext != null) {
            StopWatchModule.reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, eventData);
        }
    }
    @Override
    public String getName() {
        return "StopWatchModule";
    }

    @ReactMethod
    public void getNumber(int appWidgetId, Promise promise) {
        try {
            SharedPreferences prefs = StopWatchModule.reactContext.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
            int number = prefs.getInt("number_" + appWidgetId, 0);
            Log.d("StopWatchModule Number", "This is a simple log from Native Module!" + number + " prefs : " + prefs);

            promise.resolve(number);
        } catch (Exception e) {
            promise.reject("GET_NUMBER_ERROR", e);
        }
    }
    @ReactMethod
    public void playTimer(int appWidgetId) {
        Intent intent = new Intent(reactContext, StopWatch.class);
        intent.setAction("PLAY_ACTION");
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void stopTimer(int appWidgetId) {
        Intent intent = new Intent(reactContext, StopWatch.class);
        intent.setAction("STOP_ACTION");
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        reactContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void resetTimer(int appWidgetId) {
        Intent intent = new Intent(reactContext, StopWatch.class);
        intent.setAction("RESET_ACTION");
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        reactContext.sendBroadcast(intent);
    }


}
