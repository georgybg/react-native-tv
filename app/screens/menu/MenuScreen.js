import React, { useEffect } from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect, useSelector } from 'react-redux';

import {MenuItemLine, Divider, NavigationHeaderRight} from '../../components';
import { UserHelper } from '../../utils';
import MenuUserInfo from './MenuUserInfo';
import { getAppTheme } from '../../redux/reducers';
import HomeScreen from '../home/HomeScreen';

const MenuScreen = ({ navigation, user, isAuthenticated }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor, logo: theme.logo });
    }, [ theme ]);

    const handleSettingsPress = () => {
        navigation.navigate('UserMenuScreen');
    };

    const handleSearchPress = () => {
        alert('Press Search')
    };

    const onMenuPress = (to) => {
        navigation.navigate(to);
    };

    return (
        <View style={styles.container}>
            {
                isAuthenticated && <MenuUserInfo
                    username={user.username}
                    displayName={UserHelper.buildUserId(user)}
                    avatarUrlMedium={UserHelper.makeUserAvatar(user)}
                    onSettingsPress={handleSettingsPress}
                    onSearchPress={handleSearchPress}
                />
            }
            <ScrollView>
                <MenuItemLine onPress={onMenuPress} to={''} icon={'user-check'} name={'Friends'} onLongPress={() => alert('Looong!')} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'message-square'} name={'Messages'} unreadItems={20} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'users'} name={'Communities'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'star'} name={'Bookmarks'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'heart'} name={'Liked'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'shopping-bag'} name={'Purchases'} />
                <Divider />
                <MenuItemLine onPress={onMenuPress} to={'CopyrightScreen'} icon={'alert-circle'} name={'Copyright holders'} />
                <MenuItemLine onPress={onMenuPress} to={'TermsScreen'} icon={'book'} name={'Terms of Use'} />
                <MenuItemLine onPress={onMenuPress} to={'PrivacyScreen'} icon={'book-open'} name={'Privacy policy'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'at-sign'} name={'Contacts'} />
                <Divider />
                <MenuItemLine onPress={onMenuPress} to={'AboutScreen'} icon={'info'} name={'About the Project'} />
                <MenuItemLine onPress={onMenuPress} to={'FaqScreen'} icon={'help-circle'} name={'FAQ'} />
                <MenuItemLine onPress={onMenuPress} to={''} icon={'help-circle'} name={'Help'} />
                <MenuItemLine onPress={onMenuPress} to={'SystemScreen'} icon={'layers'} name={'System & App State'} />
            </ScrollView>
        </View>
    );
};

MenuScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerLeft: <Image
            source = {navigation.getParam('logo')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <NavigationHeaderRight />
        )
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.authentication.token,
    user: state.authentication.user
});

export default connect(mapStateToProps)(withNavigation(MenuScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});