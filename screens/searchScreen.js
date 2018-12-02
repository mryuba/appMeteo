import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import {LinearGradient} from 'expo';

export default class App extends React.Component {

    constructor(props){
        super(props);
        var navigation = this.props.navigation;
        this.state = {
            cities: [
                { name: "Brescia",
                  country: "Italy"
                },
                { name: "Milano",
                  country: "Italy"
                },
                { name: "Bergamo",
                  country: "Italy"
                },
                { name: "Verona",
                  country: "Italy"
                },
                { name: "Concesio",
                  country: "Italy"
                },
                { name: "Bovezzo",
                  country: "Italy"
                },
                { name: "Doha",
                  country: "Qatar"
                },
                { name: "Sydney",
                  country: "Australia"
                },
                { name: "Cancun",
                  country: "Mexico"
                },
                { name: "Madrid",
                  country: "Spain"
                },
                { name: "Berlin",
                  country: "Germany"
                },
                { name: "Brussels",
                  country: "Belgium"
                },
                { name: "Copenhagen",
                  country: "Denmark"
                },
                { name: "Athens",
                  country: "Greece"
                },
                { name: "New Delhi",
                  country: "India"
                },
                { name: "Dublin",
                  country: "Ireland"
                },
                { name: "Rome",
                  country: "Italy"
                },
                { name: "Tokyo",
                  country: "Japan"
                },
                { name: "Wellington",
                  country: "New Zealand"
                },
                { name: "Amsterdam",
                  country: "Netherlands"
                },
                { name: "Oslo",
                  country: "Norway"
                },
                { name: "Panama City",
                  country: "Panama"
                },
                { name: "Lisbon",
                  country: "Portugal"
                },
                { name: "Warsaw",
                  country: "Poland"
                },
                { name: "Moscow",
                  country: "Russia"
                }
              ],
              list: [],
              refresh: true,
    };
    this.fetchTemps();
}

fetchTemps = () => {
    var newList = [];
    var list = this.getRandom(this.state.cities, 7)    
    for (city in list) {

        var name = list[city].name;
        var country = list[city].country;
        this.fetchCityTemp(name,country,newList);

    }
}

    getRandom = (arr, n) => {
        var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
        while(n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken [x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    loadNewTemps = () => {
        this.setState({
            list: [],
            refresh:true,
        })
        this.fetchTemps();
    }

    //fetch Data
    fetchCityTemp = (city, country, newList) => {
        
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=f5fec97b4215b154bbbf241612d145ae&units=metric')
        .then((response) => response.json() )
        .then((responseJson) => {
            var r = responseJson.main;
            var obj = responseJson;
            var city = {
                name: obj.name,
                country: country,
                temp: Math.ceil(r.temp),
                type: obj.weather[0].main,
                desc: 'Humidity: '+r.humidity+'% - '+obj.weather[0].main,
            };

            newList.push(city);
            console.log('before', this.state.list);
            this.setState({
                list: newList,
                refresh:false,
            });
            console.log('after',this.state.list);
        })
    }

    getTempRage = (t) =>{
        if (t < 11){
            return 1;
        }
        if (t >= 11 && t < 20){
            return 2;
        }
        if (t >= 20 && t <30){
            return 3;
        }
        if (t >= 30){
            return 4;
        }
    }

    getEmoji = (type) => {
        if(type=='Clouds'){
            return '☁️';
        }
        if(type=='Clear'){
            return '☀️';
        }
        if(type=='Haze'){
            return '🌤';
        }
        if(type=='Thunderstorm'){
            return '⛈';
        }
        if(type=='Rain'){
            return '🌧';
        }
        if(type=='Snow'){
            return '❄️';
        }
        if(type=='Mist'){
            return '🌦';
        }
        if(type=='Fog'){
            return '🌫';
        }
    }

    render () {
    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
            <Text style ={{width:'100%',paddingTop:40,paddingBottom:15,backgroundColor:'pink',color: 'white', textAlign:'center',fontWeight:'bold'}}>City Weather</Text>

            <FlatList
            style={{width:'100%'}}
            data={this.state.list}
            refreshing={this.state.refresh}
            onRefresh={this.loadNewTemps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
                <TouchableHighlight
                onPress = { () => alert(item.desc) }>
                <LinearGradient
                    colors={['#fff', '#f8f8f8']}
                    start={[0, 0.5]}
                >
                <View style={styles.row}>
                    <Text style={[
                        (this.getTempRage(item.temp)== 1) ? styles.cold : styles.temp,
                        (this.getTempRage(item.temp)== 2) ? styles.medium : styles.temp,
                        (this.getTempRage(item.temp)== 3) ? styles.hot : styles.temp,
                        (this.getTempRage(item.temp)== 4) ? styles.vhot : styles.temp,



                        styles.temp]}>{this.getEmoji(item.type)} {item.temp}°C</Text>
                    <Text style={styles.cityName}>{item.name}</Text>
                </View>
                </LinearGradient>
                </TouchableHighlight>
            )}
            />
        </View>
        
    );
    }
}

const styles = StyleSheet.create({
    cold:{color:'blue'},
    medium:{color:'green'},
    hot:{color:'orange'},
    vhot:{color:'red'},
    temp:{
        fontSize:30,
        lineHeight:40,
        width:130,
        marginRight:15,
        fontWeight: 'bold'
    },
    cityName:{
        fontSize:20,
        lineHeight: 40,
    },
    row:{
        flex:1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderBottomColor:'white'

    },
    container: {
        justifyContent:'center', 
        alignItems:'center', 
        flex:1,
        backgroundColor: '#fff',

    }
})