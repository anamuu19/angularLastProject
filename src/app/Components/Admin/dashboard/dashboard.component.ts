import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  register: any;
  inst: any;
  hr: any;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.user();
    this.institution();
    this.manager();
  }

  user() {
    this.service.count().subscribe(response => {
      this.register = response;
    });
  }

  institution() {
    this.service.countInst().subscribe(response => {
      this.inst = response;
    });
    // Implement fetching institution data here
  }

  manager() {
    // Implement fetching manager data here
  }

  // title = 'angular17ssrapp';
	// chartOptions = {
	// 	title: {
	// 		text: "Angular Column Chart with Index Labels"
	// 	},
	// 	animationEnabled: true,
	// 	axisY: {
	// 		includeZero: true
	// 	},
	// 	data: [{
	// 		type: "column", //change type to bar, line, area, pie, etc
	// 		//indexLabel: "{y}", //Shows y value on all Data Points
	// 		indexLabelFontColor: "#5A5757",
	// 		dataPoints: [
	// 			{ x: 10, y: 71 },
	// 			{ x: 20, y: 55 },
	// 			{ x: 30, y: 50 },
	// 			{ x: 40, y: 65 },
	// 			{ x: 50, y: 71 },
	// 			{ x: 60, y: 92, indexLabel: "Highest\u2191" },
	// 			{ x: 70, y: 68 },
	// 			{ x: 80, y: 38, indexLabel: "Lowest\u2193"  },
	// 			{ x: 90, y: 54 },
	// 			{ x: 100, y: 60 }
	// 		]
	// 	}]
	// }





}
