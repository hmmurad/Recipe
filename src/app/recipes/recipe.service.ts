import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
<<<<<<< HEAD
  recipeschanged = new Subject<Recipe[]>();

=======
  recipeChanged = new Subject<Recipe[]>();
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
  private recipes: Recipe[] = [
    // new Recipe(
    //   'A new recipe',
    //   'description',
    //   'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    //   [new Ingredient('Buns', 2), new Ingredient('meat', 5)]
    // ),
    // new Recipe(
    //   'Another new recipe',
    //   'description',
    //   'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    //   [new Ingredient('chicken', 2), new Ingredient('French fries', 5)]
    // ),
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
<<<<<<< HEAD
    this.recipeschanged.next(this.recipes.slice());
  }
=======
    this.recipeChanged.next(this.recipes.slice());
  }

>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
  getRecipes() {
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

<<<<<<< HEAD
  addRecipe() {}
  updateRecipe(index: number) {}

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeschanged.next(this.recipes.slice());
=======
  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
  }
}
