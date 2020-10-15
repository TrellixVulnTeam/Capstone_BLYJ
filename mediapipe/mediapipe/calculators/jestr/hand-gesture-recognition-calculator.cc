// Evan Hruskar (ezh221)
// DISCLAIMER: The majority of this is not my own code, and is from the tutorial here
// https://gist.github.com/TheJLifeX/74958cc59db477a91837244ff598ef4a


#include <cmath>
#include <cstdlib>
#include <chrono>
#include "mediapipe/framework/calculator_framework.h"
#include "mediapipe/framework/formats/landmark.pb.h"
#include "mediapipe/framework/formats/rect.pb.h"

namespace mediapipe{

	namespace{
		constexpr char normRectTag[] = "NORM_RECT";
	constexpr char normalizedLandmarkListTag[] = "NORM_LANDMARKS";
	constexpr char recognizedHandGestureTag[] = "RECOGNIZED_HAND_GESTURE";
	constexpr char recognizedHandMouvementScrollingTag[] = "RECOGNIZED_HAND_MOUVEMENT_SCROLLING";
	constexpr char recognizedHandMouvementZoomingTag[] = "RECOGNIZED_HAND_MOUVEMENT_ZOOMING";
	constexpr char recognizedHandMouvementSlidingTag[] = "RECOGNIZED_HAND_MOUVEMENT_SLIDING";
	} // namespace

// Graph config:
//
// node {
//   calculator: "HandGestureRecognitionCalculator"
//   input_stream: "NORM_LANDMARKS:scaled_landmarks"
//   input_stream: "NORM_RECT:hand_rect_for_next_frame"
//   output_stream: "RECOGNIZED_HAND_MOUVEMENT_SCROLLING:recognized_hand_mouvement_scrolling"
//   output_stream: "RECOGNIZED_HAND_MOUVEMENT_ZOOMING:recognized_hand_mouvement_zooming"
//   output_stream: "RECOGNIZED_HAND_MOUVEMENT_SLIDING:recognized_hand_mouvement_sliding"
// }
class HandGestureRecognitionCalculator : public CalculatorBase
{
public:
    static ::mediapipe::Status GetContract(CalculatorContract *cc);
    ::mediapipe::Status Open(CalculatorContext *cc) override;

    ::mediapipe::Status Process(CalculatorContext *cc) override;

private:
    int lastDesktop = 0;
    float previous_x_center;
    float previous_y_center;
    float previous_angle; //angle between x and y axis in radians
    float previous_rectangle_width;
    float previous_rectangle_height;
    std::chrono::time_point<std::chrono::high_resolution_clock> lastChangeTime = std::chrono::high_resolution_clock::now();
    void switch_desktop(int desktopIndex)
    {
        // If we're not currently on that desktop, and we've passed a timer limit
        auto currentTime = std::chrono::high_resolution_clock::now();
        auto timeDiff = std::chrono::duration_cast<std::chrono::milliseconds>(currentTime - lastChangeTime);
        LOG(INFO) << "desktopIndex: " << desktopIndex << " currentDesktop: " << lastDesktop << " timeDiff: " << timeDiff.count() << std::endl;
        if (desktopIndex != lastDesktop && timeDiff.count() > 2000) {
            char buff[100];
            snprintf(buff, sizeof(buff), "wmctrl -s %d", desktopIndex);
            LOG(INFO) << "System Command: " << buff << std::endl;
            std::system(buff);
            lastDesktop = desktopIndex;
            lastChangeTime = currentTime;
        }
    }

    float get_Euclidean_DistanceAB(float a_x, float a_y, float b_x, float b_y)
    {
        float dist = std::pow(a_x - b_x, 2) + pow(a_y - b_y, 2);
        return std::sqrt(dist);
    }

