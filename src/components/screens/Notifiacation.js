import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherImages, apiKey } from '../constants/index';

function Notification() {

  const [isLoading,SetLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=kochi&days=5&aqi=no&alerts=no`)
      .then((response) => response.json())
      .then((json) => {
        setLocationData(json.location);
        setCurrentWeather(json.current);
        setNotification(json.forecast.forecastday);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the fetch operation:', error);
      })
      .finally(() => SetLoading(false));
  }, []);

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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headtext}>Notification</Text>
        </View>
        {notification.map((day, index) => (
          <View key={index} style={[styles.section, { backgroundColor: day.day.condition.text === 'Sunny' ? 'rgb(7 71 129)' : '#07568f' }]}>
            <View style={styles.section1}>
              <View style={styles.imagecontainer}>
                <Image style={styles.image} source={getWeatherImage(day.day.condition.text)} />
              </View>
              <Text style={styles.text1}>{day.day.condition.text}</Text>
            </View>
            <View style={styles.section2}>
              <Text style={styles.text2}>
                {day.day.condition.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
  },
  container: {
    paddingHorizontal: 25,
  },
  headtext: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
    fontFamily: 'Gordita Regular',
  },
  section: {
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 25,
  },
  section1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  imagecontainer: {
    backgroundColor: 'rgb(8 7 69)',
    borderRadius: 40,
    padding: 15,
    marginRight: 20,
  },
  image: {
    width: 35,
    height: 35,
  },
  text1: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Gordita Regular',
  },
  section2: {
    marginBottom: 20,
  },
  text2: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Gordita Regular',
  },
});

export default Notification;
