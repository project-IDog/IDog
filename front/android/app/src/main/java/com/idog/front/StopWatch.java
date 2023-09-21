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

/**
 * Implementation of App Widget functionality.
 */
public class StopWatch extends AppWidgetProvider {
    private static boolean isRunning = false;
    private static Handler handler;

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

    @SuppressLint("HandlerLeak")
    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);

        if ("PLAY_ACTION".equals(intent.getAction())) {
            if (!isRunning) {
                isRunning = true;
                Log.d("isRunning : ", "PLAY_ACTION ");
                if (handler == null) {
                    handler = new Handler(Looper.getMainLooper()) {
                        @Override
                        public void handleMessage(Message msg) {
                            int appWidgetId = msg.what;
                            int number = prefs.getInt("number_" + appWidgetId, 0);
                            prefs.edit().putInt("number_" + appWidgetId, number + 1).apply();
                            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
                            if (isRunning) {
                                handler.sendMessageDelayed(handler.obtainMessage(appWidgetId), 1000);
                            }
                        }
                    };
                }
                handler.sendMessage(handler.obtainMessage(appWidgetId));
            }
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            isRunning = false;
            Log.d("isRunning : ", "PLAY_ACTION ");
            if (handler != null) {
                Log.d("isRunning : ", "removeMessages ");
                handler.removeMessages(appWidgetId);
            }
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            isRunning = false;
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
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, 0, playIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        stopIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, 0, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        Intent resetIntent = new Intent(context, StopWatch.class);
        resetIntent.setAction("RESET_ACTION");
        resetIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent resetPendingIntent = PendingIntent.getBroadcast(context, 0, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.resetButton, resetPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
