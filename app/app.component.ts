import { Component } from '@angular/core';
import { PostService } from './post.service'
import {WebSocketService} from "./websocket.service";


@Component({
  selector: 'my-app',
  template: `
        <h1>{{name}}</h1>
        <post_component></post_component>
  `,
  providers: [PostService, WebSocketService]
})
export class AppComponent  { name = 'Sense'; }
