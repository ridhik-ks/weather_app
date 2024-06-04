import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherImages, apiKey } from '../constants/index';

function Forcast() {

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
      setForecast(json.forecast.forecastday);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem with the fetch operation:', error);
    })
    .finally(() => SetLoading(false));
}, []);

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

    const getDayFromDate = (dateString) => {
      const date = new Date(dateString);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      dayIndex = date.getDay();
      return days[dayIndex];
    };

 
  return (
    <LinearGradient colors={['#07538d', '#071f5c', '#080745']} style={styles.linearGradient}>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.headtext}>Forcast report</Text>
            </View>
            <View style={styles.section2}>
            <View style={styles.sectionHeader}>
            <Text style={styles.todayText}>Today</Text>
            <TouchableOpacity>
                <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
            </View>
            <ScrollView horizontal>
            {forecast
            .filter(day => {
              const today = new Date().toISOString().slice(0,10);
              return day.date === today;
            })
            .map((day,index) => (
              <View key={index} style={styles.container1}>
              <View style={styles.left}>
                <Image source={getWeatherImage(currentWeather?.condition?.text)} style={styles.img} />
              </View>
              <View style={styles.right}>
                <Text style={styles.time}>{formatDate(day.date)}</Text>
                <Text style={styles.degree}>{`${day.day.avgtemp_c}°`}</Text>
              </View>
              </View>
              ))}
              </ScrollView>
            </View>
            <View style={styles.container2}>
                <View style={styles.section3}>
                    <Text style={styles.text1}>Next forecast</Text>
                    <TouchableOpacity style={styles.section4}>
                        <Text style={styles.text2}>5 days</Text>
                        <Image style={styles.image1} source={require('../../assets/images/downarrow.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container3}>
                    {forecast.map((day, index) => (
                      <View key={index} style={styles.section5}>
                      <View>
                          <Text style={styles.text3}>{getDayFromDate(day.date)}</Text>
                          <Text style={styles.text4}>{formatDate(day.date)}</Text>
                      </View>
                      <Text style={styles.degree2}>{`${day.day.avgtemp_c}°`}</Text>
                      <Image style={styles.image2} source={getWeatherImage(currentWeather?.condition?.text)} />
                  </View>
                    ))}
                </ScrollView>    
            </View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: '100%'
    },
    headtext:{
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 50,
        fontFamily: 'Gordita Regular',

      },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#07568f',
        width: 385,
        height: 100,
        borderRadius: 15,
        marginLeft: 15,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
      },
      section2: {
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
        color: '#fff',
        fontFamily: 'Gordita Regular',

      },
      viewAllText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0871ca',
        fontFamily: 'Gordita Regular',

      },
      time: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Gordita Regular',

      },
      degree: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Gordita Regular',

      },
      right: {
        marginLeft: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 300,
        
      },
      container2:{
        marginTop: 35,
      },
      section3: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      text1: {
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
    fontFamily: 'Gordita Regular',

      },
      text2: {
        fontSize: 13,
        color: '#fff',
        marginRight: 4,
        fontFamily: 'Gordita Regular',

      },
      image1:{
        width: 18,
        height: 18,
      },
      section4: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(7 25 70)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20

      },
      container3: {
        paddingHorizontal: 12,
        marginTop: 20,
      },
      section5: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#07072a',
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 12,
      },
      text3: {
        color: 'white',
        fontSize: 18,
    fontFamily: 'Gordita Regular',

      },
      text4: {
        color: 'white',
        fontSize: 18,
    fontFamily: 'Gordita Regular',

      },
      degree2: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
    fontFamily: 'Gordita Regular',

      },
      image2:{
        width: 80,
        height: 60,
      },
      img: { 
        width: 80,
        height: 50,
       }
})

export default Forcast