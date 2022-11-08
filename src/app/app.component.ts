import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';

interface Day {
  id: number;
  type: string;
}

interface Month {
  name: string;
  days: Day[];
  daysCount: number;
  festiveDays?: Day[];
}

interface Fiestas {
  name: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  months : Month[] = [
    {name: "Septiembre", days: [], daysCount: 30, festiveDays: [{id: 11, type: "Regional"}, {id: 29, type: "Local"}]}, 
    {name: "Octubre", days: [], daysCount: 31, festiveDays: [{id: 12, type: "Nacional"}, {id: 31, type: "Centre"}]}
  ];

  fiestas : Fiestas[] = [{name: "Fiesta Nacional", color: "rgb(9, 180, 9)"},
    {name: "Fiesta Regional", color: "rgb(114, 9, 219)"},
    {name: "Fiesta Local", color: "rgb(219, 7, 219)"}, 
    {name: "Fiesta Centre", color: "rgb(221, 221, 2)"}
  ];

  ngOnInit(): void {
    this.months.forEach((month, index) => {
      for (let idx = 1; idx <= month.daysCount; idx++) {
        var festivoPuesto = false;
        if(month.festiveDays && month.festiveDays.length > 0) {
          month.festiveDays.forEach(festiveDay => {
            if(idx == festiveDay.id) {
              festivoPuesto = true;
              this.months[index].days?.push({id: idx, type: festiveDay.type});
            }
          });
        }

        if(!festivoPuesto) {
          this.months[index].days?.push({id: idx, type: "Normal"});
        }
      }
    });
  }

  public obtenerColor(day: Day): string {
    switch(day.type){
      case "Nacional":
        return "nacional";
      case "Regional":
        return "regional";
      case "Local":
        return "local";
      case "Centre":
        return "centre";
      default:
        return "";
    }
  }
}
