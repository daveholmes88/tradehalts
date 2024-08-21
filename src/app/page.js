"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Home() {
  const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/tradehalts')
            .then(response => response.json())
            .then(res => {
              console.log(res)
              setData(res)
            })
            .catch(error => {
                console.error('Error fetching trade halt data:', error);
            });
    }, []);

  return (
    <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Reason Code</TableCell>
            <TableCell>Halt Time</TableCell>
            <TableCell>Resume Time</TableCell>
            <TableCell>Publication Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={data.symbol}>
              <TableCell component="th" scope="row">
                {d.symbol}
              </TableCell>
              <TableCell>{d.reason_code}</TableCell>
              <TableCell>{d.halt_time}</TableCell>
              <TableCell>{d.resume_time}</TableCell>
              <TableCell>{d.pub_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
