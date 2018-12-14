import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { ArticleListComponent } from './pages/articles/article-list/article-list.component';
import { ArticleFormComponent } from './pages/articles/article-form/article-form.component';
import { VideoFormComponent } from './pages/videos/video-form/video-form.component';
import { VideoListComponent } from './pages/videos/video-list/video-list.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SettingsComponent } from './pages/settings/settings.component';

// Route Configuration
export const router: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'category', component: CategoryListComponent, canActivate: [AuthGuard] },
      { path: 'articles', component: ArticleListComponent, canActivate: [AuthGuard] },
      { path: 'article', component: ArticleFormComponent, canActivate: [AuthGuard] },
      { path: 'article/:id', component: ArticleFormComponent, canActivate: [AuthGuard] },
      { path: 'videos', component: VideoListComponent, canActivate: [AuthGuard] },
      { path: 'video', component: VideoFormComponent, canActivate: [AuthGuard] },
      { path: 'video/:id', component: VideoFormComponent, canActivate: [AuthGuard] },
      { path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard] },
      { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
    ]
  }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);