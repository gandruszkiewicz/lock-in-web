import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-informations',
  templateUrl: './my-informations.component.html',
  styleUrls: ['./my-informations.component.css']
})
export class MyInformationsComponent implements OnInit {

  securedInfoForm: FormGroup
  textValue: string;
  isDisabled: boolean = true;
  MY_INFORMATION: any;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService) {
      this.securedInfoForm = this.fb.group({
        name: [null, [Validators.required]],
        information: [null, [Validators.required]],
        sendEmail: [null, [Validators.required, Validators.email]],
        sendDateTime: [null,[Validators.required]]
      });
    }

  submitForm(): void {
    for (const i in this.securedInfoForm.controls) {
      this.securedInfoForm.controls[i].markAsDirty();
      this.securedInfoForm.controls[i].updateValueAndValidity();
    }
    console.log(this.securedInfoForm.value)
  }

    ngOnInit(): void {
      this.translateService.get("MY_INFORMATION").subscribe((translations) =>{
        this.MY_INFORMATION = translations;
      })
  }

  sendDateClick(){
    this.cdr.detectChanges();
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }
}
