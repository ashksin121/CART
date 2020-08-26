package com.example.accelerometerdata;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.TextView;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor gyroscope,gravity,linear_accelerometer,magnetometer;
    private TextView acc,gyro,gra,magnet;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    final CollectionReference cities = db.collection("sensors");
    final Map<String, ArrayList> data1 = new HashMap<>();
    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        acc = findViewById(R.id.accel);
        gyro = findViewById(R.id.gyro);
        gra = findViewById(R.id.gravity);
        magnet = findViewById(R.id.magnet);

        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        gyroscope = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        gravity = sensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY);
        linear_accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION);
        magnetometer = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        sensorManager.registerListener(MainActivity.this,gravity,SensorManager.SENSOR_DELAY_NORMAL);
        sensorManager.registerListener(MainActivity.this,gyroscope,SensorManager.SENSOR_DELAY_NORMAL);
        sensorManager.registerListener(MainActivity.this,linear_accelerometer,SensorManager.SENSOR_DELAY_NORMAL);
        sensorManager.registerListener(MainActivity.this,magnetometer,SensorManager.SENSOR_DELAY_NORMAL);

        mRunnable.run();
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {

        Sensor t = sensorEvent.sensor;
        if(t.equals(gravity)) {
            gra.setText("Gravity\n" + sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");

            ArrayList arr=new ArrayList();
            arr.add(sensorEvent.values[0]);arr.add(sensorEvent.values[1]);arr.add(sensorEvent.values[2]);
            data1.put("gravity",arr);

        }else if(t.equals(linear_accelerometer)){
            acc.setText("Accelerometer\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");

            ArrayList arr=new ArrayList();
            arr.add(sensorEvent.values[0]);arr.add(sensorEvent.values[1]);arr.add(sensorEvent.values[2]);
            data1.put("accelerometer",arr);

        }else if(t.equals(magnetometer)){
            magnet.setText("Magnetometer\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");

            ArrayList arr=new ArrayList();
            arr.add(sensorEvent.values[0]);arr.add(sensorEvent.values[1]);arr.add(sensorEvent.values[2]);
            data1.put("magnetometer",arr);

        }else{
            gyro.setText("Gyroscope\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");

            ArrayList arr=new ArrayList();
            arr.add(sensorEvent.values[0]);arr.add(sensorEvent.values[1]);arr.add(sensorEvent.values[2]);
            data1.put("gyroscope",arr);

        }
//        cities.document("sensors").set(data1);

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    private Runnable mRunnable = new Runnable() {
        @Override
        public void run() {
            Log.e("hello",data1+"");
            cities.document("sensorsdata").set(data1);
            handler.postDelayed(this,500);
        }
    };


}