package com.idog.front;

import android.annotation.SuppressLint;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Looper;
import android.view.View;
import android.widget.RemoteViews;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.ComponentName;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import android.os.Handler;
import android.os.Message;

import java.lang.ref.WeakReference;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

/**
 * Implementation of App Widget functionality.
 */
public class StopWatch extends AppWidgetProvider {
    private static MyHandler handler;

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
        StopWatchModule.emitDeviceEvent("onAppWidgetUpdate", Arguments.createMap());
    }

    @Override
    public void onEnabled(Context context) {
        // ...
    }

    @Override
    public void onDisabled(Context context) {
        // ...
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        boolean isRunning = prefs.getBoolean("isRunning" , false);
        Log.d("StopWatch", "Received action: " + intent.getAction());

        if ("PLAY_ACTION".equals(intent.getAction())) {
            if (!isRunning) {
                prefs.edit().putBoolean("isRunning", true).apply();
                long now = System.currentTimeMillis();
                Date date = new Date(now);
                SimpleDateFormat currentDate = new SimpleDateFormat("yyyy-MM-dd");
                String strCurrentDate = currentDate.format(date);
                Log.d("PLAY ACTION Date : ", "" + strCurrentDate);
                isRunning = prefs.getBoolean("isRunning" , false);
                Log.d("isRunning play : ", "" + isRunning);
                prefs.edit().putString("date", strCurrentDate).apply();
                if (handler == null) {
                    handler = new MyHandler(context);
                }
                handler.sendMessage(handler.obtainMessage(0));
                StopWatchModule.emitDeviceEvent("PLAY_ACTION_EVENT", null);
            }
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            prefs.edit().putBoolean("isRunning", false).apply();
            if (handler != null) {
                handler.removeMessages(0);
            }
            StopWatchModule.emitDeviceEvent("STOP_ACTION_EVENT", null);
            isRunning = prefs.getBoolean("isRunning" , false);
            Log.d("isRunning play : ", "" + isRunning);
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            prefs.edit().putBoolean("isRunning", false).apply();
            if (handler != null) {
                handler.removeMessages(0);
            }
            prefs.edit().putInt("number", 0).apply();
            prefs.edit().remove("date").apply();
            StopWatchModule.emitDeviceEvent("RESET_ACTION_EVENT", null);
        }
        isRunning = prefs.getBoolean("isRunning" , false);
        if (!isRunning) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
            views.setViewVisibility(R.id.playButton, View.VISIBLE);
            views.setViewVisibility(R.id.stopButton, View.GONE);
            AppWidgetManager.getInstance(context).updateAppWidget(new ComponentName(context, StopWatch.class), views);
        } else {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
            views.setViewVisibility(R.id.stopButton, View.VISIBLE);
            views.setViewVisibility(R.id.playButton, View.GONE);
            AppWidgetManager.getInstance(context).updateAppWidget(new ComponentName(context, StopWatch.class), views);
        }
        updateAllWidgets(context);
    }

    static void updateAllWidgets(Context context) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, StopWatch.class));
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        int number = prefs.getInt("number", 0);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
        views.setTextViewText(R.id.timer, formatTime(number));

        Intent playIntent = new Intent(context, StopWatch.class);
        playIntent.setAction("PLAY_ACTION");
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, 0, playIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, 1, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        Intent resetIntent = new Intent(context, StopWatch.class);
        resetIntent.setAction("RESET_ACTION");
        PendingIntent resetPendingIntent = PendingIntent.getBroadcast(context, 2, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.resetButton, resetPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private static String formatTime(int totalSecond) {
        int hours = totalSecond / 3600;
        int minutes = (totalSecond % 3600) / 60;
        int seconds = totalSecond % 60;
        return String.format("%01d:%02d:%02d", hours, minutes, seconds);
    }

    private static class MyHandler extends Handler {
        private final WeakReference<Context> contextRef;

        MyHandler(Context context) {
            super(Looper.getMainLooper());
            contextRef = new WeakReference<>(context);
        }

        @Override
        public void handleMessage(Message msg) {
            Context context = contextRef.get();
            if (context == null) return;

            SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
            int number = prefs.getInt("number", 0);
            boolean isRunning = prefs.getBoolean("isRunning", false);

            prefs.edit().putInt("number", number + 1).apply();
            updateAllWidgets(context);

            // Emit event to React Native
            WritableMap map = Arguments.createMap();
            map.putString("number", formatTime(number + 1));
            StopWatchModule.emitDeviceEvent("onAppWidgetUpdate", map);

            if (isRunning) {
                this.sendMessageDelayed(this.obtainMessage(0), 1000);
            }
        }

    }
}
