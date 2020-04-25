#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include <iostream>
#define CV_MINMAX   32
using namespace cv;
using namespace std;
class fastFourierTransform {
	public:
		fastFourierTransform() {
			if (isInitialized)
				return;
			else {
				isInitialized = true;
			}
		}
			int applyDFT(Mat image) {
				if (image.empty())
					return -1;
				Mat padded; //expand input image to optimal size
				int m = getOptimalDFTSize(image.rows);
				int n = getOptimalDFTSize(image.cols); // on the border add zero values
				copyMakeBorder(image, padded, 0, m - image.rows, 0, n - image.cols, BORDER_CONSTANT, Scalar::all(0));
				Mat planes[] = { Mat_<float>(padded), Mat::zeros(padded.size(), CV_32F) };
				Mat complexI;
				merge(planes, 2, complexI); // Add to the expanded another plane with zeros
				dft(complexI, complexI); // this way the result may fit in the source matrix
				split(complexI, planes); // planes[0] = Re(DFT(I), planes[1] = Im(DFT(I))
				magnitude(planes[0], planes[1], planes[0]);// planes[0] = magnitude
				Mat magI = planes[0];
				magI += Scalar::all(1); // switch to logarithmic scale
				log(magI, magI);
				magI = magI(Rect(0, 0, magI.cols & -2, magI.rows & -2));
				int cx = magI.cols / 2;
				int cy = magI.rows / 2;
				Mat q0(magI, Rect(0, 0, cx, cy)); // Top-Left - Create a ROI per quadrant
				Mat q1(magI, Rect(cx, 0, cx, cy)); // Top-Right
				Mat q2(magI, Rect(0, cy, cx, cy)); // Bottom-Left
				Mat q3(magI, Rect(cx, cy, cx, cy)); // Bottom-Right
				Mat tmp; // swap quadrants (Top-Left with Bottom-Right)
				q0.copyTo(tmp);
				q3.copyTo(q0);
				tmp.copyTo(q3);
				q1.copyTo(tmp); // swap quadrant (Top-Right with Bottom-Left)
				q2.copyTo(q1);
				tmp.copyTo(q2);
				normalize(magI, magI, 0, 1,  CV_MINMAX); // Transform the matrix with float values into a
			}
		
	private:
		bool isInitialized = false;
};