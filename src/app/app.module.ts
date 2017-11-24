import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppComponent } from './app.component';
import { ITodoStore, TodoStore, SHOW_ALL } from './stores/todos.store';

//const storeInjectionToken = new InjectionToken<ITodoStore>("TodoStore");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // {
    //   name: "TodoStore",    
    //   provide: storeInjectionToken,
    //   useValue: TodoStore.create({todos : [], filter : SHOW_ALL})
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
