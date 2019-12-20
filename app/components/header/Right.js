import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const Right = ({ isAuthenticated, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
           {/* <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Icon name='search' size={25} color={'#000'} />
            </TouchableOpacity>*/}
            <TouchableOpacity style={{paddingHorizontal: 15}}>
                <Icon name='user' size={25} color={'#000'}
                      onPress={() => {
                          let route = 'Login';

                          if (isAuthenticated) {
                              route = 'Profile';
                          }

                          navigation.navigate(route)
                      }}
                />
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(withNavigation(Right));
