import { Component, OnInit } from '@angular/core';
import { Layout } from '../layout';
import { LayoutsService } from '../service/layouts.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  templateid: any = -1;
  templates: any;
  arraytemplates: Array<Layout> = [];

  constructor(private layoutService: LayoutsService) { }

  ngOnInit(): void {
    let resp = this.layoutService.getTemplates();
    resp.subscribe((data) => this.templates = data);
  }

  selectChangeHandler(event: any) {
    this.templateid = event.target.value;
  }
}
