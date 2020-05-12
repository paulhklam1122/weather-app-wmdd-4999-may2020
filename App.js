import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Form from './components/Form'
import Content from './components/Content'
import Footer from './components/Footer'

const API_KEY = 'c8c4865b1ee49f77a87780ffabb644b3'

const images = {
  Clear: 'http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg',
  Clouds:
    'https://www.princeton.edu/sites/default/files/styles/full_2x/public/images/2018/01/clouds-19.jpg?itok=7jputHX1',
  Rain:
    'https://i.pinimg.com/736x/54/59/d7/5459d741279e8d72661990f52774473f--cell-phone-wallpapers-gif-photos.jpg'
}

export default class App extends Component {
  state = {
    temp: '',
    windSpeed: '',
    pressure: '',
    minTemp: '',
    city: '',
    countryCode: ''
  }

  fetchData = () => {
    this.fetchWeatherDataForCity(this.state.city)
  }

  fetchWeatherDataForCity = async city => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const apiCall = await fetch(url)

    const response = await apiCall.json()
    console.log('response', response)

    this.setState({
      temp: response.main.temp,
      windSpeed: response.wind.speed,
      minTemp: response.main.temp_min,
      pressure: response.main.pressure,
      countryCode: response.sys.country,
      weather: response.weather[0].main
    })
  }

  render() {
    const {
      city,
      countryCode,
      temp,
      minTemp,
      windSpeed,
      pressure,
      weather
    } = this.state
    return (
      <View style={styles.container}>
        <Image
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          source={{ uri: images[weather] }}
        />
        <Form
          onSubmit={this.fetchData}
          onChangeText={text => this.setState({ city: text })}
        />
        <Content
          temp={temp}
          city={city}
          countryCode={countryCode}
          weather={weather}
        />
        <Footer pressure={pressure} windSpeed={windSpeed} minTemp={minTemp} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
