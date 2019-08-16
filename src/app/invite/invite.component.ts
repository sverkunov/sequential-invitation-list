import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteService } from '../service/invite.service';
import { of, combineLatest } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { User } from '../modals';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {
  constructor(private inviteService: InviteService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit(): void {
    combineLatest(users.map(user => this.inviteService.invite(user))).pipe(
        untilDestroyed(this),
        catchError((error: Response) => of(error))
    ).subscribe(() => this.router.navigate(['/list']));
  }
}
