import { Component, OnInit } from '@angular/core';
import { StorageDataService } from '../shared/storage-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorage: StorageDataService) {}

  ngOnInit() {
    // this.onFetch();
  }

  onSaveRecipes() {
    this.dataStorage.saveRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipes().subscribe();
  }
}
