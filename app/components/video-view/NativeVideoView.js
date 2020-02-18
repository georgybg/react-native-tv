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
        restartTiming(paused);

        fullscreen
            ? Orientation.lockToPortrait()
            : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = () => {
        const isSelected = fullscreen

        return (
            <TouchableOpacity onPress={() => handleFullscreen(isSelected) }>
                <Text style={styles.controlOptionRight}>
                    {!fullscreen
                        ?<Icon name='ios-expand' size={!fullscreen ? 20 : 30}/>
                        :<Icon name='ios-contract' size={!fullscreen ? 20 : 30}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const renderVolumeControl = (v) => {
        const isSelected = (volume === v)

        return (
            <TouchableOpacity onPress={() => { setVoulem(v) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {v * 100}%
                </Text>
            </TouchableOpacity>
        )
    };

    const togglePlay = () => {
        setPaused(!paused)
        restartTiming(!paused)
    }

    const renderPlayerAction = () => {
        return (
            <TouchableOpacity onPress={() => togglePlay()}>
                <Text style={styles.controlOptionLeft}>
                    {!paused
                        ?<Icon name='ios-pause' size={!fullscreen ? 20 : 30}/>
                        :<Icon name='ios-play' size={!fullscreen ? 20 : 30}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const handleshowControlPanel = () => {
        setShowControlPanel(true)
        restartTiming(paused)
    };

    const restartTiming = (paused = null) => {
        console.log(paused)
        clearTimeout(timing)
        if (paused) {
            setTiming(null)

            return
        }

        const pointer = setTimeout(() => {setShowControlPanel(false); setTiming(null)}, 3000)
        setTiming(pointer)
    }

    return (
        <View style={fullscreen && styles.fullscreenVideoContainer}>
            <TouchableOpacity
                activeOpacity={1}
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
                    {renderPlayerAction()}
                </View>
                <View style={styles.bottomPanel}>
                    <View style={styles.leftSide}>
                        {renderPlayerAction()}
                    </View>
                    <View style={styles.rightSide}>
                        {renderFullscreenControl()}
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
