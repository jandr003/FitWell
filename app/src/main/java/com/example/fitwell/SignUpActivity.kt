package com.example.fitwell

import android.content.Intent
import android.os.Bundle
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_signup)

        val mainView = findViewById<android.view.View>(R.id.main)
        if (mainView != null) {
            ViewCompat.setOnApplyWindowInsetsListener(mainView) { v, insets ->
                val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
                insets
            }
        }

        // 1. I-initialize ang mga Views gamit ang tamang IDs mula sa XML
        val nameEt = findViewById<EditText>(R.id.nameEt)
        val contactEt = findViewById<EditText>(R.id.contactEt)
        val emailEt = findViewById<EditText>(R.id.emailEt)
        val passwordEt = findViewById<EditText>(R.id.passwordEt)
        val rePasswordEt = findViewById<EditText>(R.id.rePasswordEt) // Binago mula confirmPasswordEt
        val signUpBtn = findViewById<AppCompatButton>(R.id.signUpBtn)
        val loginTxt = findViewById<TextView>(R.id.loginTxt)

        signUpBtn.setOnClickListener {
            val name = nameEt.text.toString().trim()
            val contact = contactEt.text.toString().trim()
            val email = emailEt.text.toString().trim()
            val password = passwordEt.text.toString().trim()
            val rePassword = rePasswordEt.text.toString().trim()

            // Validation
            if (name.isEmpty() || contact.isEmpty() || email.isEmpty() || password.isEmpty() || rePassword.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password != rePassword) {
                rePasswordEt.error = "Passwords do not match"
                return@setOnClickListener
            }

            Toast.makeText(this, "Signing up...", Toast.LENGTH_SHORT).show()
        }

        loginTxt.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
            finish()
        }
    }

    override fun finish() {
        super.finish()
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
    }
}