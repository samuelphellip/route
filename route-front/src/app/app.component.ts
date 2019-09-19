import { Component, ViewChild, ElementRef  } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('origem', {static: false}) origem: ElementRef;
  @ViewChild('destino', {static: false}) destino: ElementRef;

  constructor(private service: AppService) {}

  lat: Number = -19.9023386;
  lng: Number = -44.1041385;
  zoom: Number = 14;

  dir = undefined;
  points = [];
  polyline = '';

  public getDirection() {
    this.dir = {
      origin: this.origem.nativeElement.value,
      destination: this.destino.nativeElement.value
    }
  }

  public onResponse(event: any) {
    this.polyline = event.routes[0].overview_polyline;

    this.getTolls(this.polyline)
  }

  public getTolls(polyline) {
    const url = `http://localhost:8041/api/v1/routes/tolls`;
    const body = 
    {
      "polyline": polyline
    }

    this.service.get(url, body).subscribe(res => {
      this.points = res.data
    });
  }
}
