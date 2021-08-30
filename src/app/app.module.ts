import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { HeroComponent } from './components/hero/hero.component';
import { BookComponent } from './components/book/book.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';

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
    HeroComponent,
    BookComponent,
    NavigationComponent,
    FooterComponent,
    IndexComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
