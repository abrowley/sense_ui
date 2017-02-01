import {PostService, PostMessage} from './post.service';
import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';


@Component({
  selector: 'post_component',
  template: `
        <div class="posts">
            <h3>Updates</h3>
            <li 
              [@flyInOut]="'in'" 
              class="borderlist" 
              *ngFor="let pst of post_messages.slice().reverse().slice(0,5)"
              >
                <b>Message:</b>{{pst.message}} <b>Sender:</b>{{pst.sender}} <b>Received:</b>{{pst.time_recv}}
              </li>
        </div>
    `,
  styles:[`
    .borderlist {
      list-style-position:inside;
      list-style-type: none;
      background-color: aliceblue;
    }`
  ],
  providers: [PostService],
  animations: [
    trigger('flyInOut', [
      state('in', style(
        {transform: 'translateX(0)'
        }
        )),
      transition('void => *', [
        style({
          transform: 'translateX(-1%)',
          opacity:1,
          background:'teal'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(1%)',
          opacity:0,
          background:'paleturquoise'
        }))
      ])
    ])
  ]
})
export class PostComponent {
  private post_messages: PostMessage[] = new Array();

  constructor(private postService: PostService) {
    postService.posts.subscribe(pst => {
      this.post_messages.push(pst);
    });
  }
}
