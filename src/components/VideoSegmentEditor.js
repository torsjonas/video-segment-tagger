import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import VideoPlayer from './VideoPlayer';
import SegmentTable from './SegmentTable';
import EditSegment from './EditSegment';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 10,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    width: 500
  }
});

const StyledSegmentTable = withStyles(styles)(SegmentTable);
const StyledEditSegment = withStyles(styles)(EditSegment);

class VideoSegmentEditor extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.videoPlayer = React.createRef();
    this.state = {
      type: this.getLocalStorageType(),
      segments: this.getLocalStorageSegments(),
      start: null,
      end: null,
      currentTime: null
    };
  }

  getLocalStorageType = () => {
    const storedType = localStorage.getItem('type');
    return storedType ? storedType : 'livecatch';
  }

  getLocalStorageSegments = () => {
    const storedSegments = localStorage.getItem('segments');
    return storedSegments ? JSON.parse(storedSegments) : [];
  }

  onSave = () => {
    if (!this.state.start || !this.state.end) {
      console.log('Warning! Start and end required to save');
      return;
    }

    const segments = this.getLocalStorageSegments();
    const newSegments = [
      {
        type: this.state.type,
        start: this.state.start,
        end: this.state.end,
        created: new Date().toISOString()
      },
      ...segments
    ];

    localStorage.setItem('segments', JSON.stringify(newSegments));

    this.setState({
      segments: newSegments,
      start: null,
      end: null,
      playingSegment: null
    });
  }

  onTimeUpdated = (currentTime) => {
    this.setState({
      currentTime
    });
  }

  onPickStart = () => {
    this.setState((prevState, props) => ({
      start: prevState.currentTime
    }));
  }

  onDeleteStart = () => {
    this.setState({
      start: null
    });
  }

  onPickEnd = () => {
    this.setState((prevState, props) => ({
      end: prevState.currentTime
    }));
  }

  onDeleteEnd = () => {
    this.setState({
      end: null
    });
  }

  onDeleteSegment = (s) => {
    const segments = this.getLocalStorageSegments()
      .filter(seg => {
        return !(s.start === seg.start && s.end === seg.end);
      });
    localStorage.setItem('segments', JSON.stringify(segments));

    this.setState({
      segments
    });
  }

  onPlaySegment = (segment) => {
    this.videoPlayer.current.seekTo(segment.start);
    this.videoPlayer.current.play();
  }

  render() {
    return (
      <Grid container>
        <Grid item sm={12}>
          <VideoPlayer
            ref={this.videoPlayer}
            onTimeUpdated={this.onTimeUpdated}
          />
        </Grid>
        <Grid item sm={12}>
          <StyledEditSegment
            onSave={this.onSave}
            onPickStart={this.onPickStart}
            onDeleteStart={this.onDeleteStart}
            onPickEnd={this.onPickEnd}
            onDeleteEnd={this.onDeleteEnd}
            type={this.state.type}
            start={this.state.start}
            end={this.state.end}
          />
        </Grid>
        <Grid item sm={12}>
          <StyledSegmentTable
            segments={this.state.segments}
            onDelete={this.onDeleteSegment}
            onPlay={this.onPlaySegment}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoSegmentEditor);