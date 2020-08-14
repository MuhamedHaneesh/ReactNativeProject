import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card,Button,Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


 class Contact extends Component {

     static navigationOptions = {
        title: 'Contact Us',
        tabBarIcon: ({ tintColor }) => (
            <IconFontAwesome
              name="home"
              style={{ color: tintColor }}
              size={Platform.OS === "ios" ? 28 : 20}
            />
          )
    };

    sendMail(){
        MailComposer.composeAsync({
            recipients:['example@gmail.com'],
            subject:'Testing',
            body:'Just Testing the MailComposer API of react native'
        })
    }
     render() {
        return(
            <View>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card title='Contact Information'>
                    <Text style={{margin: 10}}>121, Clear Water Bay Road</Text>
                    <Text style={{margin: 10}}>Clear Water Bay, Kowloon</Text>
                    <Text style={{margin: 10}}>HONG KONG</Text>
                    <Text style={{margin: 10}}>Tel: +852 1234 5678</Text>
                    <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
                    <Text style={{margin: 10}}>Email:confusion@food.net</Text> 
                    <Button title='Send Mail' buttonStyle={{backgroundColor:'#512DA8'}} icon={<Icon name='envelope-o' type='font-awesome' color='white'></Icon>}
                    onPress={this.sendMail}/>    
                </Card>
                </Animatable.View>
            </View>
        );
    }
}

 export default Contact;