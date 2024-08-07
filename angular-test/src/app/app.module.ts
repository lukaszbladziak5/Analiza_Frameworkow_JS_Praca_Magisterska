import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RenderingComponent } from './rendering/rendering.component';
import { RowComponent } from './row/row.component';
import { AnimationComponent } from './animation/animation.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderingComponent,
    RowComponent,
    AnimationComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure AppRoutingModule is added to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
