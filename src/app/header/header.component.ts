import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isloggedIn = false;
  subscription: Subscription;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isloggedIn = !!user;
    });
  }

  onSaveData() {
    this.dataStorage.saveRecipe();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe((data) => {
      console.log(data);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
