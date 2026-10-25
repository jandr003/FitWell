package com.fitwell

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NotificationModule.NAME)
class NotificationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = NAME

  @ReactMethod
  fun sendNotification(title: String, message: String) {
    Log.d("FitWellNotif", "sendNotification called: $title - $message")
    val currentAct = reactApplicationContext.currentActivity
    if (currentAct is MainActivity) {
      currentAct.runOnUiThread {
        currentAct.sendSystemNotification(title, message)
      }
    } else {
      val context = reactApplicationContext
      val notificationManager =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

      val builder = NotificationCompat.Builder(context, CHANNEL_ID)
        .setSmallIcon(R.mipmap.ic_launcher)
        .setContentTitle(title)
        .setContentText(message)
        .setStyle(NotificationCompat.BigTextStyle().bigText(message))
        .setPriority(NotificationCompat.PRIORITY_MAX)
        .setDefaults(NotificationCompat.DEFAULT_ALL)
        .setAutoCancel(true)

      try {
        val notificationId = (System.currentTimeMillis() % 10000).toInt() + 1000
        notificationManager.notify(notificationId, builder.build())
      } catch (e: Exception) {
        Log.e("FitWellNotif", "Failed to send notification from context", e)
      }
    }
  }

  @ReactMethod
  fun requestNotificationPermission() {
    val currentAct = reactApplicationContext.currentActivity
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && currentAct != null) {
      if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.POST_NOTIFICATIONS)
          != PackageManager.PERMISSION_GRANTED) {
        currentAct.runOnUiThread {
          try {
            ActivityCompat.requestPermissions(currentAct, arrayOf(Manifest.permission.POST_NOTIFICATIONS), 101)
          } catch (e: Exception) {
            Log.e("FitWellNotif", "Error requesting permission", e)
          }
        }
      }
    }
  }

  companion object {
    const val NAME = "NotificationModule"
    private const val CHANNEL_ID = "fitwell_v2_channel"
  }
}
