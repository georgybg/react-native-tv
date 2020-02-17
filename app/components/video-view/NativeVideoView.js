import React, { useEffect,  useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Icon from "react-native-vector-icons/Ionicons";

const NativeVideoView = ({ onFullscreen, ...props }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVoulem ] = useState(1);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);
    const [ showControlPanel, setShowControlPanel ] = useState(false);
    const [timing, setTiming] = useState(null);

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);

        return () => {
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    const handleOrientation = (orientation) => {
        orientation === 'LANDSCAPE'
            ? setFullscreen(true)
            : setFullscreen(false)
    };

    let video;

    const onLoad = (data) => {};
    const onProgress = (data) => {};

    const onEnd = () => {
        setPaused(true);
        video.seek(0)
    };

    const onAudioBecomingNoisy = () => {
        setPaused(true);
    };

    const onAudioFocusChanged = (event) => {
        setPaused(!event.hasAudioFocus);
    };

    const getCurrentTimePercentage = () => {};

    const renderRateControl = (r) => {
        const isSelected = (rate === r);

        return (
            <TouchableOpacity onPress={() => { setRate(r) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {r}x
                </Text>
            </TouchableOpacity>
        );
    };

    const renderResizeModeControl = (rzm) => {
        const isSelected = (resizeMode === rzm);

        return (
            <TouchableOpacity onPress={() => { setResizeMode(rzm) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rzm}
                </Text>
            </TouchableOpacity>
        )
    };

    const handleFullscreen = (isSelected) => {
        setFullscreen(!isSelected);
        onFullscreen(isSelected);
        restartTiming(timing);

        fullscreen
            ? Orientation.lockToPortrait()
            : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = (size = 20) => {
        const isSelected = fullscreen;

        return (
            <TouchableOpacity onPress={() => handleFullscreen(isSelected) }>
                <Text style={styles.controlOptionRight}>
                    {!fullscreen
                        ?<Icon name='ios-expand' size={size}/>
                        :<Icon name='ios-contract' size={size}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const renderVolumeControl = (v) => {
        const isSelected = (volume === v);

        return (
            <TouchableOpacity onPress={() => { setVoulem(v) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {v * 100}%
                </Text>
            </TouchableOpacity>
        )
    };

    const renderPlayerAction = (size = 20) => {
        return (
            <TouchableOpacity onPress={() => {setPaused(!paused); restartTiming(timing)}}>
                <Text style={styles.controlOptionLeft}>
                    {!paused
                        ?<Icon name='ios-pause' size={size}/>
                        :<Icon name='ios-play' size={size}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const handleshowControlPanel = () => {
        setShowControlPanel(true)
        const timing = setTimeout(() => {setShowControlPanel(false); setTiming(null)}, 5000);
        setTiming(timing)
    };

    const restartTiming = (timing = null) => {
        clearTimeout(timing)
        const newTiming = setTimeout(() => {setShowControlPanel(false); setTiming(null)}, 5000);
        setTiming(newTiming)
    }

    return (
        <View style={fullscreen && styles.fullscreenVideoContainer}>
            <TouchableOpacity
                onPress={() => handleshowControlPanel()}
            >
                <Video
                    ref={(ref) => { video = ref }}
                    source={{ uri: props.source }}
                    style={fullscreen ? styles.fullscreenVideo : styles.video}
                    rate={rate}
                    paused={paused}
                    volume={volume}
                    muted={muted}
                    resizeMode={resizeMode}
                    onLoad={onLoad}
                    onAudioBecomingNoisy={onAudioBecomingNoisy}
                    onAudioFocusChanged={onAudioFocusChanged}
                    repeat={false}
                />
            </TouchableOpacity>

            {showControlPanel &&
            <View style={styles.controlPanel}>
                <View style={styles.mainPanel}>
                    {!fullscreen ? renderPlayerAction(35) : renderPlayerAction(60)}
                </View>
                <View style={styles.bottomPanel}>
                    <View style={styles.leftSide}>
                        {!fullscreen ? renderPlayerAction() : renderPlayerAction(30)}
                    </View>
                    <View style={styles.rightSide}>
                        {!fullscreen ? renderFullscreenControl() : renderFullscreenControl(30)}
                    </View>
                </View>
            </View>
            }
        </View>
    );
};

export default NativeVideoView;

const styles = StyleSheet.create({
    fullscreenVideoContainer: {
        backgroundColor: 'black'
    },
    video: {
        width: '100%',
        height: '100%'
    },
    fullscreenVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height
    },
    controlPanel: {
        position: 'absolute',
        flexDirection: 'column',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'rgba( 0, 0, 0, 0.3);'
    },
    mainPanel: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomPanel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba( 0, 0, 0, 0.5);'
    },
    leftSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rightSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    controlOptionRight: {
        color: '#fff',
        paddingRight: 10,
    },
    controlOptionLeft: {
        color: '#fff',
        paddingLeft: 10,
    }
});
