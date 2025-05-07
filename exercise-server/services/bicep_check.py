import cv2
import numpy as np
from modules.ExercisesModule import simulate_target_exercies

exercise = simulate_target_exercies(difficulty_level=1, reps=10)

for frame in exercise.bicep_curls():
    # This frame is in MJPEG format, decode and display:
    # MJPEG format is a stream of JPEG images, each separated by a boundary
    # The boundary is typically a sequence of bytes that indicates the start of a new JPEG image
    try:
        jpg_bytes = frame.split(b'\r\n\r\n')[1].split(b'\r\n')[0]
        jpg_array = np.frombuffer(jpg_bytes, dtype=np.uint8)
        img = cv2.imdecode(jpg_array, cv2.IMREAD_COLOR)

        if img is None:
            print("Warning: Empty frame!")
            continue

        cv2.imshow("Bicep Curls Live Test", img)
        if cv2.waitKey(1) == ord('q'):
            break
    except Exception as e:
        print(f"Frame processing error: {e}")
        continue

cv2.destroyAllWindows()
