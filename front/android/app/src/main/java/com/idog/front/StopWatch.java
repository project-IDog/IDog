package com.idog.front;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.ComponentName;
import android.util.Log;

/**
 * Implementation of App Widget functionality.
 */
public class StopWatch extends AppWidgetProvider {

    private static final String PREFS_NAME = "StopWatchPrefs";
    private static final String PREF_START_TIME = "startTime";
    private static final String PREF_ELAPSED_TIME = "elapsedTime";

    private static long startTime = 0;
    private static long elapsedTime = 0;

    // SharedPreferences 초기화
    private static SharedPreferences getPrefs(Context context) {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    private static void loadTime(Context context) {
        SharedPreferences prefs = getPrefs(context);
        startTime = prefs.getLong(PREF_START_TIME, 0);
        elapsedTime = prefs.getLong(PREF_ELAPSED_TIME, 0);
    }

    private static void saveTime(Context context) {
        SharedPreferences.Editor editor = getPrefs(context).edit();
        editor.putLong(PREF_START_TIME, startTime);
        editor.putLong(PREF_ELAPSED_TIME, elapsedTime);
        editor.apply();
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        loadTime(context);
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
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
        Log.d("StopWatch", "Received intent: " + intent.getAction());
        if ("PLAY_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_PLAY_ACTION", "WATCH_PLAY ACTION CLICK");
            startTime = System.currentTimeMillis();
            Intent serviceIntent = new Intent(context, TimerService.class);
            serviceIntent.setAction("PLAY_ACTION");
            context.startService(serviceIntent);
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_STOP_ACTION", "WATCH_STOP ACTION CLICK");
            elapsedTime += System.currentTimeMillis() - startTime;
            Intent serviceIntent = new Intent(context, TimerService.class);
            serviceIntent.setAction("STOP_ACTION");
            context.startService(serviceIntent);
            saveTime(context);
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_RESET_ACTION", "WATCH_RESET_ACTION CLICK");
            elapsedTime = 0;  // elapsedTime 초기화
            startTime = 0;    // startTime 초기화
            Intent serviceIntent = new Intent(context, TimerService.class);
            serviceIntent.setAction("RESET_ACTION");
            context.startService(serviceIntent);
        } else if (TimerService.ACTION_UPDATE.equals(intent.getAction())) {
            Log.d("WATCH_WHAT_ACTION", "WATCH_WHAT ACTION CLICK");
            elapsedTime += System.currentTimeMillis() - startTime;
            startTime = System.currentTimeMillis();

            String timeStr = String.format("%02d:%02d:%02d",
                    (elapsedTime / 3600000),
                    (elapsedTime / 60000) % 60,
                    (elapsedTime / 1000) % 60);
            Log.d("TIME", timeStr);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
            views.setTextViewText(R.id.timer, timeStr);

            AppWidgetManager.getInstance(context).updateAppWidget(new ComponentName(context, StopWatch.class), views);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
        Log.d("UPDATEWIDGET", "WIDGET_LOAD");

        Intent playIntent = new Intent(context, StopWatch.class);
        playIntent.setAction("PLAY_ACTION");
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, 1, playIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, 2, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        Intent resetIntent = new Intent(context, StopWatch.class);
        resetIntent.setAction("RESET_ACTION");
        PendingIntent resetPendingIntent = PendingIntent.getBroadcast(context, 3, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.resetButton, resetPendingIntent);
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
