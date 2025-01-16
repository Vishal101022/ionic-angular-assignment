import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SharedStateService } from '../shared-state.service';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { RouterModule } from '@angular/router';

import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  imports: [IonButton, IonContent, IonIcon, RouterModule],
  standalone: true,
})
export class Tab2Page implements OnInit {
  formData = {} as any;

  constructor(
    private sharedState: SharedStateService,
    private router: Router,
    private readonly geolocation$: GeolocationService
  ) {}

  weather: { temperature: number; windSpeed: number } = {
    temperature: 0,
    windSpeed: 0,
  };

  // fun to get data once the component is initialized
  ngOnInit() {
    // Subscribe to shared state
    this.sharedState.formData$.subscribe((data) => {
      if (data) {
        this.formData = data;
      } else {
        // go to the local storage if no data in shared state
        const savedData = localStorage.getItem('formData');
        if (savedData) {
          this.formData = JSON.parse(savedData);
        }
      }
    });
    this.getPosition();
  }

  // fun to get current location through geolocation
  getPosition() {
    this.geolocation$.subscribe((position) => {
      const { latitude, longitude } = position.coords;
      this.fetchWeather(latitude, longitude);
    });
  }

  // fun to fetch weather data
  async fetchWeather(latitude: number, longitude: number) {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = response.data.current_weather;
      this.weather = {
        temperature: weatherData.temperature,
        windSpeed: weatherData.windspeed,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // fun to go back
  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }
}
