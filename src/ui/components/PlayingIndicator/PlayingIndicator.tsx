import React from 'react';
import Icon from 'react-fontawesome';
import { connect } from 'react-redux';

import * as PlayerActions from '../../actions/PlayerActions';
import { PlayerStatus } from '../../../shared/types/museeks';
import { RootState } from '../../reducers';

import styles from './PlayingIndicator.module.css';

interface Props {
  state: PlayerStatus;
}

interface State {
  hovered: boolean;
}

class TrackPlayingIndicator extends React.Component<Props, State> {
  static getIcon = (state: PlayerStatus, hovered: boolean) => {
    if (state === PlayerStatus.PLAY) {
      if (hovered) {
        return <Icon name='pause' fixedWidth />;
      }

      return (
        <div className={styles.animation}>
          <div className={`${styles.bar}`} />
          <div className={`${styles.bar} ${styles.barSecond}`} />
          <div className={`${styles.bar} ${styles.barThird}`} />
        </div>
      );
    }

    return <Icon name='play' fixedWidth />;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      hovered: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hovered: true });
  }

  onMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const icon = TrackPlayingIndicator.getIcon(this.props.state, this.state.hovered);

    return (
      <button
        className={`${styles.playingIndicator} reset`}
        onClick={PlayerActions.playPause}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        tabIndex={0}
      >
        {icon}
      </button>
    );
  }
}

const mapStateToProps = (state: RootState): Props => ({ state: state.player.playerStatus });

export default connect(mapStateToProps)(TrackPlayingIndicator);
