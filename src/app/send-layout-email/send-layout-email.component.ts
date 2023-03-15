import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { Layout } from '../layout';
import { Project } from '../project';
import { LayoutsService } from '../service/layouts.service';
import { ProjectService } from '../service/project.service';
import { SendLayoutEmailServiceService } from '../service/send-layout-email-service.service';

@Component({
  selector: 'app-send-layout-email',
  templateUrl: './send-layout-email.component.html',
  styleUrls: ['./send-layout-email.component.css']
})
export class SendLayoutEmailComponent implements OnInit {

  dataform: string[] = [];
  apiProjects: any;
  apiTemplates: any;
  templates: Array<Layout>
  templateany: any;
  template: Layout;
  project: Project = new Project();
  layoutEmail: Email = new Email();
  selectedProjectId: number = 0;
  selectedTemplateId: number = 0;

  constructor(private projectService: ProjectService, private layoutService: LayoutsService, private sendLayoutEmailservice: SendLayoutEmailServiceService) { }

  ngOnInit(): void {
    let resp = this.projectService.getProjects();
    resp.subscribe((data) => this.apiProjects = data);
    let layoutResp = this.layoutService.getTemplates();
    layoutResp.subscribe((data) => this.apiTemplates = data)
  }

  selectProjectChangeHandler(event: any) {
    this.selectedProjectId = event.target.value;
    this.project.id = event.target.value;
  }

  selectTemplateChangeHandler(event: any) {
    this.selectedTemplateId = event.target.value;
  }

  layoutEmailSubmit() {
    this.project.id = this.selectedProjectId;
    this.templates = this.apiTemplates;
    this.templateany = this.templates.find(item => item.id == this.selectedTemplateId);
    this.template = this.templateany;
    let reformedDataForm: string = this.template.dataForm;
    for (let partVariable of this.dataform) {
      reformedDataForm = reformedDataForm.replace("variable", partVariable);
    }
    this.layoutEmail.templateName = this.template.templateName;
    this.layoutEmail.dataVaraibles = reformedDataForm;
    this.project.emails = [];
    this.project.emails[0] = this.layoutEmail;
    this.sendLayoutEmailservice.postSendLayoutEmail(this.project, this.selectedProjectId).subscribe(data => {
      alert("Sėkmingai išsiuntėte laiškus"), location.reload();
    }, error => alert("Nepavyko išsiųsti laiškų"));
  }

}
