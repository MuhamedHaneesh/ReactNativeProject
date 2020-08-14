
import React, {Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import Login from './LoginComponent'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'




export default Drawers = () => {
    const Drawer = createDrawerNavigator();
    return (
      // <div></div>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Login" component={Login} options={{
          title: 'Login',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="sign-in"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
            <Drawer.Screen name="Home" component={Home} options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
            <Drawer.Screen name="Contact" component={Contact} options={{
          title: 'Contact',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="address-card"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
            <Drawer.Screen name="About" component={About} options={{
          title: 'About Us',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="info-circle"
              size={size} 
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
            <Drawer.Screen name="Menu" component={Menu} options={{
          title: 'Menu',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="list"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
        <Drawer.Screen name="Reservation" component={Reservation} options={{
          title: 'Reservation',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="cutlery"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
        <Drawer.Screen name="Favorites" component={Favorites} options={{
          title: 'Favorites',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="heart"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}/>
            {/* <Drawer.Screen name="Dishdetail" component={Dishdetail} /> */}
          </Drawer.Navigator>
    )
  };