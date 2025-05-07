from hashlib import sha3_384
import cv2
import enum
import mediapipe as mp

mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils
# import time  
# # importing os module  
# import os
# import inspect

class FaceKeyPoint(enum.IntEnum):
#   """The enum type of the six face detection key points."""
  RIGHT_EYE = 0
  LEFT_EYE = 1
  NOSE_TIP = 2
  MOUTH_CENTER = 3
  RIGHT_EAR_TRAGION = 4
  LEFT_EAR_TRAGION = 5

def get_direction_of_person():
    cap = cv2.VideoCapture(0)
    with mp_face_detection.FaceDetection(min_detection_confidence=0.5) as face_detection:
        # For webcam input, use 0 as the video source.
        # For video file input, use the file path as the video source.
        # cap = cv2.VideoCapture('path_to_video.mp4')
        while cap.isOpened():
            success, image = cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                # If loading a video, use 'break' instead of 'continue'.
                continue

            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            image.flags.writeable = False
            # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = face_detection.process(image)

            # Draw the face detection annotations on the image.
            # image.flags.writeable = True
            image = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
            if results.detections:
                for detection in results.detections:
                    mp_drawing.draw_detection(image, detection)
                    # get dimensions of image
                    dimensions = image.shape
                    
                    # height, width, number of channels in image
                    height = image.shape[0]
                    width = image.shape[1]
                    
                    print('Image Dimension    : ',dimensions)
                    print('Image Height       : ',height)
                    print('Image Width        : ',width)


                    # Convert the normalized points to actual points on the image according to height and width
                    nose_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.NOSE_TIP).x * width
                    # nose_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.NOSE_TIP).y * height
                    right_ear_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.RIGHT_EAR_TRAGION).x * width
                    # right_ear_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EAR_TRAGION).y * height
                    left_ear_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.LEFT_EAR_TRAGION).x * width
                    # left_ear_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EAR_TRAGION).y * height
                    if left_ear_x < nose_x:
                        print("TOO TO THE LEFT")
                    if right_ear_x > nose_x:
                        print("TOO TO THE RIGHT")
                    # left_eye_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EYE).x * width
                    # left_eye_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EYE).y * height
                    # right_ear_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EYE).x * width
                    # right_ear_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EYE).y * height
                    # mouth_center_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER).x * width
                    # mouth_center_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER).y * height
            else:
                print("NO FACE")
            # Flip the image horizontally for a selfie-view display.
            cv2.imshow('MediaPipe Face Detection', cv2.flip(image, 1))
            if cv2.waitKey(5) & 0xFF == 27:
                break
    cap.release()
# Position of camera is directyly by the side
def is_in_right_direction(img,  shoulder_x1,shoulder_x2, waist_x1):
    # Cropped Image
    # if waist_x1 > shoulder_x1:
    #     return False    
    # return True
    return waist_x1 <= shoulder_x1

def is_person_facing_front(img, shoulder_x1, shoulder_y1,  shoulder_x2, shoulder_y2):
    # Cropped Image
    if shoulder_x1 > shoulder_x2:
        return False    
    # image = img[0:shoulder_y1, shoulder_x1:shoulder_x2]
    cropped_img = img[0:shoulder_y1, shoulder_x1:shoulder_x2]
    with mp_face_detection.FaceDetection(min_detection_confidence=0.5) as face_detection:
        # Convert the BGR image to RGB and process it with MediaPipe Face Detection.
        results = face_detection.process(cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB))
        # If there is no face at all return False
        if not results.detections:
            print("NO DETECTIONS")
            return False
        
        for detection in results.detections:
            height = cropped_img.shape[0]
            width = cropped_img.shape[1]                 
            dimensions = cropped_img.shape                    
            print('Image Dimension    : ',dimensions)
            print('Image Height       : ',height)
            print('Image Width        : ',width)
            nose_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.NOSE_TIP).x * width
            # nose_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.NOSE_TIP).y * height
            right_ear_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.RIGHT_EAR_TRAGION).x * width
            # right_ear_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EAR_TRAGION).y * height
            left_ear_x = mp_face_detection.get_key_point(detection, FaceKeyPoint.LEFT_EAR_TRAGION).x * width
            # left_ear_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EAR_TRAGION).y * height
            # left_eye_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EYE).x * width
            # left_eye_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EYE).y * height
            # right_eye_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EYE).x * width
            # right_eye_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EYE).y * height
            # mouth_center_x_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER).x * width
            # mouth_center_y_axis = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER).y * height
            if left_ear_x < nose_x:
                print("TOO TO THE LEFT")
                cv2.imshow("Image", cropped_img)
                return False
            if right_ear_x > nose_x:
                print("TOO TO THE RIGHT")
                cv2.imshow("Image", cropped_img)
                return False
            print("FACING FOWARD")
            cv2.imshow("Image", cropped_img)
            return True