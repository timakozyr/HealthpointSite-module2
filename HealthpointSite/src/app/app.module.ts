import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './services/interceptor-service.service'
import { ContactusComponent } from './contactus/contactus.component';
import { MedServicesComponent } from './med-services/med-services.component';
import { MedArticlesComponent } from './med-articles/med-articles.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { MedServiceDescrComponent } from './med-service-descr/med-service-descr.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { ArticleComponent } from './article/article.component';
import { SlideElementComponent } from './slide-element/slide-element.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchFilterPipe } from './services/search-filter.pipe';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { PopularDoctorsComponent } from './popular-doctors/popular-doctors.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactusComponent,
    MedServicesComponent,
    MedArticlesComponent,
    DoctorsComponent,
    DoctorProfileComponent,
    MedServiceDescrComponent,
    FeedbackFormComponent,
    ArticleComponent,
    SlideElementComponent,
    StarRatingComponent,
    AppointmentFormComponent,
    SearchFilterPipe,
    PopularDoctorsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatSliderModule,
    ScrollToModule.forRoot()
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }
  ],
  entryComponents: [
    FeedbackFormComponent
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule, StarRatingComponent]
})
export class AppModule {}
