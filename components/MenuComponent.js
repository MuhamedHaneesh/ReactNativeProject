import React, { Component } from 'react';
import { View, FlatList, SafeAreaView,Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { baseURl } from '../shared/baseURl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

// this.props.navigation.openDrawer();
class Menu extends Component {

    static navigationOptions = {
        title: 'Menu',
        tabBarIcon: ({ tintColor }) => (
            <IconFontAwesome
                name="home"
                style={{ color: tintColor }}
                size={Platform.OS === "ios" ? 28 : 20}
            />
        )
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            // console.log(item)
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000} delay={1000}>  
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        imageSrc={{ uri: baseURl + item.image }}
                    />
                    </Animatable.View>
            );
        };
        if (this.props.dishes.isLoading) {
            return (

                <Loading />

            )
        }
        else if (this.props.dishes.errMess) {
            return (
                <View><Text>{this.props.dishes.errMess}</Text></View>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>

            );
        }
    }

}


export default connect(mapStateToProps)(Menu);