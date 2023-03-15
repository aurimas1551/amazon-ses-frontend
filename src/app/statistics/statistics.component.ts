import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Email } from '../email';
import { OverallGraphData } from '../overall-graph-data';
import { Project } from '../project';
import { ProjectService } from '../service/project.service';
import { StatisticsEmail } from '../statistics-email';
import { StatisticsProject } from '../statistics-project';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  firstSelect: boolean = true;
  statisticsCreated: boolean = false;
  statisticsProjects: Array<StatisticsProject> = new Array<StatisticsProject>();
  apiProjects: any;
  projects: Array<Project>;
  selectedProjectId: number = -1;
  selectedProjectStatistics: StatisticsProject = new StatisticsProject();
  selectedProject: Project = new Project();
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  charData: Array<OverallGraphData> = [];
  barChartLabelsProject: string[] = [];
  charDataProject: Array<OverallGraphData> = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  datestart: any;
  form: FormGroup;
  startDate: Date;
  endDate: Date;

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let resp = this.projectService.getProjects();
    resp.subscribe((data) => this.apiProjects = data);
  }

  onBtnClickDateSelect() {
    let sDate = this.form.value.daterange.start
    let eDate = this.form.value.daterange.end
    let count = 0;
    this.startDate = new Date(new Date(sDate).setHours(sDate.getHours() + 3))
    this.endDate = new Date(new Date(eDate).setHours(eDate.getHours() + 3))
    let showingProject: Project = new Project();
    let showingProjectEmailStatistics: Array<StatisticsEmail> = new Array<StatisticsEmail>();
    showingProjectEmailStatistics[0] = new StatisticsEmail();
    showingProject.projectName = this.selectedProject.projectName
    showingProject.id = this.selectedProject.id
    showingProject.emails = new Array<Email>();
    for (let i = 0; i < this.selectedProject.emails.length; i++) {
      if (this.startDate <= new Date(this.selectedProject.emails[i].createdDate)) {
        if (this.endDate >= new Date(this.selectedProject.emails[i].createdDate)) {
          showingProject.emails[count] = new Email();
          showingProject.emails[count] = this.selectedProject.emails[i]
          count++
        }
      } else { }
    }
    showingProject.emails.sort((b, a) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    let counter = -1;
    for (let i = 0; i < showingProject.emails.length; i++) {
      if (i == 0) {
        showingProjectEmailStatistics[i].sentDate = showingProject.emails[i].createdDate
        showingProjectEmailStatistics[i].totalEmailCount = 1
        counter++;
        if (showingProject.emails[i].status == "Success") {
          showingProjectEmailStatistics[i].totalSuccessEmailCount = 1
          showingProjectEmailStatistics[i].totalMessageRejectedEmailCount = 0
        } else {
          showingProjectEmailStatistics[i].totalMessageRejectedEmailCount = 1
          showingProjectEmailStatistics[i].totalSuccessEmailCount = 0
        }
      }
      if (i != 0) {
        if (showingProjectEmailStatistics[counter].sentDate == showingProject.emails[i].createdDate) {
          showingProjectEmailStatistics[counter].totalEmailCount = showingProjectEmailStatistics[counter].totalEmailCount + 1
          if (showingProject.emails[i].status == "Success") {
            showingProjectEmailStatistics[counter].totalSuccessEmailCount = showingProjectEmailStatistics[counter].totalSuccessEmailCount + 1
          } else {
            showingProjectEmailStatistics[counter].totalMessageRejectedEmailCount = showingProjectEmailStatistics[counter].totalMessageRejectedEmailCount + 1
          }
        } else {
          showingProjectEmailStatistics[counter + 1] = new StatisticsEmail();
          showingProjectEmailStatistics[counter + 1].sentDate = showingProject.emails[i].createdDate
          showingProjectEmailStatistics[counter + 1].totalEmailCount = 1
          counter++
          if (showingProject.emails[i].status == "Success") {
            showingProjectEmailStatistics[counter].totalSuccessEmailCount = 1
            showingProjectEmailStatistics[counter].totalMessageRejectedEmailCount = 0
          } else {
            showingProjectEmailStatistics[counter].totalMessageRejectedEmailCount = 1
            showingProjectEmailStatistics[counter].totalSuccessEmailCount = 0
          }
        }
      }
    }
    for (let i = 0; i < showingProjectEmailStatistics.length; i++) {
      this.charDataProject[0].data.push(showingProjectEmailStatistics[i].totalEmailCount)
      this.charDataProject[1].data.push(showingProjectEmailStatistics[i].totalSuccessEmailCount)
      this.charDataProject[2].data.push(showingProjectEmailStatistics[i].totalMessageRejectedEmailCount)
      this.barChartLabelsProject[i] = "" + showingProjectEmailStatistics[i].sentDate
    }
    this.chart.update();
  }

  selectProjectChangeHandler(event: any) {
    if (this.statisticsCreated == false) {
      for (let i = 0; i < this.apiProjects.length; i++) {
        let statisticsProjectTemp = new StatisticsProject;
        statisticsProjectTemp.id = this.apiProjects[i].id
        statisticsProjectTemp.projectName = this.apiProjects[i].projectName
        let statisticEmail: StatisticsEmail = new StatisticsEmail();
        statisticEmail.totalEmailCount = this.apiProjects[i].emails.length;
        statisticEmail.totalMessageRejectedEmailCount = 0;
        statisticEmail.totalSuccessEmailCount = 0;
        for (let a = 0; a < this.apiProjects[i].emails.length; a++) {
          if (this.apiProjects[i].emails[a].status === "Success") {
            statisticEmail.totalSuccessEmailCount = statisticEmail.totalSuccessEmailCount + 1
          }
          if (this.apiProjects[i].emails[a].status === "MessageRejected") {
            statisticEmail.totalMessageRejectedEmailCount = statisticEmail.totalMessageRejectedEmailCount + 1
          }
        }
        statisticsProjectTemp.statisticsEmails = statisticEmail;
        this.statisticsProjects.push(statisticsProjectTemp)
      }
      this.charData[0] = new OverallGraphData();
      this.charData[0].data = []
      this.charData[0].label = "Iš viso"
      this.charData[1] = new OverallGraphData();
      this.charData[1].data = []
      this.charData[1].label = "Išsiųsti"
      this.charData[2] = new OverallGraphData();
      this.charData[2].data = []
      this.charData[2].label = "Atmesti"
      this.statisticsCreated = true;
    } else { }
    if (event.target.value == "all") {
      this.selectedProjectId = -2;
      for (let i = 0; i < this.statisticsProjects.length; i++) {
        this.charData[0].data.push(this.statisticsProjects[i].statisticsEmails.totalEmailCount)
        this.charData[1].data.push(this.statisticsProjects[i].statisticsEmails.totalSuccessEmailCount)
        this.charData[2].data.push(this.statisticsProjects[i].statisticsEmails.totalMessageRejectedEmailCount)
        this.barChartLabels[i] = this.statisticsProjects[i].projectName
      }
    } else {
      this.form = this.formBuilder.group({
        daterange: new FormGroup({
          start: new FormControl(),
          end: new FormControl(),
        })
      })
      this.selectedProjectId = event.target.value;
      this.projects = this.apiProjects
      let foundProject: any = this.projects.find(item => item.id == this.selectedProjectId)
      let foundProjectStatistics: any = this.statisticsProjects.find(item => item.id == this.selectedProjectId)
      this.selectedProjectStatistics = foundProjectStatistics;
      this.selectedProject = foundProject;
      this.charDataProject[0] = new OverallGraphData();
      this.charDataProject[0].data = []
      this.charDataProject[0].label = "Iš viso"
      this.charDataProject[1] = new OverallGraphData();
      this.charDataProject[1].data = []
      this.charDataProject[1].label = "Išsiųsti"
      this.charDataProject[2] = new OverallGraphData();
      this.charDataProject[2].data = []
      this.charDataProject[2].label = "Atmesti"
      if (this.firstSelect == false) {
        this.chart.update();
      }
      this.firstSelect = false;
    }

  }

}
