# from flask import Flask, request, Response, jsonify
# from flask_cors import CORS
# import subprocess
# from services.camera import VideoCamera

# app = Flask(__name__)
# camera = VideoCamera()
# CORS(app)  # Allow requests from React

# @app.route('/video_feed')
# def video_feed():
#     def gen():
#         while True:
#             frame = camera.get_frame()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
#     return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/api/start-bicep-exercise', methods=['POST'])
# def start_bicep_exercise():
#     try:
#         data = request.get_json()
#         sets = data.get('sets', 1)
#         reps = data.get('reps', 2)
#         rest_time = data.get('rest_time', 30)

#         # Launch the exercise script with arguments
#         subprocess.Popen([
#             'python', 'bicep_exercise.py',
#             str(sets), str(reps), str(rest_time)
#         ])

#         return jsonify({"message": "Bicep exercise started!", "sets": sets, "reps": reps, "rest_time": rest_time}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5001)
#     # Note: Ensure that the bicep_exercise.py script is in the same directory as this app.py file.
#     # You can adjust the port number as needed. This example uses port 5001.






# from flask import Flask
# from flask_cors import CORS
# from routes.video_routes import video_bp
# from routes.exercise_routes import exercise_bp

# def create_app():
#     app = Flask(__name__)
#     CORS(app)  # Allow requests from React or any frontend

#     # Register blueprints
#     app.register_blueprint(video_bp)
#     app.register_blueprint(exercise_bp)

#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(port=5001)










# from flask import Flask, request, Response, jsonify
# from flask_cors import CORS
# import subprocess
# import os
# from services.camera import VideoCamera

# app = Flask(__name__)
# camera = VideoCamera()
# CORS(app)

# @app.route('/video_feed')
# def video_feed():
#     def gen():
#         while True:
#             frame = camera.get_frame()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
#     return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/api/start-bicep-exercise', methods=['POST'])
# def start_bicep_exercise():
#     try:
#         data = request.get_json()
#         sets = data.get('sets', 1)
#         reps = data.get('reps', 2)
#         rest_time = data.get('rest_time', 30)

#         # Full path to bicep_exercise.py
#         script_path = os.path.join(os.path.dirname(__file__), 'bicep_exercise.py')

#         subprocess.Popen([
#             'python', script_path,
#             str(sets), str(reps), str(rest_time)
#         ])

#         return jsonify({"message": "Bicep exercise started!", "sets": sets, "reps": reps, "rest_time": rest_time}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5001)









from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from modules.ExercisesModule import simulate_target_exercies  # Assuming correct import path

app = Flask(__name__)
CORS(app)

# Default parameters, can be changed by POST request
exercise_config = {
    "sets": 1,
    "reps": 2,
    "rest_time": 30
}

@app.route('/bicep_feed')
def bicep_feed():
    # Use stored config for exercise parameters
    sim = simulate_target_exercies(
        sets=exercise_config["sets"],
        reps=exercise_config["reps"],
        rest_time=exercise_config["rest_time"]
    )
    return Response(sim.bicep_curls(), mimetype='multipart/x-mixed-replace; boundary=frame')

#SQUATS
@app.route('/squat_feed')
def squat_feed():
    # Use stored config for exercise parameters
    sim = simulate_target_exercies(
        sets=exercise_config["sets"],
        reps=exercise_config["reps"],
        rest_time=exercise_config["rest_time"]
    )
    return Response(sim.squats(), mimetype='multipart/x-mixed-replace; boundary=frame')

#PUSH UPS
@app.route('/push_feed')
def push_feed():
    # Use stored config for exercise parameters
    sim = simulate_target_exercies(
        sets=exercise_config["sets"],
        reps=exercise_config["reps"],
        rest_time=exercise_config["rest_time"]
    )
    return Response(sim.push_ups(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/start-bicep-exercise', methods=['POST'])
def start_bicep_exercise():
    try:
        data = request.get_json()
        exercise_config["sets"] = data.get("sets", 1)
        exercise_config["reps"] = data.get("reps", 2)
        exercise_config["rest_time"] = data.get("rest_time", 30)

        return jsonify({
            "message": "Bicep exercise configuration updated!",
            "sets": exercise_config["sets"],
            "reps": exercise_config["reps"],
            "rest_time": exercise_config["rest_time"]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

#SQUATS
@app.route('/api/start-squats-exercise', methods=['POST'])
def start_squats_exercise():
    try:
        data = request.get_json()
        exercise_config["sets"] = data.get("sets", 1)
        exercise_config["reps"] = data.get("reps", 2)
        exercise_config["rest_time"] = data.get("rest_time", 30)

        return jsonify({
            "message": "Squats exercise configuration updated!",
            "sets": exercise_config["sets"],
            "reps": exercise_config["reps"],
            "rest_time": exercise_config["rest_time"]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

#PUSH UPS
@app.route('/api/start-pushups-exercise', methods=['POST'])
def start_pushups_exercise():
    try:
        data = request.get_json()
        exercise_config["sets"] = data.get("sets", 1)
        exercise_config["reps"] = data.get("reps", 2)
        exercise_config["rest_time"] = data.get("rest_time", 30)

        return jsonify({
            "message": "Push Ups exercise configuration updated!",
            "sets": exercise_config["sets"],
            "reps": exercise_config["reps"],
            "rest_time": exercise_config["rest_time"]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)

