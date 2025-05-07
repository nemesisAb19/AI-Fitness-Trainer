import cv2
import numpy as np
import time
from modules import PoseModule as pm
# import os
from modules.AudioCommSys import text_to_speech
import threading
import services.face_detection as face_det
# from services.camera import VideoCamera

class utilities:
    list_threads = []

    def __init__(self) -> None:
        pass

    def illustrate_exercise(self, example, exercise):
        seconds = 4
        # img = cv2.imread(example)
        # if img is None:
        #     raise FileNotFoundError(f"Could not read image from path: {example}")
        # img = cv2.resize(img, (980, 550))
        instruction = "Up next is " + exercise + " IN!"

        if exercise != "Warm Up":
            text_to_speech(instruction)
        while seconds > 0:
            # img = cv2.imread(example)
            # img = cv2.resize(img, (980, 550))
            # print("in here1")
            # time.sleep(1)
            blank_img = np.zeros((550, 980, 3), dtype=np.uint8)

            speaker_thread = threading.Thread(
                target=text_to_speech, args=(str(int(seconds))), kwargs={}
            )
            speaker_thread.start()
            speaker_thread.join()
            cv2.putText(
                blank_img,
                exercise + " in: " + str(int(seconds)),
                (350, 50),
                cv2.FONT_HERSHEY_PLAIN,
                3,
                (0, 0, 255),
                5,
            )
            ret, jpeg = cv2.imencode(".jpg", blank_img)
            print("yielding or naaaaaaa")
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + jpeg.tobytes() + b"\r\n\r\n"
            )
            time.sleep(1)
            seconds -= 1

    def repitition_counter(self, per, count, direction):
        # list_threads = []
        if per == 100 and direction == 0:
            count += 0.5
            direction = 1
        if per == 0 and direction == 1:
            count += 0.5
            direction = 0
            if int(count) != 0:
                print("here")
                speaker_thread = threading.Thread(
                    target=text_to_speech, args=(str(int(count)),), kwargs={}
                )
                # list_threads.append(speaker_thread)
                speaker_thread.start()
        return {"count": count, "direction": direction}
    
    def display_rep_count(self, img, count, total_reps):
    # Smaller white box at the top-left
        cv2.rectangle(img, (10, 10), (260, 80), (255, 255, 255), cv2.FILLED)

    # Draw the count text inside the box
        cv2.putText(
        img,
        f"{int(count)} / {total_reps}",
        (30, 60),  # Position inside the box
        cv2.FONT_HERSHEY_SIMPLEX,
        1.8,       # Font scale (smaller than 15!)
        (0, 0, 255),  # Red text
        4             # Thickness
    )
    def get_performance_bar_color(self, per):
        color = (0, 205, 205)
        if 0 < per <= 30:
            color = (51, 51, 255)
        if 30 < per <= 60:
            color = (0, 165, 255)
        if 60 <= per <= 100:
            color = (0, 255, 255)
        return color

    def position_info_floor_exercise(self, img, isRightPosition):
        if isRightPosition:
            cv2.putText(
                img,
                "Right Position",
                (20, 130),
                cv2.FONT_HERSHEY_SIMPLEX,
                3,
                (0, 0, 255),
                20,
            )
        else:
            cv2.putText(
                img,
                "Incorrect Position",
                (20, 130),
                cv2.FONT_HERSHEY_SIMPLEX,
                3,
                (0, 0, 255),
                20,
            )

    def position_info_standing_exercise(self, img, isRightPosition):
        if isRightPosition:
            cv2.putText(
                img,
                "Facing Forward",
                (600, 100),
                cv2.FONT_HERSHEY_SIMPLEX,
                3,
                (0, 0, 255),
                20,
            )
        else:
            cv2.putText(
                img,
                "Not Facing Foward",
                (600, 100),
                cv2.FONT_HERSHEY_SIMPLEX,
                3,
                (0, 0, 255),
                20,
            )
    def draw_performance_bar(self, img, per, bar, color, count):
        height, width = img.shape[:2]

# Define dynamic coordinates based on frame size
        bar_width = int(width * 0.03)
        bar_x1 = width - bar_width - 20
        bar_x2 = width - 20
        bar_top = int(height * 0.15)
        bar_bottom = int(height * 0.90)
        bar_fill = int(np.interp(per, (0, 100), (bar_bottom, bar_top)))

     # Draw border
        cv2.rectangle(img, (bar_x1, bar_top), (bar_x2, bar_bottom), color, 3)

