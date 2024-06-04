import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherImages, apiKey } from '../constants/index';

function Widgets() {
  const [isLoading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherImage = (condition) => {
    return WeatherImages[condition] || require('../../assets/images/sunny.png'); 
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=kozhikode&days=1&aqi=no&alerts=no`),
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=palakkad&days=1&aqi=no&alerts=no`),
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Thiruvananthapuram&days=1&aqi=no&alerts=no`),
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Thrissur&days=1&aqi=no&alerts=no`),
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=malappuram&days=1&aqi=no&alerts=no`),

        ]);

        const data = await Promise.all(responses.map(response => response.json()));

        setWeatherData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!weatherData.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#07538d', '#071f5c', '#080745']} style={styles.linearGradient}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.widgets}>Widgets</Text>
        </View>
        {weatherData.map((data, index) => (
          data.forecast.forecastday.map((day, dayIndex) => (
            <View key={`${index}-${dayIndex}`}>
              {day.day.condition.text === 'Sunny' ? (
                <ImageBackground 
                  source={WeatherImages.Clouds}
                  style={styles.backgroundimage}
                  imageStyle={{ borderRadius: 12 }}>
                  <View style={styles.section}>
                    <Image source={getWeatherImage(day.day.condition.text)} style={styles.image}/>
                    <View style={styles.textContainer}>
                      <Text style={styles.text1}>{`${data.location.name},\n${data.location.region}`}</Text>
                      <Text style={styles.text2}>{day.day.condition.text}</Text>
                    </View>
                    <Text style={styles.temp}>{`${day.day.avgtemp_c}°`}</Text>
                  </View>
                </ImageBackground>
              ) : (
                <View style={[styles.section, styles.backgroundColor]}>
                  <View style={styles.section}>
                    <Image source={getWeatherImage(day.day.condition.text)} style={styles.image}/>
                    <View style={styles.textContainer}>
                      <Text style={styles.text1}>{`${data.location.name}, ${data.location.region}`}</Text>
                      <Text style={styles.text2}>{day.day.condition.text}</Text>
                    </View>
                    <Text style={styles.temp}>{`${day.day.avgtemp_c}°`}</Text>
                  </View>
                </View>
              )}
            </View>
          ))
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  widgets: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'Gordita Regular',
    marginBottom: 30,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  textContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Gordita Regular',
    marginBottom: 8,
    width: 150
  },
  text2: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Gordita Regular',
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  temp: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Gordita Regular',
    marginLeft: 10
  },
  backgroundimage: {
    height: 120,
    marginHorizontal: 10,
    marginBottom: 15,
    flex: 1,
  },
  backgroundColor: {
    backgroundColor: '#07072a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080745',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080745',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
  linearGradient: {
    flex: 1,
    paddingTop: 40,
  },
});

export default Widgets;
