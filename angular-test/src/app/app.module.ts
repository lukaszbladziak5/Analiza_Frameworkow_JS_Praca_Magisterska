import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RenderingComponent } from './rendering/rendering.component';
import { RowComponent } from './row/row.component';
import { AnimationComponent } from './animation/animation.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RenderingComponent,
    RowComponent,
    AnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure AppRoutingModule is added to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
