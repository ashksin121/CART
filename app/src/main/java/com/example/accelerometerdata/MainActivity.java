package com.example.accelerometerdata;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor gyroscope,gravity,linear_accelerometer,magnetometer;
    private TextView acc,gyro,gra,magnet;

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

    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {

        Sensor t = sensorEvent.sensor;
        if(t.equals(gravity)) {
            gra.setText("Gravity\n" + sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");
        }else if(t.equals(linear_accelerometer)){
            acc.setText("Accelerometer\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");
        }else if(t.equals(magnetometer)){
            magnet.setText("Magnetometer\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");
        }else{
            gyro.setText("Gyroscope\n"+sensorEvent.values[0] + "\n" + sensorEvent.values[1] + "\n" + sensorEvent.values[2] + "\n");
        }

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}