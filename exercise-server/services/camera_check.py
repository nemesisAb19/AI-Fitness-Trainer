import cv2

cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    if not success:
        print("❌ Failed to read from webcam.")
        break

    cv2.imshow("Webcam Test", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
