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

            // 값을 Promise로 반환합니다.
            promise.resolve(number);
        } catch (Exception e) {
            promise.reject("GET_NUMBER_ERROR", e);
        }
    }

    @ReactMethod
    public void updateNumber(int appWidgetId, int increaseValue, Promise promise) {
        try {
            SharedPreferences prefs = StopWatchModule.reactContext.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
            int currentNumber = prefs.getInt("number_" + appWidgetId, 0);
            int updatedNumber = increaseValue + currentNumber;
            SharedPreferences.Editor editor = prefs.edit();
            editor.putInt("number_" + appWidgetId, updatedNumber).apply();

            promise.resolve(updatedNumber);
            WritableMap eventData = Arguments.createMap();
            eventData.putInt("updatedNumber", updatedNumber);
            eventData.putInt("appWidgetId", appWidgetId);

            // 이벤트를 React Native로 보냅니다.
            StopWatchModule.reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("numberUpdated", eventData);
            Intent intent = new Intent(StopWatchModule.reactContext, StopWatch.class);
            intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            int[] ids = {appWidgetId};
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            StopWatchModule.reactContext.sendBroadcast(intent);
        } catch (Exception e) {
            promise.reject("UPDATE_NUMBER_ERROR", e);
        }
    }

}
