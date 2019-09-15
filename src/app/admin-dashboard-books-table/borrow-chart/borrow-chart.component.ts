import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {UserBookService} from '../../services/userBook.service';
import {ChartDataPoint} from '../../models/chartDataPoint';


@Component({
  selector: 'app-borrow-chart',
  templateUrl: './borrow-chart.component.html',
  styleUrls: ['./borrow-chart.component.css']
})
export class BorrowChartComponent implements OnInit {

  private dataPoints: ChartDataPoint[];

  constructor(private userBookService :UserBookService) {}


 async ngOnInit() {

    await this.userBookService.getDataChart().toPromise().then(value => this.dataPoints = value);

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      axisX:{
        labelAngle: -80,
        labelFontSize: 14,
        labelAutoFit: true,
        titleFontWeight: "bold",
      },
      axisY:{
        labelAngle: 0,
        labelFontSize: 14,
        labelAutoFit: true,
        titleFontWeight: "bold",
      },
      title: {
        text: "What users are currently reading?",
        fontFamily: "Abril Fatface",
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });

   chart.render();

  }

}
