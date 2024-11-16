import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Heading,
  List,
  Indent,
} from 'ckeditor5';
import { MainContainerComponent } from 'ngx-dabd-grupo01';
import { UserDataService, UserData } from '../../shared/services/user-data.service';
import {ConfigurationPenaltiesService} from '../../shared/services/configuration-penalties.service';
import {Rules} from './rules';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [MainContainerComponent, CommonModule, FormsModule, CKEditorModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent {
  public Editor = ClassicEditor;
  private configService = inject(ConfigurationPenaltiesService);

  rulesContent: string = '';
  editMode: boolean = false;
  currentRules!:Rules;

  public config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
    ],
    plugins: [Essentials, Bold, Italic, Undo, Paragraph, Heading, List, Indent],
    language: { ui: 'en' },
  };

  userDataService = inject(UserDataService);
  userData!: UserData;

  loadUserData() {
    this.userDataService.loadNecessaryData().subscribe((response) => {
      if (response) {
        this.userData = response;
      }
    });
  }

  userHasRole(role: string): boolean {
    return this.userData.roles.some((userRole) => userRole.name === role);
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadRules();
  }

  loadRules(): void {
    // const savedRules = localStorage.getItem('rulesContent');
    // this.rulesContent = savedRules || 'No hay reglas definidas.';

    this.configService.getRules().subscribe(rules => {
      this.currentRules = rules;
      this.rulesContent = rules.rules
      // console.log('rules object loaded ', this.currentRules);
      // console.log('current rules: '+this.rulesContent)
    })
  }

  onChange({ editor }: any): void {
    this.rulesContent = editor.getData();
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveRules(): void {
    // localStorage.setItem('rulesContent', this.rulesContent);


    const newRules:Rules = this.currentRules
    newRules.rules= this.rulesContent;

    this.configService.putRules(newRules,5).subscribe({
      next: (result) => {
        console.log('new rules: ', result.rules);
        this.loadRules()
        this.editMode = false;
      },
      error: (error) => {
        console.log('error: ', error);
      }

    })
  }
}
