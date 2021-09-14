import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentLang:string;

  constructor(
    private translateService:TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNavigateToBook() {
    this.router.navigate(['/book'])
  }

  changeLang(event:MouseEvent,lang:string){
    event.preventDefault();
    event.stopPropagation();

    this.translateService.use(lang);
  }

  getCurrentLang():string{
    return this.translateService.currentLang.toUpperCase();
  }

}
