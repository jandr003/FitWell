package com.fitwell

import android.app.Application
import androidx.core.content.res.ResourcesCompat
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.common.assets.ReactFontManager

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
    try {
      val fontMgr = ReactFontManager.getInstance()
      val fontNames = arrayOf("vaga_round", "VagRound", "VAG Rounded", "VagaRound", "Fredoka-Bold", "Poppins", "Poppins-Bold")
      for (name in fontNames) {
        fontMgr.addCustomFont(this, name, R.font.vaga_round)
      }
      val tf = ResourcesCompat.getFont(this, R.font.vaga_round)
      if (tf != null) {
        fontMgr.addCustomFont("vaga_round", tf)
        fontMgr.addCustomFont("VagRound", tf)
        fontMgr.addCustomFont("VAG Rounded", tf)
        fontMgr.addCustomFont("Poppins", tf)
        fontMgr.addCustomFont("Poppins-Bold", tf)
      }
    } catch (e: Exception) {
      e.printStackTrace()
    }
    loadReactNative(this)
  }
}
