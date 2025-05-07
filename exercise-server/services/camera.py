import cv2

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def get_frame(self):
        ret, frame= self.video.read()

        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()

# """
# camera.py

# Captures video feed from the webcam, processes pose detection and bicep curl exercise tracking,
# and displays visual feedback using OpenCV. Plays an audio instruction at the start.
# """

# import cv2
# import time
# import pygame
# from modules.PoseModule import posture_detector
# from modules.ExercisesModule import simulate_target_exercies

# def play_start_audio(audio_path):
#     """Play the start instruction audio once."""
#     try:
#         pygame.mixer.init()
#         pygame.mixer.music.load(audio_path)
#         pygame.mixer.music.play()
#         while pygame.mixer.music.get_busy():
#             pygame.time.Clock().tick(10)
#         pygame.mixer.quit()
#     except Exception as e:
#         print(f"[ERROR] Failed to play audio: {e}")

# def main():
#     # Load and play audio instruction
#     play_start_audio('Audios/Biceps_Instruction.mp3')

#     # Initialize camera
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         print("[ERROR] Cannot open camera.")
#         return

#     # Pose detector and exercise simulator setup
#     detector = posture_detector()
#     bicep_simulator = simulate_target_exercies()

#     # For calculating FPS
#     p_time = 0

#     while True:
#         success, frame = cap.read()
#         if not success:
#             print("[WARNING] Failed to read frame from camera.")
#             break

#         # Resize and process frame
#         frame = cv2.resize(frame, (1280, 720))
#         frame = detector.find_person(frame, draw=False)
#         landmarks = detector.find_landmarks(frame, draw=False)

#         if landmarks:
#             frame = bicep_simulator.bicep_curls(frame, landmarks)

#         # FPS Calculation
#         c_time = time.time()
#         fps = 1 / (c_time - p_time + 1e-6)
#         p_time = c_time

#         # Display FPS
#         cv2.putText(frame, f'FPS: {int(fps)}', (10, 40),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

#         # Show frame
#         cv2.imshow("Bicep Curl Tracker", frame)

#         # Exit condition
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     # Cleanup
#     cap.release()
#     cv2.destroyAllWindows()

# if __name__ == "__main__":
#     main()
