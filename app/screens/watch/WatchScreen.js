import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import Icon from "react-native-vector-icons/Feather";
import { Modalize } from 'react-native-modalize';
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

import { VideoView } from '../../components/video-view';
import ChannelInfo from '../../components/channel-info/ChannelInfo';
import Program, { NotItem } from '../../components/program';
import StaticModal from "./examples/StaticModal";
import AbsoluteHeader, { renderHeader } from "./examples/AbsoluteHeader";
import { setPlayer } from '../../redux/actions';
import { getSelectChannel } from '../../redux/reducers';
import { Players } from '../../constants';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ContentLoader, { Bullets } from '@sarmad1995/react-native-content-loader';
import { EPG } from '../../services';

const isTrustImage = (image) => {
    return image !== '';
};

const EPGTabView = ({ label, epgOnDay }) => (
    <View tabLabel={label}>
        <Program items={epgOnDay} />
    </View>
);

const renderAllEPGDays = (epg) => {
    return epg.map(([day, v], i) => {
        return <EPGTabView key={i} label={day} epgOnDay={v} />;
    });
};

const WatchScreen = ({ selectPlayer, channel }) => {
    const [ webViewSize, setWebViewSize ] = useState(205);
    const [ modalContent, setModalContent ] = useState(null);
    const [ epgContent, setEpgContent ] = useState(null);
    const [ activeTab, setActiveTab ] = useState(2);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    });

    useEffect(() => {
        async function initEPG() {
            const epg = await EPG.getEPGList();
            setEpgContent(epg);
        }

        let mountedScreen = setTimeout(() => {
            setActiveTab(5);
            initEPG();
        }, 500);

        return  () => {
            clearTimeout(mountedScreen);
            setActiveTab(2);
        };
    }, [ channel ]);

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setWebViewSize('100%');
        } else {
            setWebViewSize(205);
        }
    };

    const modal = React.createRef();
    const absoluteModal = React.createRef();

    const openModal = () => {
        if (modal.current) {
            modal.current.open();
        }
    };

    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
            setModalContent(null);
        }
    };

    const openAbsoluteModal = () => {
        if (absoluteModal.current) {
            absoluteModal.current.open();
        }
    };

    const closeAbsoluteModal = () => {
        if (absoluteModal.current) {
            absoluteModal.current.close();
            setModalContent(null);
        }
    };

    let _menu = null;

    const showMenu = () => {
        _menu.show();
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const renderModalContent = () => (
        modalContent
    );

    const handleOpenStatic = () => {
        setModalContent(<StaticModal onCloseModal={closeModal}/>);
        hideMenu();
        openModal();
    };

    const handleOpenSimple = () => {
        setModalContent(<AbsoluteHeader />);
        hideMenu();
        openAbsoluteModal();
    };

    const handleSelectPlayer = (playerId) => {
        selectPlayer(channel.epg_id, playerId);
    };

    const ifImage = isTrustImage(channel.image) ? { uri: channel.image } : require('../../assets/images/blank_channel.png');

    const ifRenderContent = () => {
        const defaultEpg = [
            {title: 'Позавчера', data: <NotItem />},
            {title: 'Вчера', data: <NotItem />},
            {title: 'Сегодня', data:
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                        <View style={{ padding: 5 }}>
                            <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                        </View>
                    </View>
            },
            {title: 'Завтра', data: <NotItem />},
            {title: 'Послезавтра', data: <NotItem />},
        ];

        if (!epgContent) {
            return defaultEpg.map((epg, i) => {
                return <View key={i} tabLabel={epg.title}>
                    { epg.data }
                </View>
            });
        }

        return epgContent.map((epg, i) => {
            return <View key={i} tabLabel={epg.title}>
                <Program items={epg.data} />
            </View>
        });
    };

    return (
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
            <View style={{ height: webViewSize }}>
                <VideoView />
            </View>
            <ChannelInfo
                onLongPress={() => {

                }}
                onPress={ handleOpenSimple }
                name={ channel.name }
                src={ ifImage }
                menu={
                    <Menu
                        ref={(ref) => _menu = ref }
                        button={
                            <Icon name='sliders' size={ 25 } color={ '#000' } onPress={ showMenu } />
                        }>

                        <MenuItem onPress={() => {
                            handleSelectPlayer('1');
                        }}>
                            Use Player 1
                        </MenuItem>

                        <MenuItem onPress={() => {
                            handleSelectPlayer('2');
                        }}>
                            Use Player 2
                        </MenuItem>

                        <MenuItem onPress={() => {
                            handleSelectPlayer(Players.ORIGIN_PLAYER);
                        }}>
                            Use Native Player
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={ hideMenu }>Save to watch latter</MenuItem>
                        <MenuItem onPress={ hideMenu }>Save to Playlist</MenuItem>
                        <MenuItem onPress={ handleOpenStatic }>Share</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={ hideMenu }>Report</MenuItem>
                        <MenuItem onPress={ hideMenu }>Block this Playlist</MenuItem>
                    </Menu>
                }
            />
            <ScrollableTabView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: 50,
                }}
                tabBarTextStyle={{
                    color: '#000'
                }}
                tabBarUnderlineStyle={{
                    backgroundColor: '#000',
                    height: 2,
                }}
                initialPage={activeTab}
                renderTabBar={() => <ScrollableTabBar />}
            >
                { ifRenderContent() }
            </ScrollableTabView>

            <Modalize ref={modal}
                      adjustToContentHeight={{
                          showsVerticalScrollIndicator: false
                      }}
                      HeaderComponent={
                          renderHeader(closeModal)
                      }
            >
                {renderModalContent()}
            </Modalize>

            <Modalize
                ref={absoluteModal}
                snapPoint={450}
                HeaderComponent={
                    renderHeader(closeAbsoluteModal)
                }
            >
                {renderModalContent()}
            </Modalize>
        </View>
    );
};

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchScreen);
