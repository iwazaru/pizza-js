const inventoriesDataTable = require('./tables/inventories');
const _ = require("lodash");
const Inventory = require('../domain/Inventory');

module.exports = class IngredientInventoryRepository {
    #dataSource = _.cloneDeep(inventoriesDataTable);

    getByPizzeriaId(pizzeriaId) {
        const ingredientStock = this.#dataSource
            .filter(i => i.pizzeriaId === pizzeriaId)
            .map(i => {
                return {
                    ingredientId: i.ingredientId,
                    quantity: i.quantity
                }
            });
        return new Inventory(ingredientStock);
    }

    decrementIngredientsOfPizzeria(pizzeriaId, ingredients) {
        for (const ingredientToDecrementIndex in ingredients) {
            const inventoryIndex = this.#dataSource
                .findIndex(i =>
                    i.pizzeriaId === pizzeriaId
                    && i.ingredientId === ingredients[ingredientToDecrementIndex]
                );
            this.#dataSource[inventoryIndex].quantity--;
        }
    }
}
