# cc_binary(
#     name = "jestr_cpu",
#     deps = [
#         "//mediapipe/examples/desktop:demo_run_graph_main",
#         "//mediapipe/graphs/hand_tracking:desktop_tflite_calculators",
#     ],
# )

# # Linux only
# cc_binary(
#     name = "jestr_gpu",
#     deps = [
#         "//mediapipe/examples/desktop:demo_run_graph_main_gpu",
#         "//mediapipe/graphs/hand_tracking:mobile_calculators",
#     ],
# )

# # Linux only
# cc_library(
#     name = "jestr_calculator",
#     srcs = ["jestr_calculator.cc"],
#     visibility = ["//visibility:public"],
#     deps = [
#         "//mediapipe/framework:calculator_framework",
#         "//mediapipe/framework/formats:landmark_cc_proto",
#         "//mediapipe/framework/port:status",
#         "//mediapipe/framework/formats:rect_cc_proto",
#         "//mediapipe/framework/port:ret_check",
#     ],
#     alwayslink = 1,
# )
package(default_visibility = ["//visibility:public"])

cc_library(
    name = "hand-gesture-recognition-calculator",
    srcs = ["hand-gesture-recognition-calculator.cc"],
    visibility = ["//visibility:public"],
    deps = [
        "//mediapipe/framework:calculator_framework",
        "//mediapipe/framework/formats:landmark_cc_proto",
        "//mediapipe/framework/port:status",
        "//mediapipe/framework/formats:rect_cc_proto",
        "//mediapipe/framework/port:ret_check",
    ],
    alwayslink = 1,
)


