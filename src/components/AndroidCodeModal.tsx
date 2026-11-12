import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  FileCode,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface AndroidFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

const ANDROID_SOURCE_FILES: AndroidFile[] = [
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/djcesardiaz/salsapoder/MainActivity.kt',
    language: 'kotlin',
    content: `package com.djcesardiaz.salsapoder

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.djcesardiaz.salsapoder.ui.navigation.SalsaBottomNav
import com.djcesardiaz.salsapoder.ui.screens.*
import com.djcesardiaz.salsapoder.ui.theme.SalsaPoderTheme

/**
 * DJ César Díaz - Todo el Poder de la Salsa
 * Arquitectura Nativa Android Jetpack Compose + Material 3
 * Soporte Edge-to-Edge con WindowInsets
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Diseño Edge-to-Edge nativo
        enableEdgeToEdge()

        setContent {
            SalsaPoderTheme {
                var currentTab by remember { mutableStateOf(NavTab.RADIO) }

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = Color(0xFF0A0510), // Dark mode salsero
                    contentWindowInsets = WindowInsets.systemBars,
                    bottomBar = {
                        SalsaBottomNav(
                            currentTab = currentTab,
                            onTabSelected = { currentTab = it }
                        )
                    }
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        when (currentTab) {
                            NavTab.RADIO -> RadioScreen()
                            NavTab.CABINA -> CabinaDjScreen()
                            NavTab.VIDEOS -> VideoMixesScreen()
                            NavTab.CONTRATOS -> ContactScreen()
                        }
                    }
                }
            }
        }
    }
}

enum class NavTab {
    RADIO, CABINA, VIDEOS, CONTRATOS
}`,
  },
  {
    name: 'PercussionSynth.kt',
    path: 'app/src/main/java/com/djcesardiaz/salsapoder/audio/PercussionSynth.kt',
    language: 'kotlin',
    content: `package com.djcesardiaz.salsapoder.audio

import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import kotlin.math.*

/**
 * Sintetizador de Percusión Latina en PCM Puro con AudioTrack
 * Genera Clave 3-2, Campana, Güiro, Air Horn y Conga Slap
 * sin depender de archivos de audio pesados externos.
 */
object PercussionSynth {
    private const val SAMPLE_RATE = 44100

    /**
     * Clave Cubana 3-2 (Resonador de madera con decaimiento percusivo)
     */
    fun playClave(isSingle: Boolean = true) {
        Thread {
            val duration = 0.06
            val numSamples = (SAMPLE_RATE * duration).toInt()
            val buffer = ShortArray(numSamples)
            val freq1 = 2450.0
            val freq2 = 2890.0

            for (i in 0 until numSamples) {
                val t = i.toDouble() / SAMPLE_RATE
                val envelope = exp(-i.toDouble() / (SAMPLE_RATE * 0.012))
                val wave = sin(2 * PI * freq1 * t) * 0.6 + sin(2 * PI * freq2 * t) * 0.4
                buffer[i] = (wave * envelope * Short.MAX_VALUE).toInt().toShort()
            }

            playPcm(buffer)
        }.start()
    }

    /**
     * Campana / Cencerro con doble armónico metálico (587Hz & 845Hz)
     */
    fun playCampana(isHigh: Boolean = false) {
        Thread {
            val duration = if (isHigh) 0.15 else 0.28
            val numSamples = (SAMPLE_RATE * duration).toInt()
            val buffer = ShortArray(numSamples)
            val f1 = if (isHigh) 780.0 else 587.0
            val f2 = if (isHigh) 1120.0 else 845.0

            for (i in 0 until numSamples) {
                val t = i.toDouble() / SAMPLE_RATE
                val envelope = exp(-i.toDouble() / (SAMPLE_RATE * 0.05))
                // Señal cuadrada rica en armónicos metálicos
                val s1 = if (sin(2 * PI * f1 * t) > 0) 1.0 else -1.0
                val s2 = if (sin(2 * PI * f2 * t) > 0) 1.0 else -1.0
                val sample = (s1 * 0.5 + s2 * 0.5) * envelope
                buffer[i] = (sample * Short.MAX_VALUE * 0.75).toInt().toShort()
            }

            playPcm(buffer)
        }.start()
    }

    /**
     * DJ Air Horn (Acorde F5 - G#5 - C6 con modulación)
     */
    fun playAirHorn() {
        Thread {
            val freqs = doubleArrayOf(698.0, 830.0, 1046.0)
            val duration = 0.45
            val numSamples = (SAMPLE_RATE * duration).toInt()
            val buffer = ShortArray(numSamples)

            for (i in 0 until numSamples) {
                val t = i.toDouble() / SAMPLE_RATE
                val envelope = exp(-i.toDouble() / (SAMPLE_RATE * 0.15))
                var sample = 0.0
                for (f in freqs) {
                    // Dientes de sierra para trompeta brillante
                    sample += (2.0 * ((t * f) - floor(t * f + 0.5))) * (1.0 / freqs.size)
                }
                buffer[i] = (sample * envelope * Short.MAX_VALUE * 0.6).toInt().toShort()
            }

            playPcm(buffer)
        }.start()
    }

    private fun playPcm(buffer: ShortArray) {
        val audioTrack = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(SAMPLE_RATE)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(buffer.size * 2)
            .setTransferMode(AudioTrack.MODE_STATIC)
            .build()

        audioTrack.write(buffer, 0, buffer.size)
        audioTrack.play()
    }
}`,
  },
  {
    name: 'SalsaRadioService.kt',
    path: 'app/src/main/java/com/djcesardiaz/salsapoder/audio/SalsaRadioService.kt',
    language: 'kotlin',
    content: `package com.djcesardiaz.salsapoder.audio

import android.app.*
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.djcesardiaz.salsapoder.R

/**
 * Servicio de Audio en Primer Plano para Transmisión 24/7 de Salsa
 * Manejo de AudioAttributes, Reconexión Automática y Control de Volumen
 */
class SalsaRadioService : Service() {
    private var mediaPlayer: MediaPlayer? = null
    private var currentStreamUrl = "https://stream.zeno.fm/qmqnw2t6v68uv"

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        when (action) {
            ACTION_PLAY -> {
                val url = intent.getStringExtra(EXTRA_URL) ?: currentStreamUrl
                startStreaming(url)
            }
            ACTION_PAUSE -> pauseStreaming()
        }
        return START_STICKY
    }

    private fun startStreaming(url: String) {
        mediaPlayer?.release()
        mediaPlayer = MediaPlayer().apply {
            setAudioAttributes(
                AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .build()
            )
            setDataSource(url)
            setOnPreparedListener { start() }
            setOnErrorListener { _, _, _ ->
                // Reconexión automática
                startStreaming(url)
                true
            }
            prepareAsync()
        }
        startForeground(NOTIFICATION_ID, createNotification("Sonando en Vivo 24/7"))
    }

    private fun pauseStreaming() {
        mediaPlayer?.pause()
        stopForeground(STOP_FOREGROUND_DETACH)
    }

    private fun createNotification(status: String): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("DJ César Díaz — Salsa Poder")
            .setContentText(status)
            .setSmallIcon(R.drawable.ic_vinyl_disc)
            .setOngoing(true)
            .build()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        const val ACTION_PLAY = "ACTION_PLAY"
        const val ACTION_PAUSE = "ACTION_PAUSE"
        const val EXTRA_URL = "EXTRA_URL"
        const val NOTIFICATION_ID = 1001
        const val CHANNEL_ID = "salsa_radio_channel"
    }
}`,
  },
  {
    name: 'Turntable.kt',
    path: 'app/src/main/java/com/djcesardiaz/salsapoder/ui/components/Turntable.kt',
    language: 'kotlin',
    content: `package com.djcesardiaz.salsapoder.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

/**
 * Tornamesa Animada en Jetpack Compose
 * - Disco de vinilo que rota a 33 RPM
 * - Surcos concéntricos en Canvas
 * - Brazo fonocaptor que se posiciona sobre el vinilo al sonar
 */
@Composable
fun Turntable(
    isPlaying: Boolean,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "vinyl_spin")
    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(1800, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "rotation"
    )

    val armRotation by animateFloatAsState(
        targetValue = if (isPlaying) 25f else 0f,
        animationSpec = spring(stiffness = Spring.StiffnessLow),
        label = "arm"
    )

    Surface(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(1f),
        color = Color(0xFF140A20),
        shape = RoundedCornerShape(24.dp)
    ) {
        Box(contentAlignment = Alignment.Center) {
            // Vinilo giratorio
            Canvas(
                modifier = Modifier
                    .fillMaxSize(0.85f)
                    .rotate(if (isPlaying) rotation else 0f)
            ) {
                // Base del vinilo
                drawCircle(color = Color(0xFF0F0B14))
                // Surcos concéntricos
                for (r in listOf(0.9f, 0.8f, 0.7f, 0.6f, 0.5f)) {
                    drawCircle(
                        color = Color(0x22FFFFFF),
                        radius = size.minDimension / 2 * r,
                        style = Stroke(width = 1.dp.toPx())
                    )
                }
                // Etiqueta central 'SALSA'
                drawCircle(
                    color = Color(0xFFE91E63),
                    radius = size.minDimension / 2 * 0.32f
                )
            }
        }
    }
}`,
  },
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.djcesardiaz.salsapoder">

    <!-- Permisos para streaming de radio y conectividad -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_vinyl_disc"
        android:label="DJ César Díaz — Salsa Poder"
        android:roundIcon="@drawable/ic_vinyl_disc"
        android:supportsRtl="true"
        android:theme="@style/Theme.SalsaPoder">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize"
            android:theme="@style/Theme.SalsaPoder">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".audio.SalsaRadioService"
            android:foregroundServiceType="mediaPlayback"
            android:exported="false" />
    </application>
