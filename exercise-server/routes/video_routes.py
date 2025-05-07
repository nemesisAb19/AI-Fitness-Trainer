# from flask import Blueprint, Response
# from services.camera import VideoCamera

# video_bp = Blueprint('video', __name__)
# camera = VideoCamera()

# @video_bp.route('/video_feed')
# def video_feed():
#     def generate_frames():
#         while True:
#             frame = camera.get_frame()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
