import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Select from 'material-ui/Select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

export default props =>
  <Paper className={props.classes.paper + ' ' + props.classes.root}>
    <Typography variant="headline" component="h3">
      Create new segment
    </Typography>
    <Select
      native
      value={props.selectedType}
      onChange={(event) => props.onTypeChanged(event.target.value)}
      inputProps={{
        id: 'types'
      }}
    >
      {
        props.types.map(type => 
          <option key={type} value={type}>{type}</option>
        )
      }
    </Select>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{
        width: 640, 
        height: 20
      }}>
        <Slider
          min={0}
          max={640}
          value={props.startX}
          onChange={props.onStartXChanged}
        />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{
        width: 640, 
        height: 20
      }}>
        <Slider
          min={0}
          max={640}
          value={props.endX}
          onChange={props.onEndXChanged}
        />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Table style={{ width: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          <TableCell>
            {props.type}
          </TableCell>
          {
            props.start
              ? <TableCell>
                  {props.start}
                  <Clear onClick={props.onDeleteStart} />
                </TableCell>
              : <TableCell>
                  <Tooltip title="Save start time of the segment">
                    <Save onClick={props.onPickStart} />
                  </Tooltip>
                </TableCell>
          }
          {
            props.end
              ? <TableCell>
                  {props.end}
                  <Clear onClick={props.onDeleteEnd} />
                </TableCell>
              : <TableCell>
                  <Tooltip title="Save end time the segment">
                    <Save onClick={props.onPickEnd} />
                  </Tooltip>
                </TableCell>
          }
        </TableRow>
      </TableBody>
    </Table>
  </div>
    { props.start && props.end
      ? <Tooltip title="Save this segment in browser local storage">
          <Save onClick={props.onSave} />
        </Tooltip>
      : null
    }
  </Paper>;