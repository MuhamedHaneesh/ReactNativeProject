import React, {Component} from 'react';
import { Text, View,ScrollView,FlatList, SafeAreaView,SectionList,Modal,Button,Alert,PanResponder,StyleSheet, Share } from 'react-native';
import { Card,Icon,Rating,Input } from 'react-native-elements';
import {baseURl} from '../shared/baseURl';
import { connect } from 'react-redux';
import {postFavorite} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable'

const mapStateToProps =state => {
    return {
        dishes:state.dishes,
        comments:state.comments,
        favorites:state.favorites
        }
}

const mapDispatchToProps =dispatch=>({ 
    postFavorite:(dishId) =>dispatch(postFavorite(dishId))
});


function RenderDish(props) {
    const dish = props.dish;
    let handleViewRef = React.createRef();
    const recognizeDrag = (moveX,moveY,dx,dy)=>{
        if(dx < -200){
            return true;
        }
        else{
            return false;
        }
    };

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder :(e,gestureState) =>{
            return true
        },
        onPanResponderGrant: () => {
            handleViewRef.current
              .rubberBand(1000)
              .then(endState =>
                console.log(endState.finished ? 'finished' : 'cancelled'),
              );
          },
        onPanResponderEnd:(e,gestureState)=>{
            if(recognizeDrag(gestureState))
            Alert.alert('Add To Favourite?','Are You Sure You Wish To Add'+dish.name+'To Your Favorites?',
            [
                {
                    text:'Cancel',
                    onPress:() =>console.log('Cencel Pressed'),
                    style:'cancel'
                },
                {   
                    text:'Ok',
                    onPress:() =>props.favorite?console.log('already favorite'):props.onPress()
                }
            ],
            {cancelable:false}
            );
            if (recognizeComment(gestureState))
                props.onSelect();
                // props.onPressComment(); 
            return true
        }
    })

    const shareDish = (title,message,url)=>{
        Share.share({
            title:title,
            message:title + ':' + message+ ':' + url,
            url:url
        },{
            dialogTitle:'Share' + title
        })  
    }
        if (dish != null) {
            return(
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000} 
                    ref={handleViewRef}
                    {...panResponder.panHandlers}
                    >
                    <Card
                    featuredTitle={dish.name}
                    image={{uri:baseURl+dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View>
                        <Icon raised reverse name={props.favorite?'heart':'heart-o'} type='font-awesome' color='#f50' onPress={()=> props.favorite?console.log('already favorite'):props.onPress() } />
                        <Icon raised reverse name={'pencil'} type='font-awesome' color='#f512DA8' />
                        <Icon raised reverse name={'share'} type='font-awesome' color='#f512DA8' onPress={()=>shareDish(dish.name,dish.description,baseURl+dish.image)}/>
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props){
    const comments=props.comments;

    const renderCommentItem =({item,index}) =>{
        return (
            
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating} Stars</Text>
                <Text style={{fontSize:12}}>{'--'+ item.author + '--' + item.date}</Text>
            </View>
        )
    };

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title ="comments">
                <SafeAreaView style={{flex: 1}}>
                <FlatList data={comments}
                renderItem= {renderCommentItem}
                keyExtractor= {item => item.id.toString()} />
                </SafeAreaView>
            </Card>
        </Animatable.View>
        
    )
}

class Dishdetail extends Component {
    constructor(props){
        super(props);
        this.state ={
            rating:0,
            author:'',
            comment:'',
            showModal:false
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId)
    }

    toggleModal(){
        this.setState({
            showModal:!this.state.showModal
        })
    }
    handleComments(dishId){
        console.log(JSON.stringify(this.state))
        this.toggleModal()
        
    }

    static navigationOptions = {
        title: 'Dish Details',
        tabBarIcon: ({ tintColor }) => (
            <IconFontAwesome
              name="home"
              style={{ color: tintColor }}
              size={Platform.OS === "ios" ? 28 : 20}
            />
          )
    };

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                        favorite={this.props.favorites.some(el=>el===dishId)} 
                        onPress={()=>this.markFavorite(dishId)} 
                        onSelect={()=>this.toggleModal()} />
                    <RenderComments comments= {this.props.comments.comments.filter((comment)=>comment.dishId===dishId)}   />
                    <Modal animation={"slide"} transparent={false}
                            visible={this.state.showModal} 
                            onDismiss={()=>this.toggleModal()} 
                            onRequestClose={()=>this.toggleModal()}>
                        <View>
                            <Rating showRating
                                type="star"
                                fractions={0}
                                startingValue={0}
                                imageSize={40}
                                onFinishRating ={(rating) => this.setState({rating:rating})} />
                        </View>
                        <View>
                                <Input placeholder='Author' leftIcon={<Icon name='user-o' type='font-awesome' size={24}/>} 
                                    onChangeText ={(value) =>this.setState({author:value})}
                                />
                        </View>
                        <View>
                            <Input placeholder="Comment" leftIcon={
                                <Icon name='comment-o' type="font-awesome" size={24}></Icon>
                            }
                            onChangeText={(value)=>this.setState({comment:value})}
                            />
                        </View>
                        <View>
                            <Button color="#512DA8" title="Submit" onPress={()=>this.handleComments(dishId)} />
                        </View>
                        <View>
                            <Button onPress={()=> this.toggleModal()} color="#989898" title="Close" />
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:28
    },
    formLabel:{
        fontSize:18,
        flex:2
    },
    formItem:{
        flex:1
    },
    modal:{
        justifyContent:'center',
        margin:20
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DA8',
        textAlign:'center',
        color:'white',
        marginBottom:20
    },
    modalText:{
        fontSize:18,
        margin:10
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);