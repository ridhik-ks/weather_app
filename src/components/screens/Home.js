import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Location from '../../assets/images/location-gps.svg';
import Thermostat from '../../assets/images/thermostat.svg';
import Wind from '../../assets/images/wind.svg';
import Humidity from '../../assets/images/humidity.svg';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherImages, apiKey } from '../constants/index';


export default function Home({ navigation, route }) {

  const [isLoading,SetLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=kochi&days=5&aqi=no&alerts=no`)
    .then((response) => response.json())
    .then((json) => {
      setLocationData(json.location);
      setCurrentWeather(json.current);
      console.log(currentWeather.condition.text);
      setForecast(json.forecast.forecastday);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the fetch operation:', error);
    })
    .finally(() => SetLoading(false));
}, []);


  const handlePress = () => {
    navigation.navigate('ForecastScreen');
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!locationData || !currentWeather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
  }

  const getWeatherImage = (condition) => {
    return WeatherImages[condition] || require('../../assets/images/sunny.png'); 
  };

  return (
    <LinearGradient colors={['#07538d', '#071f5c', '#080745']} style={styles.linearGradient}>
      <View style={styles.section1}>
        <View style={styles.container}>
          <Text style={styles.place}>{`${locationData.name}, ${locationData.region}`}</Text>
          <Location style={styles.location} />
        </View>
        <Text style={styles.date}>{currentWeather.last_updated}</Text>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={getWeatherImage(currentWeather.condition.text)}  style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.list}>
            <View style={styles.row}>
              <Text style={styles.text}>Temp</Text>
              <Thermostat style={styles.icon} />
            </View>
            <Text style={styles.text1}>{currentWeather.temp_c}°</Text>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>Wind</Text>
              <Wind style={styles.icon} />
            </View>
            <Text style={styles.text1}>{currentWeather.wind_kph} km/h</Text>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>Humidity</Text>
              <Humidity style={styles.icon} />
            </View>
            <Text style={styles.text1}>{currentWeather.humidity}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.section2}>
        <View style={styles.sectionHeader}>
          <Text style={styles.todayText}>Today</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.viewAllText}>view all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
  {forecast.map((day, index) => {

    const itemStyle = index === 0 ? styles.firstItem : styles.container2;

    return (
      <View key={index} style={itemStyle}>
        <View style={styles.left}>
          <Image source={getWeatherImage(day.day.condition.text)} style={styles.img} />
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>{formatDate(day.date)}</Text>
          <Text style={styles.degree}>{`${day.day.avgtemp_c}°`}</Text>
        </View>
      </View>
    );
  })}
</ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingTop: 40,
  },
  section1: {
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  place: {
    color: '#fff',
    fontSize: 35,
    fontFamily: 'Gordita Regular',
  },
  location: {
    width: 70,
    height: 70,
  },
  date: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Gordita Regular',
  },
  image: {
    width: 290,
    height: 290,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    color: '#8b8c94',
    marginRight: 2,
    fontFamily: 'Gordita Regular',

  },
  text1: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'Gordita Regular',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  section2: {
    marginTop: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  todayText: {
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Gordita Regular',
    color: '#fff',
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Gordita Regular',
    color: '#0871ca',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07072a',
    width: 170,
    borderRadius: 15,
    marginLeft: 15,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  time: {
    color: '#fff',
    fontFamily: 'Gordita Regular',
    fontSize: 17,
  },
  degree: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Gordita Regular',
    fontWeight: 'bold',
  },
  right: {
    marginLeft: 12,
  },
  img: {
    width: 70,
    height: 70,
  },
  firstItem: {
    backgroundColor: '#07568f',
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    borderRadius: 15,
    marginLeft: 15,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,

  }
});

