import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
<<<<<<< HEAD
    this.recipeSub = this.recipeService.recipeschanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log(this.recipes);
      }
=======
    this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
    );
  }
  onAddNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
