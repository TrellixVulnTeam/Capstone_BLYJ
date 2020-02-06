#include <ADC.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>

ADC* adc;
Adafruit_BNO055 gyro;
int transmitters[14] = {31, 30, 29, 28, 27, 26, 25, 8, 7, 6, 5, 4, 3, 2};
int receivers[14] = {A15, A16, A17, A19, A20, A21, A22, A1, A2, A3, A6, A7, A8, A9};


void setup() {
    Serial.begin(115200);
    configureADC();
    setupTransmitters();
    setupReceivers();
    setupbno();
    readyUp();
}

void loop() {

    if (Serial.available() > 0) {
        while (Serial.available() > 0) Serial.read();

        for (int i = 0; i < 14; i++) {
          
            digitalWrite(transmitters[i], HIGH);
            Serial.write((byte)0xBE);
            Serial.write((byte)0xEF);
            Serial.write((byte)i);

            for (int i = 0; i < 10; i++) {
                sensors_event_t event;
                gyro.getEvent(&event);
                Serial.print(event.orientation.x, 4);
                Serial.print(event.orientation.y, 4);
                Serial.print(event.orientation.z, 4);
            }

            for (int i = 0; i < 14; i++) {
                uint16_t value = adc->analogRead(receivers[i]);
                uint8_t first_half = value >> 8;
                uint8_t second_half = value & B11111111;
                Serial.write(second_half);
                Serial.write(first_half);
            }
            
            digitalWrite(transmitters[i], LOW);
            
        }
    }

}

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

void configureADC() {
    adc = new ADC();

    adc->setAveraging(16); // set number of averages
    adc->setResolution(16); // set bits of resolution
    adc->setConversionSpeed(ADC_CONVERSION_SPEED::MED_SPEED);
    adc->setSamplingSpeed(ADC_SAMPLING_SPEED::MED_SPEED);

    adc->setAveraging(16, ADC_1); // set number of averages
    adc->setResolution(16, ADC_1); // set bits of resolution
    adc->setConversionSpeed(ADC_CONVERSION_SPEED::MED_SPEED, ADC_1); // change the conversion speed
    adc->setSamplingSpeed(ADC_SAMPLING_SPEED::MED_SPEED, ADC_1); // change the sampling speed

}
void setupTransmitters() {
    for (int i = 0; i < 14; i++) {
        pinMode(transmitters[i], OUTPUT);
        digitalWrite(transmitters[i], LOW);
    }
}

void setupReceivers() {
    for (int i = 0; i < 14; i++) {
        pinMode(receivers[i], INPUT);
    }
}

void setupbno() {
    gyro = Adafruit_BNO055(55);
    gyro.setExtCrystalUse(true);
}

void readyUp() {

    for (int i = 0; i < 14; i++) {
        digitalWrite(transmitters[i], HIGH);
        delay(100);
        digitalWrite(transmitters[i], LOW);
    }

    // signal ready
    int BOARD_LED = 13;
    pinMode(BOARD_LED, OUTPUT);
    digitalWrite(BOARD_LED, HIGH);
}
