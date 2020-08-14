import React, {Component} from 'react';
import {useState} from 'react';
import {Text,View,ScrollView,StyleSheet,Picker,Switch,Button,SafeAreaView,TouchableOpacity,Modal, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import * as Animatable from 'react-native-animatable';
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'

class Reservation extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            guests:1,
            smoking:false,
            chosenDate:'',
            isVisible:false,
            showModal:false
        }
    }
    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    handlePicker =(datetime) =>{
        this.setState({
            isVisible:false,
            chosenDate:moment(datetime).format('YYYY-MM-DD HH:mm')
        })
    }
    hidePicker =() =>{
        this.setState({
            isVisible:false
        })
    }
    showPicker =() =>{
        this.setState({
            isVisible:true
        })
    }
    static navigationOptions ={
        title :'Reserve Table'
    }

    static async obtainCalendarPermissionToAdd(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.CALENDAR)
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to use calendar')
        }
        }
    return permission  
    //     const { permission } = await Calendar.requestCalendarPermissionsAsync();
    //     if (permission.status !== 'granted') {
    //         permission = await Permissions.askAsync(Permissions.CALENDAR);
    //         if(permission !== 'granted'){
    //             Alert.alert('Permission not granted to show notfication/ access the calendar')
    //     }
    // }
    //     return permission;
    }

    static async addReservationToCalendar(date){
        await Reservation.obtainCalendarPermissionToAdd()
        const startDate = new Date(Date.parse(date))
        const endDate = new Date(Date.parse(date) + 2*60*60*1000)
        const calendar = await Calendar.getDefaultCalendarAsync()
        Calendar.createEventAsync(calendar.id, {
        title: 'Con Fusion Table Reservation',
        startDate: startDate,
        endDate: endDate,
        timeZone: 'Asia/Hong_Kong',
        location: '121, Clear Water Bay Road, Kowloon, Hong Kong'
        })
        // await Reservation.obtainCalendarPermissionToAdd()
        // const startDate = this.state.chosenDate
        // const endDate = this.state.chosenDate+ (2 * 60 * 60 * 1000); // 2 hours
        
        // Calendar.createEventAsync(
        //     "Calendar",{
        //         title:"Reservation from Native APP",
        //         location:'Duabi',
        //         startDate,
        //         endDate,
        //         timeZone:'GMT'
        //     }
        // );
        // Alert.alert('Reservation has been added to your calendar')
        // console.log(startDate,endDate)
    }

    confirmReservationByAddingToCalendar(date){
        Reservation.presentLocalNotification(date);
        Reservation.addReservationToCalendar(date);
        this.resetForm()
    }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        Alert.alert('Your Reservation is OK?','Numer Of Guests: '+ this.state.guests+'\nSmoking?'+this.state.smoking +'\nDate and Time :'+ this.state.chosenDate,
        [
            {
                text:'Cancel',onPress:() =>this.resetForm(), style:'cancel'
            },
            {
                text:'OK', onPress:() => {
                    this.confirmReservationByAddingToCalendar(this.state.chosenDate)
                    // this.presentLocalNotification(this.state.date)
                    // this.resetForm()
                }
            },
        ],
        {cancelable:false}
        );
    }

    resetForm(){
        this.setState({
            guests:1,
            smoking:false,
            chosenDate:''
        })
    }
    static async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted to show the notification')
            }
        }
        return permission;
    }
    static async presentLocalNotification(date){
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title:'Your Reservation',
            body:'Reservation for '+date +'requested',  
            ios:{
                sound:true
            },
            android:{
                sound:true,
                vibrate :true,
                color:'#512DA8'
            }
        })
    }


    render(){
        
        return(
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <Animatable.View animation="zoomInDown" duration={5000} delay={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number Of Guests</Text>
                        <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(itemValue,itemIndex)=>this.setState({guests:itemValue})}>
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View  style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(value) =>this.setState({smoking:value})}
                        >
                        </Switch>
                    </View>
                    <View  style={styles.formRow} >
                        <Text style={{color:'red',fontSize:20}}>{this.state.chosenDate}</Text>
                        <View>
                            <TouchableOpacity onPress ={this.showPicker}>
                                <Text style={styles.text}>Show DatePicker</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                            onDateChange={(date) => {this.setState({chosenDate: date})}}
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'datetime'}
                            />
                    </View>
                    </View>
                    <View  style={styles.formRow} >
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={()=>this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                            />
                    </View>
                    <Modal
                        animationType={'slide'} transparent={false} visible={this.state.showModal} onDismiss={()=>{this.toggleModal();this.resetForm()}}
                        onRequestClose={()=>{this.toggleModal();this.resetForm()}}
                           >
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests:{this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking:{this.state.smoking?'Yes':'No'}</Text>
                            <Text style={styles.modalText}>Date And Time Is:{this.state.chosenDate}</Text>
                            <Button onPress={()=>{this.toggleModal();this.resetForm()}} color='#512DA8' title='Close'/>
                        </View>
                    </Modal>
                    </Animatable.View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles =StyleSheet.create({
    formRow:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        flexDirection:"row",
        margin:20
    },
    formLabel:{
        fontSize:18,
        flex:2
    },
    formItem:{
        flex:1
    },
    button:{
        width:150,
        height:30,
        backgroundColor:'#330066',
        borderRadius:30,
        justifyContent:"center",
        marginTop:15
    },
    text:{
        fontSize:18,
        color:'blue',
        textAlign:"center"
    },
    modal:{
        justifyContent:"center",
        margin:20
    },
    modalTitle:{
        fontSize:20,
        fontWeight:"bold",
        backgroundColor:"#512DA8",
        textAlign:"center",
        color:'white',
        marginBottom:20
    },
    modalText:{
        fontSize:18,
        margin:10
    }
})

export default Reservation;