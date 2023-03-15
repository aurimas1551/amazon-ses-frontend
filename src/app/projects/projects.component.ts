import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { Project } from '../project';
import { ProjectService } from '../service/project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  selectedProjectDelete: number;
  project: Project = new Project();
  apiProjects: any;
  projects: Array<Project>;
  selectedProject: Project = new Project();
  selectedProjectResend: Project = new Project();
  selectedProjectSaveEmails: Array<Email>;
  selectedProjectId: number = -1;
  deleteResp: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    let resp = this.projectService.getProjects();
    resp.subscribe((data) => this.apiProjects = data);
  }

  onBtnClickNewProject() {
    this.projectService.postProject(this.project).subscribe(data => { alert("Pavyko sukurti naują projektą"), location.reload()}, error => alert("Nepavyko sukurti naujo projekto"));
  }

  selectProjectChangeHandler(event: any) {
    this.selectedProjectId = event.target.value;
    this.projects = this.apiProjects
    let foundProject: any = this.projects.find(item => item.id == this.selectedProjectId)
    this.selectedProject = foundProject;
    this.selectedProject.emails.sort((b, a) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    this.selectedProjectSaveEmails = foundProject.emails;
  }

  selectFilterChangeHandler(event: any) {
    this.selectedProject.emails = this.selectedProjectSaveEmails
    let filteredData = this.selectedProject.emails.filter(item => {
      return item.status.toLowerCase() == event.target.value;
    })
    if (event.target.value == "visi") {
      this.selectedProject.emails = this.selectedProjectSaveEmails
    } else {
      this.selectedProject.emails = filteredData;
    }
  }

  onBtnClickResendSelectedProjectEmails() {
    if (this.selectedProjectResend.emails.length == 0) {
      alert("Šis projektas neturi laiškų, kuriuos galima persiųsti.")
      location.reload();
    } else {
      this.projectService.postResendProject(this.selectedProjectResend.id, this.selectedProjectResend).subscribe(data => { alert("Laiškai buvo persiųsti"),location.reload() }, error => alert("Nepavyko persiųsti"));
    }
  }

  selectResendProjectChangeHandler(event: any) {
    let selectedProjectId = event.target.value;
    let projects: Array<Project> = this.apiProjects
    let foundProject: any = projects.find(item => item.id == selectedProjectId)
    this.selectedProjectResend = foundProject
    this.selectedProjectResend.emails = this.selectedProjectResend.emails.filter(item => item.status === "MessageRejected")
  }

  selectDeleteProjectChangeHandler(event: any) {
    this.selectedProjectDelete = event.target.value;
  }

  onBtnClickDeleteSelectedProject() {
    this.projectService.deleteProject(this.selectedProjectDelete).subscribe((data) => this.deleteResp = data);
    location.reload();
  }

}
