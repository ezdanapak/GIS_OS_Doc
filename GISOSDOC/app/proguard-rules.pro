# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# WebView with JavaScript interface rules (უსაფრთხოების რეზერვი)
# თუ მომავალში დაამატებთ @JavascriptInterface მეთოდებს, უნდა ეს ჩართოთ.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# შეინახე WebViewClient / WebChromeClient ქოლბექები
-keepclassmembers class * extends android.webkit.WebViewClient {
    public void *(android.webkit.WebView, java.lang.String, android.graphics.Bitmap);
    public boolean *(android.webkit.WebView, java.lang.String);
}
-keepclassmembers class * extends android.webkit.WebChromeClient {
    public void *(android.webkit.WebView, java.lang.String);
}

# Preserve line number information for debugging crash stack traces.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# AndroidX Webkit
-keep class androidx.webkit.** { *; }
-dontwarn androidx.webkit.**

# Kotlin metadata (სიზუსტისთვის)
-keep class kotlin.Metadata { *; }
