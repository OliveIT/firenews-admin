import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Tinymce - https://www.tinymce.com/docs/integrations/angular2/
import { EditorModule } from '@tinymce/tinymce-angular';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AuthGuard } from './core/auth.guard';
import { routes } from './app.routes';
import { environment } from './../environments/environment';

// Services
import { UsersService } from './services/users/users.service';
import { MenuItemsService } from './services/menu-items/menu-items.service';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { VideoService } from './services/video/video.service';
import { ContactusService } from './services/contactus/contactus.service';
import { AboutusService } from './services/aboutus/aboutus.service';
import { UploadService } from './services/upload/upload.service';
import { GlobalService } from './services/global/global.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { ArticleListComponent } from './pages/articles/article-list/article-list.component';
import { VideoListComponent } from './pages/videos/video-list/video-list.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { ArticleFormComponent } from './pages/articles/article-form/article-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ArticleDetailsComponent } from './pages/articles/article-details/article-details.component';
import { VideoFormComponent } from './pages/videos/video-form/video-form.component';
import { VideoDetailsComponent } from './pages/videos/video-details/video-details.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SpinnerComponent,
    CategoryListComponent,
    ArticleFormComponent,
    ArticleListComponent,
    VideoListComponent,
    AboutusComponent,
    CategoryFormComponent,
    ArticleFormComponent,
    ContactsComponent,
    ArticleDetailsComponent,
    VideoFormComponent,
    VideoDetailsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    EditorModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    FlexLayoutModule,
    routes
  ],
  entryComponents: [
    CategoryFormComponent,
    ArticleFormComponent,
    VideoFormComponent,
    ArticleDetailsComponent,
    VideoDetailsComponent
  ],
  providers: [
    AuthGuard,
    UsersService,
    MenuItemsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CategoryService,
    ArticleService,
    VideoService,
    ContactusService,
    AboutusService,
    UploadService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
