import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'create-user', loadChildren: './create-user/create-user.module#CreateUserPageModule' },
  { path: 'section-overview', loadChildren: './section-overview/section-overview.module#SectionOverviewPageModule' },
  { path: 'section', loadChildren: './section/section.module#SectionPageModule' },
  { path: 'options', loadChildren: './options/options.module#OptionsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules, onSameUrlNavigation: "reload" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
