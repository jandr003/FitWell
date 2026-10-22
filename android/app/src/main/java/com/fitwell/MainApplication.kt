package com.fitwell

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    val pkgs = PackageList(this).packages.toMutableList()
    pkgs.add(NotificationPackage())
    getDefaultReactHost(
      context = applicationContext,
      packageList = pkgs,
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
