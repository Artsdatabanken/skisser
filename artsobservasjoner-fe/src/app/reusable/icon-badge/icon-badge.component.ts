import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-badge',
  templateUrl: './icon-badge.component.html',
  styleUrls: ['./icon-badge.component.scss']
})

export class IconBadgeComponent implements OnInit {

  @Input() data: string;
  @Input() text: string | null;
  @Input() icon: boolean | null;
  @Input() iconType: string | null;
  @Input() size: string | null;
  @Input() style?: string | null = 'grid';

  constructor() { }

  ngOnInit(): void { }

  getIcon(data: string): string {
    return `icon-badge__icon--${data}`;
  }

}
