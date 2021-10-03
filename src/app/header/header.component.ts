import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { StorageDataService } from '../shared/storage-data.service';
=======
import { DataStorageService } from '../shared/data-storage.service';
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD
  constructor(private dataStorage: StorageDataService) {}

  ngOnInit() {
    // this.onFetch();
  }

  onSaveRecipes() {
    this.dataStorage.saveRecipes();
  }

  onFetch() {
=======
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.dataStorage.fetchRecipes();
  }

  onSaveData() {
    this.dataStorage.save();
  }

  onFetchData() {
>>>>>>> 48970395524d54c05e86c4b7ec3ae69230924f0f
    this.dataStorage.fetchRecipes().subscribe();
  }
}