    bool isThumbNearFirstFinger(NormalizedLandmark point1, NormalizedLandmark point2)
    {
        float distance = this->get_Euclidean_DistanceAB(point1.x(), point1.y(), point2.x(), point2.y());
        return distance < 0.1;
    }
    float getAngleABC(float a_x, float a_y, float b_x, float b_y, float c_x, float c_y){
    	float ab_x = b_x - a_x;
	float ab_y = b_y - a_y;
	float cb_x = b_x - c_x;
	float cb_y = b_y - c_y;
	float dot = (ab_x * cb_x + ab_y * cb_y); //dot product
	float cross = (ab_x * cb_y - ab_y * cb_x); // cross product
	float theta = std::atan2(cross, dot);
	return theta;
    }
    int radianToDegree(float radian){
    	return (int)floor(radian * 180. / M_PI + 0.5);
    }
};

REGISTER_CALCULATOR(HandGestureRecognitionCalculator);

::mediapipe::Status HandGestureRecognitionCalculator::GetContract(
    CalculatorContract *cc)
{
    RET_CHECK(cc->Inputs().HasTag(normalizedLandmarkListTag));
    cc->Inputs().Tag(normalizedLandmarkListTag).Set<mediapipe::NormalizedLandmarkList>();

    RET_CHECK(cc->Inputs().HasTag(normRectTag));
    cc->Inputs().Tag(normRectTag).Set<NormalizedRect>();

    RET_CHECK(cc->Outputs().HasTag(recognizedHandGestureTag));
    cc->Outputs().Tag(recognizedHandGestureTag).Set<std::string>();

    RET_CHECK(cc->Outputs().HasTag(recognizedHandMouvementScrollingTag));
        cc->Outputs().Tag(recognizedHandMouvementScrollingTag).Set<std::string>();

    RET_CHECK(cc->Outputs().HasTag(recognizedHandMouvementZoomingTag));
    cc->Outputs().Tag(recognizedHandMouvementZoomingTag).Set<std::string>();

    RET_CHECK(cc->Outputs().HasTag(recognizedHandMouvementSlidingTag));
    cc->Outputs().Tag(recognizedHandMouvementSlidingTag).Set<std::string>();
    return ::mediapipe::OkStatus();
}

::mediapipe::Status HandGestureRecognitionCalculator::Open(
    CalculatorContext *cc)
{
    lastDesktop = 0;
    lastChangeTime = std::chrono::high_resolution_clock::now();
    cc->SetOffset(TimestampDiff(0));
    return ::mediapipe::OkStatus();
}

::mediapipe::Status HandGestureRecognitionCalculator::Process(
    CalculatorContext *cc)
{
    std::string *recognized_hand_gesture;

    // hand closed (red) rectangle
    const auto rect = &(cc->Inputs().Tag(normRectTag).Get<NormalizedRect>());
    float width = rect->width();
    float height = rect->height();
    const float x_center = rect->x_center();
    const float y_center = rect->y_center();
    Counter *frameCounter = cc->GetCounter("HandMouvementRecognitionCalculator");
    frameCounter->Increment();
    std::string *recognized_hand_mouvement_scrolling = new std::string("___");
    std::string *recognized_hand_mouvement_zooming = new std::string("___");
    std::string *recognized_hand_mouvement_sliding = new std::string("___");
    if (width < 0.01 || height < 0.01)
    {
        // LOG(INFO) << "No Hand Detected";
        recognized_hand_gesture = new std::string("___");
        cc->Outputs()
            .Tag(recognizedHandGestureTag)
            .Add(recognized_hand_gesture, cc->InputTimestamp());
        return ::mediapipe::OkStatus();
    }

    const auto &landmarkList = cc->Inputs()
                                   .Tag(normalizedLandmarkListTag)
                                   .Get<mediapipe::NormalizedLandmarkList>();
    RET_CHECK_GT(landmarkList.landmark_size(), 0) << "Input landmark vector is empty.";

    // finger states
    bool thumbIsOpen = false;
    bool firstFingerIsOpen = false;
    bool secondFingerIsOpen = false;
    bool thirdFingerIsOpen = false;
    bool fourthFingerIsOpen = false;
    //
            if (this->previous_x_center)
        {
            const float mouvementDistance = this->get_Euclidean_DistanceAB(x_center, y_center, this->previous_x_center, this->previous_y_center);
            // LOG(INFO) << "Distance: " << mouvementDistance;

            const float mouvementDistanceFactor = 0.02; // only large mouvements will be recognized.

            // the height is normed [0.0, 1.0] to the camera window height. 
            // so the mouvement (when the hand is near the camera) should be equivalent to the mouvement when the hand is far.
            const float mouvementDistanceThreshold = mouvementDistanceFactor * height;
            if (mouvementDistance > mouvementDistanceThreshold)
            {
                const float angle = this->radianToDegree(this->getAngleABC(x_center, y_center, this->previous_x_center, this->previous_y_center, this->previous_x_center + 0.1, this->previous_y_center));
                // LOG(INFO) << "Angle: " << angle;
                if (angle >= -45 && angle < 45)
                {
                    recognized_hand_mouvement_scrolling = new std::string("Scrolling right");
                }
                else if (angle >= 45 && angle < 135)
                {
                    recognized_hand_mouvement_scrolling = new std::string("Scrolling up");
                }
                else if (angle >= 135 || angle < -135)
                {
                    recognized_hand_mouvement_scrolling = new std::string("Scrolling left");
                }
                else if (angle >= -135 && angle < -45)
                {
                    recognized_hand_mouvement_scrolling = new std::string("Scrolling down");
                }
            }
        }
        this->previous_x_center = x_center;
        this->previous_y_center = y_center;
	 // 2. FEATURE - Zoom in/out
        if (this->previous_rectangle_height)
        {
            const float heightDifferenceFactor = 0.03;

            // the height is normed [0.0, 1.0] to the camera window height.
            // so the mouvement (when the hand is near the camera) should be equivalent to the mouvement when the hand is far.
            const float heightDifferenceThreshold = height * heightDifferenceFactor;
            if (height < this->previous_rectangle_height - heightDifferenceThreshold)
            {
                recognized_hand_mouvement_zooming = new std::string("Zoom out");
            }
            else if (height > this->previous_rectangle_height + heightDifferenceThreshold)
            {
                recognized_hand_mouvement_zooming = new std::string("Zoom in");
            }
        }
        this->previous_rectangle_height = height;

        // 3. FEATURE - Slide left / right
        if (frameCounter->Get() % 2 == 0) // each odd Frame is skipped. For a better result.
        {
            NormalizedLandmark wrist = landmarkList.landmark(0);
            NormalizedLandmark MCP_of_second_finger = landmarkList.landmark(9);

            // angle between the hand (wirst and MCP) and the x-axis.
            const float ang_in_radian = this->getAngleABC(MCP_of_second_finger.x(), MCP_of_second_finger.y(), wrist.x(), wrist.y(), wrist.x() + 0.1, wrist.y());
            const int ang_in_degree = this->radianToDegree(ang_in_radian);
            // LOG(INFO) << "Angle: " << ang_in_degree;
            if (this->previous_angle)
            {
                const float angleDifferenceTreshold = 12;
                if (this->previous_angle >= 80 && this->previous_angle <= 100)
                {
                    if (ang_in_degree > this->previous_angle + angleDifferenceTreshold)
                    {
                        recognized_hand_mouvement_sliding = new std::string("Slide left");
                        LOG(INFO) << *recognized_hand_mouvement_sliding;
                    }
                    else if (ang_in_degree < this->previous_angle - angleDifferenceTreshold)
                    {
                        recognized_hand_mouvement_sliding = new std::string("Slide right");
                        LOG(INFO) << *recognized_hand_mouvement_sliding;
                    }
                }
            }
            this->previous_angle = ang_in_degree;
	}
    float pseudoFixKeyPoint = landmarkList.landmark(2).x();
    if (landmarkList.landmark(3).x() < pseudoFixKeyPoint && landmarkList.landmark(4).x() < pseudoFixKeyPoint)
    {
        thumbIsOpen = true;
    }

    pseudoFixKeyPoint = landmarkList.landmark(6).y();
    if (landmarkList.landmark(7).y() < pseudoFixKeyPoint && landmarkList.landmark(8).y() < pseudoFixKeyPoint)
    {
        firstFingerIsOpen = true;
    }

    pseudoFixKeyPoint = landmarkList.landmark(10).y();
    if (landmarkList.landmark(11).y() < pseudoFixKeyPoint && landmarkList.landmark(12).y() < pseudoFixKeyPoint)
    {
        secondFingerIsOpen = true;
    }

    pseudoFixKeyPoint = landmarkList.landmark(14).y();
    if (landmarkList.landmark(15).y() < pseudoFixKeyPoint && landmarkList.landmark(16).y() < pseudoFixKeyPoint)
    {
        thirdFingerIsOpen = true;
    }

    pseudoFixKeyPoint = landmarkList.landmark(18).y();
    if (landmarkList.landmark(19).y() < pseudoFixKeyPoint && landmarkList.landmark(20).y() < pseudoFixKeyPoint)
    {
        fourthFingerIsOpen = true;
    }

    // Hand gesture recognition
    if (thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("FIVE");
    }
    else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("FOUR");
        switch_desktop(3);
    }
    else if (thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("TREE");
        switch_desktop(2);
    }
    else if (thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("TWO");
        switch_desktop(1);
    }
    else if (!thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("ONE");
        switch_desktop(0);
    }
    else if (!thumbIsOpen && firstFingerIsOpen && secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("YEAH");
    }
    else if (!thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("ROCK");
    }
    else if (thumbIsOpen && firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("SPIDERMAN");
    }
    else if (!thumbIsOpen && !firstFingerIsOpen && !secondFingerIsOpen && !thirdFingerIsOpen && !fourthFingerIsOpen)
    {
        recognized_hand_gesture = new std::string("FIST");
    }
    else if (!firstFingerIsOpen && secondFingerIsOpen && thirdFingerIsOpen && fourthFingerIsOpen && this->isThumbNearFirstFinger(landmarkList.landmark(4), landmarkList.landmark(8)))
    {
        recognized_hand_gesture = new std::string("OK");
    }
    else
    {
        recognized_hand_gesture = new std::string("___");
        LOG(INFO) << "Finger States: " << thumbIsOpen << firstFingerIsOpen << secondFingerIsOpen << thirdFingerIsOpen << fourthFingerIsOpen;       
    }
    LOG(INFO) << recognized_hand_gesture->c_str();

    cc->Outputs()
        .Tag(recognizedHandGestureTag)
        .Add(recognized_hand_gesture, cc->InputTimestamp());

    cc->Outputs()
        .Tag(recognizedHandMouvementScrollingTag)
        .Add(recognized_hand_mouvement_scrolling, cc->InputTimestamp());

    cc->Outputs()
        .Tag(recognizedHandMouvementZoomingTag)
        .Add(recognized_hand_mouvement_zooming, cc->InputTimestamp());

    cc->Outputs()
        .Tag(recognizedHandMouvementSlidingTag)
        .Add(recognized_hand_mouvement_sliding, cc->InputTimestamp());
    return ::mediapipe::OkStatus();
} // namespace mediapipe

} // namespace mediapipe
