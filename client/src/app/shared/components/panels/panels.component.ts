import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrl: './panels.component.scss'
})
export class PanelsComponent {
  @Input({required: true}) title!: string;
  @Input() info: number = 0;
  @Input() panelColor: string = '#000';
}
