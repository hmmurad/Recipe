import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
=======
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataResolverService } from './recipes/data-resolver.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
<<<<<<< HEAD
        resolve: [RecipesResolverService],
=======
        resolve: [DataResolverService],
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
<<<<<<< HEAD
        resolve: [RecipesResolverService],
=======
        resolve: [DataResolverService],
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
