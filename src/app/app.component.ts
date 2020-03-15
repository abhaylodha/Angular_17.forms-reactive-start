import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserName = ['Abhay', 'Lodha'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'frm_UserCredentials': new FormGroup({
        'ctrl_username': new FormControl('user1', [Validators.required, this.checkUserName.bind(this)]),
        'ctrl_email': new FormControl('a@b.com', [Validators.required, Validators.email],
          [this.checkEmail])
      }),
      'ctrl_gender': new FormControl('male'),
      'ctrl_hobbies': new FormArray([new FormControl('Hobby1', Validators.required)])
    })

    //Will be triggerred after every key typed, hence be careful about performance.
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    })

    //Will be triggerred after every status change, hence be careful about performance.
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    })
  }

  onPopulateValues() {

    console.log(this.signupForm.value['ctrl_hobbies'].length);

    const hobbieArray = [];
    for (let i = 0; i < this.signupForm.value['ctrl_hobbies'].length; i++) {
      hobbieArray.push('Hobby ' + i);
    }

    this.signupForm.setValue({
      'frm_UserCredentials': {
        'ctrl_username': 'Abhay',
        'ctrl_email': 'a@b.com'
      },
      'ctrl_gender': 'male',
      'ctrl_hobbies': hobbieArray
    });
  }

  onSuggestUserName() {
    this.signupForm.patchValue({
      'frm_UserCredentials': {
        'ctrl_username': 'Abhay1008'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const form_control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('ctrl_hobbies')).push(form_control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('ctrl_hobbies')).controls;
  }

  checkUserName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1)
      return ({ 'nameIsForbidden': true })
    else
      return null;
  }

  checkEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(
        () => {
          if (control.value === "a@b.com") {
            resolve({ 'nameIsForbidden': true });
          }
          else {
            resolve(null);
          }
        }
        , 1500);
    })
    return promise;
  }
}
