package com.idog.front;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.ComponentName;
import android.util.Log;

/**
 * Implementation of App Widget functionality.
 */
public class StopWatch extends AppWidgetProvider {

    // 이 변수들을 추가하세요.
    private static long startTime = 0;
    private static long elapsedTime = 0;

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
        if ("PLAY_ACTION".equals(intent.getAction())) {
            startTime = System.currentTimeMillis();

            Intent serviceIntent = new Intent(context, TimerService.class);
            serviceIntent.setAction("PLAY_ACTION");
            context.startService(serviceIntent);
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            elapsedTime += System.currentTimeMillis() - startTime;

            Intent serviceIntent = new Intent(context, TimerService.class);
            serviceIntent.setAction("STOP_ACTION");
            context.startService(serviceIntent);
        } else if (TimerService.ACTION_UPDATE.equals(intent.getAction())) {
            elapsedTime += System.currentTimeMillis() - startTime;
            startTime = System.currentTimeMillis();

            // 이제 위젯 UI를 업데이트하십시오.
            // 시간을 문자열로 변환하는 로직은 단순화되었습니다.
            // 이를 더 발전시켜 올바른 시간을 표시하도록 해야 합니다.
            String timeStr = String.format("%02d:%02d:%02d",
                    (elapsedTime / 3600000),
                    (elapsedTime / 60000) % 60,
                    (elapsedTime / 1000) % 60);

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);
            views.setTextViewText(R.id.timer, timeStr);

            AppWidgetManager.getInstance(context).updateAppWidget(new ComponentName(context, StopWatch.class), views);
        }
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.stop_watch);

        Intent playIntent = new Intent(context, StopWatch.class);
        playIntent.setAction("PLAY_ACTION");
        PendingIntent playPendingIntent = PendingIntent.getBroadcast(context, 0, playIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        views.setOnClickPendingIntent(R.id.playButton, playPendingIntent);

        Intent stopIntent = new Intent(context, StopWatch.class);
        stopIntent.setAction("STOP_ACTION");
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(context, 0, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        views.setOnClickPendingIntent(R.id.stopButton, stopPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
