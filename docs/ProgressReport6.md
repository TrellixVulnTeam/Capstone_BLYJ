# Progress Report 6

## Summary of Work Completed

Required steps to get OpenCV working:
1. Download Visual Studio
2. Download OpenCV
3. Add OpenCV 14 bin file to path (\[YOUR_PATH\]\opencv\build\x64\vc14\bin)
4. In VS, create a console project and add a source file w/ OpenCV stuff
  - I'd recomment looking in (\[YOUR_PATH\]\opencv\sources\samples\cpp)
    - I used videocapture_basic.cpp
5. Right click on the project in the solution explorer and open properties. (Make sure you're on Debug and x64)
  - In C/C++ -> General, Add (\[YOUR_PATH\]\opencv\build\include) to "Additional Include Directories"
  - In Linker -> General, Add (\[YOUR_PATH\]\opencv\build\x64\vc14\lib) to "Additional Library Directories"
  - In Linker -> Input, Add opencv_world420d.lib to "Additional Dependencies"

### Goals completed this week

List goals from last week that were completed this week

### Goals not met this week

List goals from last week that were not completed and why

### Challenges faced this week

List challenges faced this week and how you plan to overcome them next week

### Goals for next week

List goals for next week. You will reference these in your next week's progress report.

## Individual Member Contributions

For each group member, list the individual contributions, and a link to proof in the form of a commit to your group repository. At the end, provide an estimate for how many hours these contributions took to complete.

### Evan Hruskar

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### Felix Quintana

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### Jitong Ding

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### William Chen

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs
