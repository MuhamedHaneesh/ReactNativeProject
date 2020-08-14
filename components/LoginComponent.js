import React, {Component} from 'react';
import {View,StyleSheet,Text,ScrollView,Image, SafeAreaView, Picker} from 'react-native';
import {Icon,Input,CheckBox,Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import {Asset} from 'expo-asset';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseURl } from '../shared/baseURl';
import { color } from 'react-native-reanimated';

class LoginTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            remember :false
        }
    }
    componentDidMount(){
        console.log(this.state)
        SecureStore.getItemAsync('userinfo')
            .then((userdata) =>{
                let userInfo = JSON.parse(userdata)
                if(userInfo){
                    this.setState({userName: userInfo.userName})
                    this.setState({password:userInfo.password})
                    this.setState({remember:true})
                }
            })
    }
    static navigationOptions ={
        title :'Login',
        tabBarIcon:({tintColor}) =>(
            <Icon name='sign-in' type='font-awesome' size={24} iconStyle={{color:tintColor}}></Icon>
        )
    };
    handleLogin(){
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            console.log('entered into the do part')
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({userName:this.state.userName,password:this.state.password})
                )
                .catch((error)=> console.log('Could not save user info',error))
        }
        else{
            console.log('entered into the else part')
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('couldn not delete user info',error))
        }
    }

    render(){
        return(
            <View style= {styles.container}>
                <Input placeholder = "User Name"
                        leftIcon={{type:'font-awesome', name :'user-o'}}
                        onChangeText={(userName)=> this.setState({userName})}
                        value= {this.state.userName}
                        containerStyle={styles.formInput}/>
                <Input placeholder = "Password"
                        leftIcon={{type:'font-awesome', name :'key'}}
                        onChangeText={(password)=> this.setState({password})}
                        value= {this.state.password}
                        containerStyle={styles.formInput}/>
                <CheckBox  title= "Remember Me"
                            center
                            checked={this.state.remember}
                            onPress={()=>this.setState({remember: !this.state.remember})}
                            containerStyle= {styles.formCheckbox} />
                <View style={styles.formButton}>
                <Button onPress ={()=> this.handleLogin()} 
                            title= 'Login'
                            icon={
                                <Icon name='sign-in' 
                                    type='font-awesome' 
                                    color='white'
                                    size={24}>
                                </Icon>
                                }
                            buttonStyle={{backgroundColor:'#512DA8'}}    
                            color ='#512DA8'/>
                </View>
                <View style={styles.formButton}>
                <Button onPress ={()=> this.props.navigation.navigate('Register')} 
                            title= 'Register'
                            clear
                            icon={
                                <Icon name='user-plus' 
                                    type='font-awesome' 
                                    color='blue'
                                    size={24}>  
                                </Icon>
                                }
                            titleStyle={{color:'blue'}}    
                />
                </View>
            </View>
        )
    }
}   

class RegisterTab extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            firstname:'',
            lastname:'',
            email:'',
            remember:false,
            imageUrl:baseURl+'images/logo.png'
        }
    };

    getImageFromCamera=async () =>{
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraPermission.status ==='granted' && cameraRollPermission.status==='granted'){
            let capturedImage =await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            if (!capturedImage.cancelled){
                this.processImage(capturedImage.uri)
                // this.setState({imageUrl:capturedImage.uri})
            }
        }
    }

    getImageFromGallery = async() =>{
        const galleryPermission = await Permissions.askAsync(Permissions.CAMERA)
        const galleryRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(galleryPermission.status ==='granted' && galleryRollPermission.status ==='granted'){
            const libraryImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3],
                mediaTypes:'Images',
            });
            if(!libraryImage.cancelled){
                this.processImage(libraryImage.uri)
            }
        }
    }


    static navigationOptions ={
        title :'Register',
        tabBarIcon:({tintColor}) =>(
            <Icon name='user-plus' type='font-awesome' size={24} iconStyle={{color:tintColor}}></Icon>
        )
    };
    processImage = async(ImageUri)=>{
        let processImage = await ImageManipulator.manipulateAsync(ImageUri,
            [
                {resize:{width:400}}
            ],
            {format:'png'}
            );
            this.setState({imageUrl:processImage.uri})
    }
    handleRegister(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({userName:this.state.userName,password:this.state.password})
                )
                .catch((error)=> console.log('Could not save user info',error))
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <View style = {styles.container}  >
                        <View style={styles.imageContainer}>
                            <Image source={{uri:this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                             />
                             <Button title='Camera'  onPress={this.getImageFromCamera} />
                             <Button title='Gallaery' style={styles.buttonStyle} onPress={this.getImageFromGallery} />
                        </View>
                        <Input placeholder = "User Name"
                                leftIcon={{type:'font-awesome', name :'user-o'}}
                                onChangeText={(userName)=> this.setState({userName})}
                                value= {this.state.userName}
                                containerStyle={styles.formInput}/>
                        <Input placeholder = "Password"
                                leftIcon={{type:'font-awesome', name :'key'}}
                                onChangeText={(password)=> this.setState({password})}
                                value= {this.state.password}
                                containerStyle={styles.formInput}/>
                        <Input placeholder = "   Name"
                                leftIcon={{type:'font-awesome', name :'user-o'}}
                                onChangeText={(firstname)=> this.setState({firstname})}
                                value= {this.state.firstname}
                                containerStyle={styles.formInput}/>
                        <Input placeholder = "Last Name"
                                leftIcon={{type:'font-awesome', name :'user-o'}}
                                onChangeText={(lastname)=> this.setState({lastname})}
                                value= {this.state.lastname}
                                containerStyle={styles.formInput}/>
                        <Input placeholder = "Email"
                                leftIcon={{type:'font-awesome', name :'envelope-o'}}
                                onChangeText={(email)=> this.setState({email})}
                                value= {this.state.email}
                                containerStyle={styles.formInput}/>
                        <CheckBox  title= "Remember Me"
                                    center
                                    checked={this.state.remember}
                                    onPress={()=>this.setState({remember: !this.state.remember})}
                                    containerStyle= {styles.formCheckbox} />
                        <View style={styles.formButton}>
                            <Button onPress ={()=> this.handleLogin()} 
                            title= 'Register'
                            icon={
                                <Icon name='user-plus' 
                                    type='font-awesome' 
                                    color='white'
                                    size={24}>
                                </Icon>
                                }
                            buttonStyle={{backgroundColor:'#512DA8'}}    
                            color ='#512DA8'/>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
}

const Tab = createBottomTabNavigator();

function Login() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginTab} />
      <Tab.Screen name="Register" component={RegisterTab} />
    </Tab.Navigator>
  );
}
// const Login=createBottomTabNavigator({
//     Login:LoginTab,
//     Register:RegisterTab    
// },{
//     tabBarOptions:{
//         activeBackgroundColor:'#9575CD',
//         inactiveBackgroundColor:'#D1C4E9',
//         activeTintColor:'white',
//         inactiveTintColor:'gray'
//     }
// })

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        margin:20
    },
    formInput:{
        margin:20
    },
    formCheckbox:{
        margin:20,
        backgroundColor:null
    },
    formButton:{
        margin:60
    },
    imageContainer:{
        flex:1,
        flexDirection:'row',
        margin:20
    },
    image:{
        margin:10,
        width:80,
        height:60
    },
    buttonStyle:{
        marginRight:-10,
        color:'red'
    }
})


export default Login;