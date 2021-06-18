import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { ProjectNewModel } from '../../../../shared/models/project-new.model';
import { NewProjectUtils } from '../../../../shared/utils/new-project.utils';

@Component({
  selector: 'app-profile-projects-chart',
  templateUrl: './profile-projects-chart.component.html',
  styleUrls: ['./profile-projects-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProjectsChartComponent implements OnChanges {
  @ViewChild('chart', { static: false })
  chart: ElementRef;

  @Input()
  projects: ProjectNewModel[] = [];

  @Input()
  projectsMaxPeriod: moment.Moment[];

  private readonly colors = [
    'rgba(119, 227, 200,',
    'rgba(246, 138, 136,',
    'rgba(202, 208, 72,',
    'rgba(66, 146, 139,',
    'rgba(34, 180, 196,',
    'rgba(250, 154, 15,',
    'rgba(164, 153, 142,',
    'rgba(89, 166, 94,',
    'rgba(199, 72, 74,',
    'rgba(91, 52, 36,',
  ];

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.projects?.currentValue || changes?.projectsMaxPeriod?.currentValue) {
      const datasets: ChartDataSets[] = this.generateDatasetsFromProjects(this.projects, this.projectsMaxPeriod);

      this.generateBarChart(datasets);
    }
  }

  private generateDatasetsFromProjects(projects: ProjectNewModel[], datesPeriod: moment.Moment[]) {
    return projects.map((p, i) => ({
      label: p.project_name,
      steppedLine: 'middle' as 'middle',
      backgroundColor: `${this.colors[i]} 1)`,
      borderWidth: 1,
      data: datesPeriod?.map((d) => {
        const fromMetadata = p.metadata.find((m) => d.isSame(NewProjectUtils.mapMetadataToDate(m), 'months'));

        return {
          x: d,
          y: fromMetadata ? fromMetadata.percent : 0,
        };
      }),
    }));
  }

  private generateBarChart(datasets: ChartDataSets[]) {
    const canvas = document.createElement('canvas');
    this.elRef.nativeElement.innerHTML = '';
    this.elRef.nativeElement.appendChild(canvas);

    const myChart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        datasets,
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false,
          filter: (tooltipItem, data) => {
            const setIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.index;

            return data.datasets[setIndex].data[dataIndex]['y'] !== 0;
          },
          callbacks: {
            title: (tooltipItems, data) => {
              if (!tooltipItems || !tooltipItems.length) {
                return '';
              }

              const label: string = tooltipItems[0]['xLabel'] as string;
              const labelAsArray = label.split(' ');

              return `${labelAsArray[0]} ${labelAsArray[2]}`.replace(',', '');
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              stacked: true,
              ticks: {
                reverse: true,
              },
              time: {
                unit: 'month',
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                max: 110,
              },
            },
          ],
        },
      },
    });
  }
}
