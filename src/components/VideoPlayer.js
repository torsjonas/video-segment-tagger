import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import ReactPlayer from 'react-player'
import Paper from 'material-ui/Paper';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true
    };
  }

  ref = player => {
    this.player = player
  }

  rewind = () => {
    const currentTime = this.player.getCurrentTime();
    const next = currentTime - 1;
    if (next > 1) {
      this.player.seekTo(next);
    }
  }

  forward = () => {
    const duration = this.player.getDuration();
    const currentTime = this.player.getCurrentTime();
    const next = currentTime + 1;
    if (next > duration) {
      this.player.seekTo(0);
    } else if (next < duration) {
      this.player.seekTo(next);
    }
  }

  pause = () => {
    this.setState({
      playing: false
    });
  }

  play = () => {
    this.setState({
      playing: true
    });
  }

  onTimeUpdated = () => {
    const currentTime = this.player.getCurrentTime();
    this.props.onTimeUpdated(currentTime);
  }

  onPlayingSegmentStopped = () => {
    this.props.onPlayingSegmentStopped();
  }

  seekTo = (start) => {
    this.player.seekTo(start);
  }

  render() {
    return (
      <Paper style={{
        margin: 10,
        textAlign: 'center'
      }}>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <ReactPlayer
                controls
                ref={this.ref}
                playing={this.state.playing}
                onPause={this.onTimeUpdated}
                onSeek={this.onTimeUpdated}
                url="videos/l0BCThPijKw.mp4"
              />
            </div>
          </Grid>
          <Grid item sm={12}>
            <Button onClick={this.rewind}>
              <KeyboardArrowLeft  />
            </Button>
            <Button onClick={this.pause}>
              <Pause />
            </Button>
            <Button onClick={this.play}>
              <PlayArrow />
            </Button>
            <Button onClick={this.forward}>
              <KeyboardArrowRight />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default VideoPlayer;