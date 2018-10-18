class FoodFactor {
  constructor(foods) {
    this.foods = foods;
    this.status = 'constructing';
    const hasValidFoods = this.validateFoods();
    if (!hasValidFoods) {
      this.status = 'fail';
      return;
    }
    this.initialFactors = this.makeInitialFactors();
    this.pFood = this.makeFactor(this.initialFactors.Protein);
    this.cFood = this.makeFactor(this.initialFactors.Carbohydrates);
    this.fFood = this.makeFactor(this.initialFactors.Fat);
    this.ensureMacro('pFood', 'Protein');
    this.ensureMacro('cFood', 'Carbohydrates');
    this.ensureMacro('fFood', 'Fat');
    if (!this.pFood.p) {
      this.getMaxMacroFactors('pFood', 'Protein');
    }
    if (!this.cFood.c) {
      this.getMaxMacroFactors('cFood', 'Carbohydrates');
    }
    if (!this.fFood.f) {
      this.getMaxMacroFactors('fFood', 'Fat');
    }
    this.status = 'success';
  }

  validateFoods() {
    const hasValidFoods = this.foods.reduce(function validFood(memo, food) {
      return memo && !!food;
    }, true);
    return hasValidFoods;
  }

  makeInitialFactors() {
    return this.foods.reduce(function foodsReduce(memo, food) {
      memo[food.maxMacro].push(food);
      return memo;
    }, {
      Protein: [],
      Carbohydrates: [],
      Fat: []
    });
  }

  makeFactor(foodArr) {
    return foodArr.reduce(function reduction(memo, food) {
      return {
        p: memo.p + parseFloat(food.Protein),
        c: memo.c + parseFloat(food.Carbohydrates),
        f: memo.c + parseFloat(food.Fat),
        weight: memo.weight + 100,
        foods: memo.foods.slice().concat([food])
      };
    }, {
      p: 0,
      c: 0,
      f: 0,
      weight: 0,
      foods: []
    });
  }

  ensureMacro(foodF, macro) {
    if (this[foodF].weight === 0) {
      this[foodF].foods = this.foods.reduce(function makeBalanceFactor(memo, fd) {
        if (fd[macro] * 1 > memo[macro]) {
          return fd;
        }
        return memo;
      }, { Fat: 0 });
      this[foodF].foods = [this[foodF].foods];
      this[foodF].weight = 100;

      const food = this[foodF].foods[0];

      this[foodF].p = parseFloat(food.Protein);
      this[foodF].c = parseFloat(food.Carbohydrates);
      this[foodF].f = parseFloat(food.Fat);

      this.foods = this.foods.slice().filter((fd) => { // eslint-disable-line
        return fd.id !== food.id;
      });
    }

    if (foodF === 'pFood' || foodF === 'fFood') {
      this.initialFactors = this.makeInitialFactors();
    }

    if (foodF === 'pFood') {
      this.cFood = this.makeFactor(this.initialFactors.Carbohydrates);
    }
    if (foodF === 'fFood') {
      this.pFood = this.makeFactor(this.initialFactors.Protein);
      this.cFood = this.makeFactor(this.initialFactors.Carbohydrates);
    }
  }

  getMaxMacroFactors(factor, macro) {
    this[factor].foods = this.foods.reduce(function oFoodsReduce(memo, fd) {
      if (parseFloat(fd[macro]) > memo[macro]) {
        return fd;
      }
      return memo;
    }, { Protein: 0 });

    this[factor].foods = [this[factor].foods];
    this[factor].weight = 100;

    this[factor].p = parseFloat(this[factor].foods[0].Protein);
    this[factor].c = parseFloat(this[factor].foods[0].Carbohydrates);
    this[factor].f = parseFloat(this[factor].foods[0].Fat);
    return this;
  }

  checkFailure(goalDesc, factor, macro) {
    const {
      mainGoal,
      secondaryGoal,
      minimalGoal
    } = goalDesc;

    const {
      primary,
      secondary,
      minimal
    } = macro;

    const mainGoalRatio = mainGoal / (this[factor][primary] * (this[factor].weight / 100));

    const secondaryQuantity = this[factor][secondary] * mainGoalRatio;
    const minimalQuantity = this[factor][minimal] * mainGoalRatio;

    // If reaching the main goal causes the same food to exceed the secondary or
    // minimal goal, mark it as a failure.
    return (secondaryQuantity > secondaryGoal) || (minimalQuantity > minimalGoal);
  }

  /**
   * Calculate the weights of the foods in this factor to reach a specified
   * macronutrient goal target
   * @param {number} pGoal The protein goal
   * @param {number} cGoal The carbohydrate goal
   * @param {number} fGoal The fat goal
   * @return the weight of the foods in grams. `alpha` corresponds to the protein food, `beta` to the carb food, `gamma` to the fat food
   */
  calculateMealWeights(pGoal, cGoal, fGoal) {
    // Gram weights of the foods
    let pWeight = 30;
    let cWeight = 30;
    let fWeight = 30;

    const {
      pFood,
      cFood,
      fFood
    } = this;

    // Gauss-Seidel Iteration
    for (let increment = 0; increment < 20; increment += 1) {
      pWeight = (pFood.weight / pFood.p) * (pGoal - ((cFood.p * cWeight) / cFood.weight) - ((fFood.p * fWeight) / fFood.weight));
      cWeight = (cFood.weight / cFood.c) * (cGoal - ((pFood.c * pWeight) / pFood.weight) - ((fFood.c * fWeight) / fFood.weight));
      fWeight = (fFood.weight / fFood.f) * (fGoal - ((pFood.f * pWeight) / pFood.weight) - ((cFood.f * cWeight) / cFood.weight));
    }

    return {
      alpha: pWeight,
      beta: cWeight,
      gamma: fWeight
    };
  }
}

module.exports = FoodFactor;
