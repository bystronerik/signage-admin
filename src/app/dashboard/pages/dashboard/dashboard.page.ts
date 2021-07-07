import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // TODO použít ngx-charts
  /*getPlayersStatisticsGraph() {
    const data: ChartDataSets[] = [
      { data: [8, 8, 8, 8, 7, 7, 8, 8, 8, 8, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 6, 6, 7, 7], label: 'Aktivní' },
    ];
    const labels: Label[] = [
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
    ];
    const options: ChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 4,
              suggestedMax: 10,
              stepSize: 1,
            },
          },
        ],
      },
    };
    const colors: Color[] = [
      {
        borderColor: '#057a55',
        backgroundColor: '#0e9f6e',
      },
    ];
    const legend = true;
    const type = 'line';
    const plugins = [];

    return {
      data,
      labels,
      options,
      colors,
      legend,
      type,
      plugins,
    };
  }*/
}
