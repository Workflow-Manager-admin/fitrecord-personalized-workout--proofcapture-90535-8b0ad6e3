// Generate personalized exercise suggestion
// This is a dummy function; real version might use ML or heuristics!

class ExerciseService {
  // PUBLIC_INTERFACE
  suggestRoutine(weight, height) {
    /** Suggests a routine string based on basic BMI logic. */
    const bmi = weight / Math.pow(height / 100, 2);
    let exercise;
    if (bmi < 19) {
      exercise = 'Bodyweight strength and light cardio (e.g. yoga, brisk walking)';
    } else if (bmi < 25) {
      exercise = 'Aerobic (running, cycling) and moderate resistance training';
    } else if (bmi < 29) {
      exercise = 'HIIT, resistance, and calorie monitoring workouts';
    } else {
      exercise = 'Intensive cardio, circuit workouts, and nutritional guidance';
    }
    return { bmi: Math.round(bmi * 10) / 10, suggestion: exercise };
  }
}

module.exports = new ExerciseService();
