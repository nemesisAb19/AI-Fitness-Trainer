from modules.ExercisesModule import simulate_target_exercies
import numpy as np
import cv2

# Create an exercise instance
exercise = simulate_target_exercies(difficulty_level=1, reps=3)

# Call the squats() generator
for frame in exercise.squats():
    try:
        # This frame is in MJPEG multipart format, decode and display
        jpg_bytes = frame.split(b'\r\n\r\n')[1].split(b'\r\n')[0]
        jpg_array = np.frombuffer(jpg_bytes, dtype=np.uint8)
        img = cv2.imdecode(jpg_array, cv2.IMREAD_COLOR)

        if img is None:
            print("Warning: Empty frame!")
            continue

        cv2.imshow("Squats Live Test", img)
        if cv2.waitKey(1) == ord('q'):
            break

    except Exception as e:
        print("Error decoding frame:", e)
        continue

cv2.destroyAllWindows()
