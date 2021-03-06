import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InviteService } from '../service/invite.service';
import { User } from '../models';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private inviteService: InviteService) {
    this.users$ = this.inviteService.get();
  }

  ngOnInit(): void {}
}
