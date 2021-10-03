import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      console.log(this.recipe);
    });
  }

  addToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredient); //FRom via recipe service
    this.slService.addIngredients(this.recipe.ingredients); //Direct from shopping list service
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

<<<<<<< HEAD
  onDeleteRecipe() {
=======
  onDelete() {
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
