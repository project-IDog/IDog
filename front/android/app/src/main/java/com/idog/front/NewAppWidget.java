package com.idog.front;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import android.app.PendingIntent;
import android.util.Log;

public class NewAppWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    private void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        int number = prefs.getInt("number_" + appWidgetId, 0);

        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.new_app_widget);
        views.setTextViewText(R.id.numberText, String.valueOf(number));

        // Increment action
        Intent incrementIntent = new Intent(context, NewAppWidget.class);
        incrementIntent.setAction("INCREMENT_ACTION");
        incrementIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//        PendingIntent pendingIncrement = PendingIntent.getBroadcast(context, appWidgetId * 10, incrementIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        PendingIntent pendingIncrement = PendingIntent.getBroadcast(context, appWidgetId * 10, incrementIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        views.setOnClickPendingIntent(R.id.incrementButton, pendingIncrement);
        Log.d("NewAppWidget", "Setting up Increment Button");

        // Reset action
        Intent resetIntent = new Intent(context, NewAppWidget.class);
        resetIntent.setAction("RESET_ACTION");
        resetIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//        PendingIntent pendingReset = PendingIntent.getBroadcast(context, appWidgetId * 10 + 1, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        PendingIntent pendingReset = PendingIntent.getBroadcast(context, appWidgetId * 10 + 1, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        views.setOnClickPendingIntent(R.id.resetButton, pendingReset);
        Log.d("NewAppWidget", "Setting up Reset Button");

        // Update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);

        SharedPreferences prefs = context.getSharedPreferences("MyWidget", Context.MODE_PRIVATE);
        if ("INCREMENT_ACTION".equals(intent.getAction())) {
            Log.d("NewAppWidget", "Increment Button Clicked!");
            int number = prefs.getInt("number_" + appWidgetId, 0);
            prefs.edit().putInt("number_" + appWidgetId, number + 1).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        } else if ("RESET_ACTION".equals(intent.getAction())) {
            Log.d("NewAppWidget", "Reset Button Clicked!");
            prefs.edit().putInt("number_" + appWidgetId, 0).apply();
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId);
        } else {
            Log.d("NewAppWidget", "Unknown action received: " + intent.getAction());
        }
    }
}