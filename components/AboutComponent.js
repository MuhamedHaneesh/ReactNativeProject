import React, { Component } from 'react';
import { Text, FlatList ,SafeAreaView} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURl} from '../shared/baseURl'
import { ScrollView } from 'react-native-gesture-handler';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable'



const mapStateToProps = state => {
    return{
        leaders:state.leaders     
    }
}

function History() {
    return(
    <Card title='Our History'>
    <Text style={{margin: 10}}>Started in 2010, Ristorante con Fusion quickly established 
    itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion 
    cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
    Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your 
    plate the next time you visit us.</Text>
    <Text style={{margin: 10}}>The restaurant traces its humble beginnings to The Frying Pan, 
    a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time 
    the world's best cuisines in a pan.</Text>     
</Card>
    )
}

 class About extends Component {
    static navigationOptions = {
        title: 'About Us',
        tabBarIcon: ({ tintColor }) => (
            <IconFontAwesome
              name="home"
              style={{ color: tintColor }}
              size={Platform.OS === "ios" ? 28 : 20}
            />
          )
    };
   
     render() {
        // const {params} = this.props.navigations.state;  
        const renderLeaders = ({item, index}) =>    {
            return (
                    <ListItem
                        roundAvatar
                        key={index}
                        title={item.name}
                        titleStyle = {{color: 'black'}}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: {uri:baseURl + item.image}}}
                    />
            );
        };

        if(this.props.leaders.isLoading){
            return(
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView>
                        <History />
                        <Card title="Corporate Leadership">
                            <Loading />
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            )
        }
        else if(this.props.leaders.errMess){
            return(
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView>
                        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <History />
                        <Card title="Corporate Leadership">
                        <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                        </Animatable.View>
                    </ScrollView>
                </SafeAreaView>
            ) 
        }
        else{
            return( 
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <History />
                        <Card title='Corporate Leadership'>
                            <FlatList 
                                data={this.props.leaders.leaders}
                                renderItem={renderLeaders}
                                keyExtractor={item => item.id.toString()}
                                />
                        </Card>
                    </Animatable.View>
                    </ScrollView>
                </SafeAreaView>
            );
        }

        
    }
}

 export default connect(mapStateToProps)(About);