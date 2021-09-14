import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  /*@ViewChild('hero', { static: true }) hero: ElementRef<HTMLDivElement>;
  @ViewChild('appartement', { static: false }) appartement: ElementRef<HTMLDivElement>;
  @ViewChild('omgeving', { static: false }) omgeving: ElementRef<HTMLDivElement>;
  @ViewChild('portfolio', { static: false }) portfolio: ElementRef<HTMLDivElement>;
  @ViewChild('beschikbaarheid', { static: false }) beschikbaarheid: ElementRef<HTMLDivElement>;
  @ViewChild('contact', { static: false }) contact: ElementRef<HTMLDivElement>;

  isNavbarActive(identifier: string): boolean {
    console.log('checking active state for identifier ' + identifier);
    let rect = null;
    if (identifier === 'hero' && this.hero) {
      rect = this.hero.nativeElement.getBoundingClientRect();
    }else if(identifier === 'appartement' && this.appartement){
      rect = this.appartement.nativeElement.getBoundingClientRect();
    }
    if(rect !== null){
      const topShown = rect.top >= 0;
      return topShown;
    }else{
      return false;
    }    
  }*/

  /**
   *
   */
  constructor(private translateService:TranslateService) {
    translateService.setDefaultLang('nl');
    translateService.use('nl');
  }

}