# Draw fill
        cv2.rectangle(img, (bar_x1, bar_fill), (bar_x2, bar_bottom), color, cv2.FILLED)

# Draw percentage text
        cv2.putText(img, f"{int(per)}%", (bar_x1 - 10, bar_top - 10), cv2.FONT_HERSHEY_PLAIN, 2, color, 2,)

class simulate_target_exercies:
    def __init__(self, sets=1, rest_time=30, difficulty_level=1, reps=2):
        self.sets = sets
        self.reps = reps
        self.rest_time = rest_time
        self.difficulty_level = difficulty_level

    def bicep_curls(self):
        utils = utilities()
        for i in utils.illustrate_exercise("", "BICEP CURLS"):
            yield i

        print("Starting bicep curls session...")

        cap = cv2.VideoCapture(0)
        detector = pm.posture_detector()
        for current_set in range(1, self.sets + 1):
            print(f"Set {current_set}/{self.sets}")
            count = 0
            direction = 0
            start = time.process_time()
            total_reps = self.reps * self.difficulty_level

            while count < total_reps:
                success, img = cap.read()
                if not success:
                    break
                img = detector.find_person(img, False)
                landmark_list = detector.find_landmarks(img, False)
                if landmark_list:
                # Right arm angle for bicep curls
                    angle = detector.find_angle(img, 12, 14, 16)
                    per = np.interp(angle, (50, 160), (0, 100))
                    bar_pos = np.interp(per, (0, 100), (650, 100))
                    color = utils.get_performance_bar_color(per)
                # Rep counter logic
                    if per == 100 or per == 0:
                        color = (0, 255, 0)
                        rep = utils.repitition_counter(per, count, direction)
                        count = rep["count"]
                        direction = rep["direction"]
                # Draw performance bar
                    utils.draw_performance_bar(img, per, bar_pos, color, count)
                # Display UI elements
                    utils.display_rep_count(img, count, total_reps)
                    # utils.position_info_standing_exercise(img, True)  # Always assume correct facing

                # cv2.imshow("Bicep Curls", img)
                # if cv2.waitKey(1) & 0xFF == ord('q'):
                #     break
            
                ret, jpeg = cv2.imencode('.jpg', img)
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n'
                )



            # Optional: calories estimate
                # time_elapsed = int(time.process_time() - start)
                # calories_burned = (time_elapsed / 60) * ((4.0 * 3.5 * 64) / 200)
            
            print(f"Completed Set {current_set}")
            if current_set < self.sets:
                rest_start = time.time()
                while time.time() - rest_start < self.rest_time:
                    rest_img = np.zeros((720, 1280, 3), np.uint8)
                    cv2.putText(
                        rest_img,
                        f"Rest: {int(self.rest_time - (time.time() - rest_start))}s",
                        (500, 360),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        2,
                        (0, 255, 255),
                        4
                    )
                    # cv2.imshow("Rest", rest_img)
                    # if cv2.waitKey(1) & 0xFF == ord('q'):
                    #     break
                    ret, jpeg = cv2.imencode(".jpg", rest_img)
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n" + jpeg.tobytes() + b"\r\n\r\n"
                    )
                    time.sleep(1)

        cap.release()
        cv2.destroyAllWindows()


    
    #SQUATS
    def squats(self):
        utils = utilities()
        for i in utils.illustrate_exercise("", "SQUATS"):
            yield (i)
        cap = cv2.VideoCapture(0)

        # Optional: Set resolution
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        if not cap.isOpened():
            print("❌ Webcam could not be opened.")
            return

        detector = pm.posture_detector()
        for current_set in range(1, self.sets + 1):
            print(f"Set {current_set}/{self.sets}")
            count = 0
            direction = 0
            start = time.process_time()
            total_reps = self.reps * self.difficulty_level

            while count < total_reps:
                success, img = cap.read()

                if not success or img is None:
                    print("⚠️ Failed to capture frame. Skipping...")
                    continue

                img = detector.find_person(img, False)
                landmark_list = detector.find_landmarks(img, False)

                if len(landmark_list) != 0:
                    right_leg_angle = detector.find_angle(img, 24, 26, 28)
                    left_leg_angle = detector.find_angle(img, 23, 25, 27)

                    per = np.interp(left_leg_angle, (190, 240), (0, 100))
                    bar = np.interp(left_leg_angle, (190, 240), (650, 100))

                    color = utils.get_performance_bar_color(per)

                    if per == 100 or per == 0:
                        color = (0, 255, 0)
                        rep = utils.repitition_counter(per, count, direction)
                        count = rep["count"]
                        direction = rep["direction"]

                    utils.draw_performance_bar(img, per, bar, color, count)

                utils.display_rep_count(img, count, total_reps)

                # Always pass True for facing direction since we removed face check
                utils.position_info_standing_exercise(img, True)

                # try:
                #     cv2.imshow("Squats Live Test", img)
                #     if cv2.waitKey(1) & 0xFF == ord("q"):
                #         break
                # except Exception as e:
                #     print("❌ Error displaying frame:", str(e))
                #     break

                ret, jpeg = cv2.imencode('.jpg', img)
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n'
                )
            
            print(f"Completed Set {current_set}")
            if current_set < self.sets:
                rest_start = time.time()
                while time.time() - rest_start < self.rest_time:
                    rest_img = np.zeros((720, 1280, 3), np.uint8)
                    cv2.putText(
                        rest_img,
                        f"Rest: {int(self.rest_time - (time.time() - rest_start))}s",
                        (500, 360),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        2,
                        (0, 255, 255),
                        4
                    )

                    ret, jpeg = cv2.imencode(".jpg", rest_img)
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n" + jpeg.tobytes() + b"\r\n\r\n"
                    )
                    time.sleep(1)

        cap.release()
        cv2.destroyAllWindows()


    #PUSH UPS
    def push_ups(self):
        utils = utilities()
        for i in utils.illustrate_exercise(
            "", "PUSH UP'S"
        ):
            yield (i)
        
       #cap = cv2.VideoCapture("TrainerData/push_up_right_side.mp4")
        cap = cv2.VideoCapture(0)
        detector = pm.posture_detector()
        for current_set in range(1, self.sets + 1):
            print(f"Set {current_set}/{self.sets}")
            count = 0
            direction = 0
            start = time.process_time()
            total_reps = self.reps * self.difficulty_level

            while count < total_reps:
                success, img = cap.read()
                img = detector.find_person(img, False)
                landmark_list = detector.find_landmarks(img, False)
                is_person_facing_foward = False

                if len(landmark_list) != 0:
                    left_arm_angle = detector.find_angle(img, 11, 13, 15)
                    right_arm_angle = detector.find_angle(img, 12, 14, 16)

                    per = np.interp(right_arm_angle, (60, 140), (0, 100))
                    bar = np.interp(right_arm_angle, (60, 140), (650, 100))

                    shoulder_x1, shoulder_y1 = landmark_list[12][1:]
                    shoulder_x2, shoulder_y2 = landmark_list[11][1:]
                    waist_x1, waist_y1 = landmark_list[24][1:]

                    color = utils.get_performance_bar_color(per)

                    is_person_facing_foward = face_det.is_in_right_direction(
                        img, shoulder_x1, shoulder_x2, waist_x1
                    )
                    # When exercise is in start or terminal state
                    if per == 100 or per == 0:
                        color = (0, 255, 0)
                        rep = utils.repitition_counter(per, count, direction)
                        count = rep["count"]
                        direction = rep["direction"]
                    utils.draw_performance_bar(img, per, bar, color, count)

                utils.display_rep_count(img, count, total_reps)
                utils.position_info_floor_exercise(img, is_person_facing_foward)

                ret, jpeg = cv2.imencode('.jpg', img)
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n'
                )

                cv2.imshow("Push Ups", img)
                cv2.waitKey(1)
                if count == (self.reps * self.difficulty_level):
                    break
                time_elapsed = int(time.process_time() - start)
                # calories_burned = (time_elapsed / 60) * ((4.0 * 3.5 * 64) / 200)

            print(f"Completed Set {current_set}")
            if current_set < self.sets:
                rest_start = time.time()
                while time.time() - rest_start < self.rest_time:
                    rest_img = np.zeros((720, 1280, 3), np.uint8)
                    cv2.putText(
                        rest_img,
                        f"Rest: {int(self.rest_time - (time.time() - rest_start))}s",
                        (500, 360),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        2,
                        (0, 255, 255),
                        4
                    )

                    ret, jpeg = cv2.imencode(".jpg", rest_img)
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n" + jpeg.tobytes() + b"\r\n\r\n"
                    )
                    time.sleep(1)

        cap.release()
        cv2.destroyAllWindows()