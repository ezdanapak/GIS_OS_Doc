package com.gisosdoc

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // ინიციალიზაცია
        webView = findViewById(R.id.myWebView)
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)

        // WebView პარამეტრების ოპტიმიზაცია
        val webSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.databaseEnabled = true
        webSettings.useWideViewPort = true
        webSettings.loadWithOverviewMode = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT

        // WebViewClient-ის ერთიანი ლოგიკა
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                // როცა გვერდი ჩაიტვირთება, Spinner ქრება
                swipeRefreshLayout.isRefreshing = false
            }
        }

        // საიტის ჩატვირთვა
        webView.loadUrl("https://ezdanapak.github.io/GIS_OS_Doc/")

        // Swipe to Refresh ლოგიკა
        swipeRefreshLayout.setOnRefreshListener {
            webView.reload()
        }

        // "Back" ღილაკის ლოგიკა
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }
}