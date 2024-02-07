import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Drink} from "../../libs/model/drink";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    NgIf,
    FormsModule,
    MatFormField,
    MatCardContent,
    MatInput,
    MatCardActions,
    MatButton,
    MatCheckbox,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnChanges {

  title = 'Select a drink or add a new one!';
  @Input() selectedContent?: Drink;
  @Input() contentList?: Drink[] = [];
  @Output() onContentSave = new EventEmitter<Drink>;
  @Output() onCancel = new EventEmitter;
  localContent: Drink = this.getDefaultContent();

  ngOnChanges(changes: SimpleChanges): void {
    let newContent = changes['selectedContent'] && changes['selectedContent'].currentValue;

    if (newContent) {
      this.localContent = {...newContent}
    } else {
      this.localContent = this.getDefaultContent();
    }
  }

  getDefaultContent() : Drink {
    return {
      id: '',
      name: '',
      proof: undefined,
      ingredients: '',
      instructions: ''
    }
  }
}
