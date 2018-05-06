import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import DeleteForever from '@material-ui/icons/DeleteForever';
import {CSVLink} from 'react-csv';
import Tooltip from 'material-ui/Tooltip';

export default props => {
  const csvSegments = props.segments.map(s => [
    s.url, 
    s.type, 
    s.start, 
    s.end, 
    s.startX, 
    s.endX, 
    s.created
  ]);

  const csvData = [
    ['url', 'type', 'start', 'end', 'startX', 'endX', 'created'],
    ...csvSegments
  ];

  return (
    <Paper className={props.classes.paper}>
      <Typography variant="headline" component="h3">
        Video segments
      </Typography>
      <CSVLink data={csvData}
        filename={"segments.csv"}
        target="_blank"
      >
        Download Segments as CSV
      </CSVLink>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <Table style={{ width: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Playfield StartX</TableCell>
            <TableCell>Playfield EndX</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.segments.map(segment => {
            return (
              <TableRow key={segment.start} onClick={() => props.onPlay(segment)}>
                <TableCell>
                  <Tooltip title="Permanently delete from local storage">
                    <DeleteForever onClick={() => props.onDelete(segment)} />
                  </Tooltip>
                </TableCell>
                <TableCell>{segment.url}</TableCell>
                <TableCell>{segment.type}</TableCell>
                <TableCell>{segment.start}</TableCell>
                <TableCell>{segment.end}</TableCell>
                <TableCell>{segment.startX}</TableCell>
                <TableCell>{segment.endX}</TableCell>
                <TableCell>{segment.created}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
    </Paper>
  );
}