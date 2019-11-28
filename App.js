import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import JWPlayer from 'react-native-jw-media-player';

class App extends Component {
    videoPlayer;
    state = {
        currentTime: 0,
        duration: 0,
        isFullScreen: false,
        isLoading: true,
        paused: false,
        playerState: PLAYER_STATES.PLAYING,
        screenType: 'content',
    };

    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    onLoadStart = data => this.setState({ isLoading: true });

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };

    enterFullScreen = () => {};

    onFullScreen = () => {
        if (this.state.screenType == 'content')
            this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
        <View>
            <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });

    render() {

        const playlistItem = {
            title: 'Track',
            mediaId: -1,
            image: 'http://image.com/image.png',
            desc: 'My beautiful track',
            time: 0,
            file: 'http://file.com/file.mp3',
            autostart: true,
            controls: true,
            repeat: false,
            displayDescription: true,
            displayTitle: true
        };

        return (
            <View style={styles.container}>
                <JWPlayer
                    ref={p => (this.JWPlayer = p)}
                    style={styles.player}
                    playlistItem={playlistItem} // Recommended - pass the playlistItem as a prop into the player
                    // playlist={[playlistItem]}
                    onBeforePlay={() => this.onBeforePlay()}
                    onPlay={() => this.onPlay()}
                    onPause={() => this.onPause()}
                    onIdle={() => console.log("onIdle")}
                    onPlaylistItem={event => this.onPlaylistItem(event)}
                    onSetupPlayerError={event => this.onPlayerError(event)}
                    onPlayerError={event => this.onPlayerError(event)}
                    onBuffer={() => this.onBuffer()}
                    onTime={event => this.onTime(event)}
                    onFullScreen={() => this.onFullScreen()}
                    onFullScreenExit={() => this.onFullScreenExit()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
});
export default App;