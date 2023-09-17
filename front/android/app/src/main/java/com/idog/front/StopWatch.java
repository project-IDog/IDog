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

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
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
        int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        if ("PLAY_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_PLAY_ACTION", "WATCH_PLAY ACTION CLICK");
            int number = prefs.getInt("number_" + appWidgetId, 0);
            prefs.edit().putInt("number_" + appWidgetId, number + 1).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_STOP_ACTION", "WATCH_STOP ACTION CLICK");
            int number = prefs.getInt("number_" + appWidgetId, 0);
            prefs.edit().putInt("number_" + appWidgetId, number + 10).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            Log.d("WATCH_RESET_ACTION", "WATCH_RESET_ACTION CLICK");
            prefs.edit().putInt("number_" + appWidgetId, 0).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        } else if (TimerService.ACTION_UPDATE.equals(intent.getAction())) {
            Log.d("WATCH_WHAT_ACTION", "WATCH_WHAT ACTION CLICK");
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
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, 1, playIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        stopIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, 2, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        Intent resetIntent = new Intent(context, StopWatch.class);
        resetIntent.setAction("RESET_ACTION");
        resetIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        PendingIntent resetPendingIntent = PendingIntent.getBroadcast(context, 3, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.resetButton, resetPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
