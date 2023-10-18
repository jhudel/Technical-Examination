import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TextEncoderComponent } from './text-encoder/text-encoder.component';
import { CanActivateGuard } from './can-activate.guard'; // Import the CanActivateGuard

const routes: Routes = [
  { path: '', redirectTo: '/text-encoder', pathMatch: 'full' },
  { path: 'text-encoder', component: TextEncoderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
