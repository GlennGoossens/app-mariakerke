import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { BeschikbaarheidComponent } from './components/beschikbaarheid/beschikbaarheid.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { OmgevingComponent } from './components/omgeving/omgeving.component';
import { AppartementComponent } from './components/appartement/appartement.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookModalComponent } from './modals/book-modal/book-modal.component';
import { HeroComponent } from './components/hero/hero.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FaqComponent,
    BeschikbaarheidComponent,
    PortfolioComponent,
    OmgevingComponent,
    AppartementComponent,
    BookModalComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
