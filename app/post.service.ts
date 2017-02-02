import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebSocketService} from './websocket.service';

// TODO : Dynamically generate the websocket URL
//const POST_URL = 'ws://192.168.1.80:6600/websocket';
const POST_URL = 'ws://raspberrypi3:6600/websocket';

export interface PostMessage {
  sender: string;
  message: string;
  time_recv: Date;
}

@Injectable()
export class PostService {
  public posts: Subject<PostMessage>;

  constructor(wsService: WebSocketService) {

    this.posts = <Subject<PostMessage>>wsService
      .connect(POST_URL)
      .map((response: MessageEvent): PostMessage => {
        console.log(response);
        let data = JSON.parse(response.data);
        return {
          sender: data.sender,
          message: data.message,
          time_recv: data.time_recv
        }
      });
  }
}