</manifest>`,
  },
];

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_SOURCE_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#12071E] rounded-3xl border border-white/20 flex flex-col overflow-hidden shadow-2xl">
        
        {/* Barra superior del visor de código */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1B0E2A] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-tight flex items-center gap-2">
                <span>Código Fuente Android Jetpack Compose</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  KOTLIN & MATERIAL 3
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Arquitectura nativa con AudioTrack PCM, MediaPlayer Service y WindowInsets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selector de Archivos (Pestañas horizontales estilo IDE) */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0E0517] border-b border-white/5 overflow-x-auto">
          {ANDROID_SOURCE_FILES.map((file) => {
            const isSelected = selectedFile.name === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1E1030] text-[#00E5FF] border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Visor de Código */}
        <div className="flex-1 overflow-auto p-4 bg-[#0A0510] font-mono text-xs text-slate-200">
          <div className="text-[11px] text-slate-500 mb-2 border-b border-white/5 pb-1">
            Ubicación: <span className="text-[#FFC107]">{selectedFile.path}</span>
          </div>
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">
            <code>{selectedFile.content}</code>
          </pre>
        </div>

        {/* Pie de acciones (Copiar y Descargar archivo) */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#160A24] border-t border-white/10 text-xs">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Listo para compilar en Android Studio Iguana / Jellyfish (Kotlin 2.0+)
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-bold transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar {selectedFile.name}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
