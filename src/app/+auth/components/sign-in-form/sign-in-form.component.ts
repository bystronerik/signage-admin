import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Path } from '@app/@core/enums';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit {
  @Input() errorMessage: string;
  @Input() loading: boolean;

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(''),
  });

  @Output() signIn = new EventEmitter<{}>();

  path = Path;

  constructor() {}

  ngOnInit(): void {}

  onClickSignIn() {
    const user = {
      username: this.signInForm.get('username').value,
      password: this.signInForm.get('password').value,
    };
    this.signIn.emit({ user, shortSession: !this.signInForm.get('remember').value });
  }
}
