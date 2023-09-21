package com.idog.front;

import android.annotation.SuppressLint;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Looper;
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

/**
 * Implementation of App Widget functionality.
 */
public class StopWatch extends AppWidgetProvider {
    private static MyHandler handler;

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
            WritableMap map = Arguments.createMap();
            map.putInt("appWidgetId", appWidgetId);
            StopWatchModule.emitDeviceEvent("onAppWidgetUpdate", map);
        }
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
        int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        boolean isRunning = prefs.getBoolean("isRunning_" + appWidgetId, false);

        if ("PLAY_ACTION".equals(intent.getAction())) {
            if (!isRunning) {
                prefs.edit().putBoolean("isRunning_" + appWidgetId, true).apply();
                Log.d("isRunning : ", "PLAY_ACTION ");
                if (handler == null) {
                    handler = new MyHandler(context);
                }
                handler.sendMessage(handler.obtainMessage(appWidgetId));
            }
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            prefs.edit().putBoolean("isRunning_" + appWidgetId, false).apply();
            Log.d("isRunning : ", "STOP_ACTION ");
            if (handler != null) {
                handler.removeMessages(appWidgetId);
            }
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            prefs.edit().putBoolean("isRunning_" + appWidgetId, false).apply();
            if (handler != null) {
                handler.removeMessages(appWidgetId);
            }
            prefs.edit().putInt("number_" + appWidgetId, 0).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        int number = prefs.getInt("number_" + appWidgetId, 0);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
        views.setTextViewText(R.id.timer, String.valueOf(number));

        Intent playIntent = new Intent(context, StopWatch.class);
        playIntent.setAction("PLAY_ACTION");
        playIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, appWidgetId, playIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        stopIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, appWidgetId + 1, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        Intent resetIntent = new Intent(context, StopWatch.class);
        resetIntent.setAction("RESET_ACTION");
        resetIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent resetPendingIntent = PendingIntent.getBroadcast(context, appWidgetId + 2, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.resetButton, resetPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
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
            int appWidgetId = msg.what;
            int number = prefs.getInt("number_" + appWidgetId, 0);
            boolean isRunning = prefs.getBoolean("isRunning_" + appWidgetId, false);

            prefs.edit().putInt("number_" + appWidgetId, number + 1).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);

            if (isRunning) {
                this.sendMessageDelayed(this.obtainMessage(appWidgetId), 1000);
            }
        }
    }
}
