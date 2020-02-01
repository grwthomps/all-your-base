class Forecast {
  constructor(location, full_forecast) {
    this.location = location
    this.currently = this.currentlyForecast(full_forecast.currently)
    this.hourly = this.hourlyForecast(full_forecast.hourly)
    this.daily = this.dailyForecast(full_forecast.daily)
  }

  forecastWithLocation() {
    return {
      location: this.location,
      currently: this.currently,
      hourly: this.hourly,
      daily: this.daily
    }
  }

  currentlyForecast(currently_forecast) {
    return {
      summary: currently_forecast.summary,
      icon: currently_forecast.icon,
      precipIntensity: currently_forecast.precipIntensity,
      precipProbability: currently_forecast.precipProbability,
      temperature: currently_forecast.temperature,
      humidity: currently_forecast.humidity,
      pressure: currently_forecast.pressure,
      windSpeed: currently_forecast.windSpeed,
      windGust: currently_forecast.windGust,
      windBearing: currently_forecast.windBearing,
      cloudCover: currently_forecast.cloudCover,
      visibility: currently_forecast.visibility
    }
  }

  hourlyForecast(hourly_forecast) {
    return {
      summary: hourly_forecast.summary,
      icon: hourly_forecast.icon,
      data: hourly_forecast.data.splice(0,8).map(hour_hash => {
        return {
          time: hour_hash.time,
          summary: hour_hash.summary,
          icon: hour_hash.icon,
          precipIntensity: hour_hash.precipIntensity,
          precipProbability: hour_hash.precipProbability,
          temperature: hour_hash.temperature,
          humidity: hour_hash.humidity,
          pressure: hour_hash.pressure,
          windSpeed: hour_hash.windSpeed,
          windGust: hour_hash.windGust,
          windBearing: hour_hash.windBearing,
          cloudCover: hour_hash.cloudCover,
          visibility: hour_hash.visibility
        }
      })
    }
  }

  dailyForecast(daily_forecast) {
    return {
      summary: daily_forecast.summary,
      icon: daily_forecast.icon,
      data: daily_forecast.data.splice(0,7).map(day_hash => {
        return {
          time: day_hash.time,
          summary: day_hash.summary,
          icon: day_hash.icon,
          sunriseTime: day_hash.sunriseTime,
          sunsetTime: day_hash.sunsetTime,
          precipIntensity: day_hash.precipIntensity,
          precipIntensityMax: day_hash.precipIntensityMax,
          precipIntensityMaxTime: day_hash.precipIntensityMaxTime,
          precipProbability: day_hash.precipProbability,
          precipType: day_hash.precipType,
          temperatureHigh: day_hash.temperatureHigh,
          temperatureLow: day_hash.temperatureLow,
          humidity: day_hash.humidity,
          pressure: day_hash.pressure,
          windSpeed: day_hash.windSpeed,
          windGust: day_hash.windGust,
          cloudCover: day_hash.cloudCover,
          visibility: day_hash.visibility,
          temperatureMin: day_hash.temperatureMin,
          temperatureMax: day_hash.temperatureMax
        }
      })
    }
  }
}

module.exports = Forecast;
