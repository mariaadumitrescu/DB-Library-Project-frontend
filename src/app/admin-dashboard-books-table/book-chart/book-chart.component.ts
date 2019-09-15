import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import {StatusDataPoint} from '../../models/StatusDataPoint';
import {UserBookService} from '../../services/userBook.service';


@Component({
  selector: 'app-book-chart',
  templateUrl: './book-chart.component.html',
  styleUrls: ['./book-chart.component.css']
})
export class BookChartComponent implements OnInit {

  private dataPoints: StatusDataPoint[];

  constructor(private userBookService :UserBookService) { }

  async ngOnInit() {

    await this.userBookService.getStatusDataChart().toPromise().then(value => this.dataPoints = value);

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Availability of books",
        fontFamily: "Abril Fatface",
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: Stock: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: this.dataPoints
      }]
    });

    chart.render();

  }

}
