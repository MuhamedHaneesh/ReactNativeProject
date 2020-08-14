import React, {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation  from './ReservationComponent';
import Favorites from './FavoriteComponent'
import { View, Platform,ToastAndroid } from 'react-native';
import Drawers from "./Drawers";
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchDishes,fetchComments,fetchPromos,fetchLeaders} from '../redux/ActionCreators';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo'

// import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

// import { createDrawerNavigator } from '@react-navigation/drawer';
const mapStateToProps =state => {
  return {
    
   }
}

const mapDispatchToProps = dispatch =>({
  fetchDishes:() => dispatch(fetchDishes()),
  fetchComments:() => dispatch(fetchComments()),
  fetchLeaders:() => dispatch(fetchLeaders()),
  fetchPromos:() => dispatch(fetchPromos())
})


const Stack = createStackNavigator();
function RootStack() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    
    <Stack.Navigator
      initialRouteName="Home"
      component={Home}
      screenOptions={{ gestureEnabled: false }}
      
    >
     
      <Stack.Screen
        name="About"
        component={About}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              title="Info"
              color="#fff"
            />
          ),
        }}
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        screenOptions={{ gestureEnabled: true }}
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
          name="Reservation"
          component={Reservation}
          
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
          name="Favorites"
          component={Favorites}
          
        // initialParams={{ user: 'me' }}
      />
      
      <Stack.Screen
        name="Home"
        component={Drawers}
        screenOptions={{ gestureEnabled: true }}
        header
        />
         
    </Stack.Navigator>
  );
}





class Main extends Component {

  componentDidMount(){
    // console.log('hi bro------------------')
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
    this.props.fetchPromos();

    NetInfo.fetch().then((connectionInfo)=>{
      ToastAndroid.show('Initial Network Connectivity '+connectionInfo.type +', effectiveType: '+connectionInfo.isConnected,
      ToastAndroid.LONG ) 
    });

    NetInfo.addEventListener(this.handleConnectivityChange )
  }

  // componentWillUnmount(){
  //   NetInfo.removeEventListener('connectionChange',this.handleConnectivityChange);
  // }

  handleConnectivityChange = (connectionInfo)=>{
    switch(connectionInfo.type){
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WIFI!', ToastAndroid.LONG)
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to cellular!', ToastAndroid.LONG)
        break;
      case 'unknown':
        ToastAndroid.show('You now have an unknown connnection', ToastAndroid.LONG)
        break;
      default:
        break;  
    }
  }

  render() {
    
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
             <RootStack />
         </View>
    );
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Main);