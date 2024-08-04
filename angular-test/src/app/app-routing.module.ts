// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimationComponent } from './animation/animation.component';
import { RenderingComponent } from './rendering/rendering.component';

const routes: Routes = [
    { path: 'rendering', component: RenderingComponent },
    { path: 'animation', component: AnimationComponent },
    // { path: '', redirectTo: 'rendering', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }