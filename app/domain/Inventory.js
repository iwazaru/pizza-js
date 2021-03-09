module.exports = class Inventory {
  constructor(ingredientStock) {
    this.ingredientStock = ingredientStock;
  }

  hasEnoughIngredientsToCookPizza(recipe) {
    return recipe.every((ingredient) => this.#hasIngredient(ingredient));
  }

  #hasIngredient(ingredientToCheck) {
    const ingredientInInventory = this.ingredientStock.find(i => i.ingredientId === ingredientToCheck);
    return ingredientInInventory != null && ingredientInInventory.quantity > 0;
  }
}
