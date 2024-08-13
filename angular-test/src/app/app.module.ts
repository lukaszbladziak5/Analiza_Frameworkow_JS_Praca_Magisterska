import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { RenderingComponent } from './rendering/rendering.component';
import { RowComponent } from './row/row.component';
import { AnimationComponent } from './animation/animation.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { ServerComponent } from './server/server.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RenderingComponent,
    RowComponent,
    AnimationComponent,
    MapComponent,
    ServerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure AppRoutingModule is added to imports
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }