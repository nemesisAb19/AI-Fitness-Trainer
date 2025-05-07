import sys
# import os

# # Ensure the root path is accessible to import from 'modules'
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# sys.path.append(BASE_DIR)

from modules.ExercisesModule import simulate_target_exercies

def run_squats_exercise(sets=1, reps=2, rest_time=30):
    exercise = simulate_target_exercies(sets=sets, reps=reps, rest_time=rest_time)
    exercise.squats()

if __name__ == "__main__":
    sets = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    reps = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    rest_time = int(sys.argv[3]) if len(sys.argv) > 3 else 30
    run_squats_exercise(sets, reps, rest_time)