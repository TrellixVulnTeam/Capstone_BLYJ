#include <opencv2/core.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <iostream>
#include <stdio.h>
using namespace cv;
using namespace std;
class videoCapture {
public:
    videoCapture(int apiID, int deviceID = 0) {
        if (isInitialized) {
            cout << "Already initialized";
        }
        else {
            cap.open(deviceID + apiID);
            if (!cap.isOpened()) {
                cerr << "ERROR! Unable to open camera\n";
            }
        }
    }
    int capture(int numOfFrames) {
        int count = 0;
        for (int i = 0; i < numOfFrames; i++) {
            cap.read(frame);
            if (frame.empty()) {
                cerr << "ERROR! blank frame grabbed\n";
                break;
            }
            cv::cvtColor(frame, grayframe, cv::COLOR_BGR2GRAY);
            // show live and wait for a key with timeout long enough to show images
            imshow("Live", grayframe);
            string path = "/Users/felix/test";
            path = path + char(++count) + ".png";
            if (waitKey(5) >= 0) {
                cv::imwrite(path, frame);
                waitKey(5);
            }
        }
        return 0;

    }
private:
    bool isInitialized = false;
    Mat frame;
    VideoCapture cap;
    Mat grayframe;
};
/*int main(int, char**) {

    videoCapture video(0, cv::CAP_ANY);
    video.capture(1000);
}*/