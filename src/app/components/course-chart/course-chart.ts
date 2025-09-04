import { Component, OnInit } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions, AgPieSeriesOptions } from 'ag-charts-community';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-course-chart',
  standalone: true,
  imports: [AgCharts],
  template: `<ag-charts style="width:100%; height:400px;" [options]="chartOptions"></ag-charts>`
})
export class CourseChart implements OnInit {
  public chartOptions: AgChartOptions = {
    title: { text: 'Course Summary' },
    data: [], 
    series: [
      <AgPieSeriesOptions>{
        type: 'pie',
        angleKey: 'count',
        calloutLabelKey: 'course',
        sectorLabelKey: 'count',
        fills: ['#000000', '#5682B1', '#739EC9', '#FFE8DB'],
        strokes: ['#fff'],
      },
    ],
    legend: {
      position: 'right',
      item: { label: { fontSize: 14 } }
    },
    tooltip: { enabled: true }
  };

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadCourseSummary();
  }

  private loadCourseSummary() {
    this.studentService.getCourseSummary().subscribe({
      next: (data) => {
        this.chartOptions = {
          ...this.chartOptions,
          data 
        };
      },
      error: (err) => {
        console.error('Error loading course summary:', err);
      }
    });
  }
}
