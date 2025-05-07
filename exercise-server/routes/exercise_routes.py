# from flask import Blueprint, request, jsonify
# import subprocess
# import os

# exercise_bp = Blueprint('exercise', __name__)

# @exercise_bp.route('/api/start-bicep-exercise', methods=['POST'])
# def start_bicep_exercise():
#     try:
#         data = request.get_json()
#         sets = data.get('sets', 1)
#         reps = data.get('reps', 2)
#         rest_time = data.get('rest_time', 30)

#         script_path = os.path.join('exercises', 'bicep_exercise.py')

#         # Make sure path is correct and bicep_exercise.py is imported from proper module
#         subprocess.Popen([
#             # 'python', 'exercises/bicep_exercise.py',
#             'python', script_path,
#             str(sets), str(reps), str(rest_time)
#         ])

#         return jsonify({
#             "message": "Bicep exercise started!",
#             "sets": sets,
#             "reps": reps,
#             "rest_time": rest_time
#         }), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
