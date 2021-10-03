import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class StorageDataService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  recipeUrl = 'https://mymenu-197f7.firebaseio.com/recipes.json';

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipeUrl, recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipeUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredient ? recipe.ingredient : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
