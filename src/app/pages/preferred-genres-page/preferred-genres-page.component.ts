import { Component, OnInit, Inject } from '@angular/core';
import { PreferredGenreService } from 'src/app/services/preferred-genre.service';
import { Genre } from 'src/app/models/genre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferred-genres-page',
  templateUrl: './preferred-genres-page.component.html',
  styleUrls: ['./preferred-genres-page.component.css'],
  // providers: [PreferredGenreService]
})
export class PreferredGenresPageComponent implements OnInit {

  constructor(
    @Inject(PreferredGenreService) private genreService: PreferredGenreService,
    private router: Router
  ) {
  }

  public listItems: Array<Genre> = [];
  public placeHolder: Genre = { name: 'Select product...', id: null };
  public selectedValues : Array<Genre> = [];


  ngOnInit() {
    this.genreService.getAllGenres().subscribe(
      (data) => this.listItems = data
  );
  }

  savePreferences() {
    this.genreService.savePreferences(this.selectedValues)
    .subscribe(
      data => {
        console.log("User preferences saved!");
        this.router.navigate(['/grid-books']);
      },
      error => console.log("Could not save user preferences!")
      );
  }
    
}
