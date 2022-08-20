import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {RippleModule} from 'primeng/ripple';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {AvatarModule} from 'primeng/avatar';
import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    RippleModule,
    ImageModule,
    CardModule,
    TabViewModule,
    InputTextareaModule,
    InputTextModule,
    CheckboxModule,
    AvatarModule,
    FileUploadModule
  ]
})
export class PrimeNgModule { }
