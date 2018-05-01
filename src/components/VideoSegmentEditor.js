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

const types = require('../types');
const urls = require('../urls');
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
      url: this.getLocalStorageUrl(),
      start: null,
      end: null,
      currentTime: null,
      startX: this.getLocalStorageStartX(),
      endX: this.getLocalStorageEndX()
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

  getLocalStorageUrl = () => {
    const storedUrl = localStorage.getItem('url');
    return storedUrl ? storedUrl : "Select a Video URL";
  }

  getLocalStorageStartX = () => {
    const storedStartX = localStorage.getItem('startX');
    return storedStartX ? storedStartX : 428;
  }

  getLocalStorageEndX = () => {
    const storedEndX = localStorage.getItem('endX');
    return storedEndX ? storedEndX : 640;
  }

  onSave = () => {
    if (!this.state.start || !this.state.end) {
      console.log('Warning! Start and end required to save');
      return;
    }

    const segments = this.getLocalStorageSegments();
    const newSegments = [
      {
        url: this.state.url,
        type: this.state.type,
        start: this.state.start,
        end: this.state.end,
        startX: this.state.startX,
        endX: this.state.endX,
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

  onUrlSelected = (url) => {
    localStorage.setItem('url', url);

    this.setState({
      url
    });
  }

  onTypeChanged = (type) => {
    localStorage.setItem('type', type);

    this.setState({
      type
    });
  }

  onStartXChanged = (startX) => {
    localStorage.setItem('startX', startX);

    this.setState({
      startX
    });
  }

  onEndXChanged = (endX) => {
    localStorage.setItem('endX', endX);

    this.setState({
      endX
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item sm={12}>
          <VideoPlayer
            ref={this.videoPlayer}
            onTimeUpdated={this.onTimeUpdated}
            urls={urls}
            selectedUrl={this.state.url}
            onUrlSelected={this.onUrlSelected}
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
            types={types}
            onTypeChanged={this.onTypeChanged}
            selectedType={this.state.type}
            startX={this.state.startX}
            endX={this.state.endX}
            onStartXChanged={this.onStartXChanged}
            onEndXChanged={this.onEndXChanged}
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