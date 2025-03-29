/**
 * Функция рассчитывает текущий рейтинг (I6) и количество дополнительных отзывов с оценкой 5 (J6),
 * необходимых для достижения желаемого рейтинга (K6).
 *
 * @param {number} D6 Количество отзывов с оценкой 1.
 * @param {number} E6 Количество отзывов с оценкой 2.
 * @param {number} F6 Количество отзывов с оценкой 3.
 * @param {number} G6 Количество отзывов с оценкой 4.
 * @param {number} H6 Количество отзывов с оценкой 5.
 * @param {number} K6 Желаемый рейтинг (например, 4.5).
 * @returns {object} Объект с текущим рейтингом (I6) и необходимым количеством отзывов (J6).
 */
function calculateRatingAndRequiredReviews(D6, E6, F6, G6, H6, K6) {
    // Общее количество отзывов
    const totalReviews = D6 + E6 + F6 + G6 + H6;
    
    // Текущий суммарный балл отзывов
    const currentSum = D6 * 1 + E6 * 2 + F6 * 3 + G6 * 4 + H6 * 5;
    
    // Текущий рейтинг I6
    const I6 = totalReviews > 0 ? currentSum / totalReviews : 0;
    
    // Округляем текущий рейтинг до 1 знака после запятой для сравнения
    const roundedI6 = Math.round(I6 * 10) / 10;
    
    // Если округлённый текущий рейтинг уже равен или превышает желаемый,
    // дополнительных отзывов не требуется
    if (roundedI6 >= K6) {
      return {
        currentRating: I6,
        additionalReviews: 0  // J6 = 0
      };
    }
    
    // Рассчитываем, сколько нужно добавить отзывов на 5,
    // чтобы после округления получить желаемое значение
    // Фактически нам нужно достичь (K6 - 0.05), чтобы после округления получить K6
    const targetForCalculation = K6 - 0.05;
    
    // Проверяем, сможем ли мы достичь целевого рейтинга, добавляя по одному отзыву
    let additionalCount = 0;
    let simulatedRating = I6;
    
    // Максимальное количество итераций для защиты от бесконечного цикла
    const MAX_ITERATIONS = 1000;
    
    while (Math.round(simulatedRating * 10) / 10 < K6 && additionalCount < MAX_ITERATIONS) {
        additionalCount++;
        simulatedRating = (currentSum + additionalCount * 5) / (totalReviews + additionalCount);
    }
    
    // Если не удалось достичь целевого рейтинга за разумное количество итераций,
    // возвращаем рассчитанное по старой формуле значение
    if (additionalCount >= MAX_ITERATIONS) {
        const oldCalculation = (K6 * totalReviews - currentSum) / (5 - K6);
        return {
            currentRating: I6,
            additionalReviews: Math.ceil(oldCalculation)
        };
    }
    
    return {
      currentRating: I6,
      additionalReviews: additionalCount
    };
}
  
// Пример использования:
const D6 = 18, E6 = 1, F6 = 1, G6 = 1, H6 = 105;
const K6 = 4.5;
  
const result = calculateRatingAndRequiredReviews(D6, E6, F6, G6, H6, K6);
console.log("Текущий рейтинг (I6):", result.currentRating.toFixed(2));
console.log("Необходимо отзывов (J6):", result.additionalReviews);
  
// Пример, если H6 изменится (например, H6 = 113)
const result2 = calculateRatingAndRequiredReviews(D6, E6, F6, G6, 113, K6);
console.log("При H6 = 113, текущий рейтинг (I6):", result2.currentRating.toFixed(2));
console.log("При H6 = 113, необходимо отзывов (J6):", result2.additionalReviews);
  