// Suggest exercise routines based on weight & height (BMI logic)
class ExerciseService {
  // PUBLIC_INTERFACE
  suggestRoutine(weight, height) {
    /** Suggest a routine for given weight/height. */
    const bmi = weight / ((height / 100) ** 2);
    let suggestion = '';
    if (bmi < 19)
      suggestion = 'Bodyweight strength and gentle cardio (yoga, walking)';
    else if (bmi < 25)
      suggestion = 'Aerobic (running, cycling) and moderate resistance training';
    else if (bmi < 29)
      suggestion = 'HIIT, resistance, and calorie monitoring workouts';
    else
      suggestion = 'Intensive cardio, circuits, and nutrition focus';
    return { bmi: Math.round(bmi * 10) / 10, suggestion };
  }
}
module.exports = new ExerciseService();
