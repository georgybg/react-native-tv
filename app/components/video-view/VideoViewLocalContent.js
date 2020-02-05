import React from 'react';
import { connect } from 'react-redux';
import PureVideoWebView from './PureVideoWebView';
import { getActiveLocalContent } from '../../redux/reducers';
import { Players } from '../../constants';

const resolveSelectedPlayer = (url, player, content) => {
    if (player === Players.ORIGIN_PLAYER) {
        return content.url;
    }

    return `http://tv.zikwall.ru/vktv/embed/by-url?url=${url}&player=2`;
};

const VideoViewLocalContent = ({ localContent, player, onFullscreen }) => {
    if (!localContent) {
        return null;
    }

    const source = resolveSelectedPlayer(localContent.url, player, localContent);

    return (
        <PureVideoWebView source={source} />
    );
};

const mapStateToProps = state => ({
    localContent: getActiveLocalContent(state),
});

export default connect(mapStateToProps)(VideoViewLocalContent);
