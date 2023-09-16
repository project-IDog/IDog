package com.idog.front;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.os.SystemClock;
import android.util.Log;
public class TimerService extends Service {

    private AlarmManager alarmManager;
    private PendingIntent updateIntent;

    public static final String ACTION_UPDATE = "com.idog.front.ACTION_UPDATE";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("TimerService", "onStartCommand called with action: " + intent.getAction()); // 이 부분을 추가합니다.
        if ("PLAY_ACTION".equals(intent.getAction())) {
            startTimer();
        } else if ("STOP_ACTION".equals(intent.getAction())) {
            stopTimer();
        }
        return START_STICKY;
    }

    private void startTimer() {
        Log.d("TimerService", "Starting timer");
        Intent intent = new Intent(this, StopWatch.class);
        intent.setAction(TimerService.ACTION_UPDATE);
        updateIntent = PendingIntent.getBroadcast(this, 3, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        long interval = 1000; // 1 second
        alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime(), interval, updateIntent);
    }

    private void stopTimer() {
        Log.d("TimerService", "Stopping timer..."); // 이 부분을 추가합니다.
        if (alarmManager != null && updateIntent != null) {
            alarmManager.cancel(updateIntent);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
