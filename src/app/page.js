"use client"
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { css } from '@emotion/react'

export default function Home() {
  const [data, setData] = useState([]);

    useEffect(() => {
      grabData()
      const interval = setInterval(() => {
        grabData()
      },60000);
      return () => clearInterval(interval);
    }, []);

    const grabData = () => {
      fetch('http://localhost:3000/api/tradehalts')
            .then(response => response.json())
            .then(res => {
              console.log(res)
              setData(res)
            })
            .catch(error => {
                console.error('Error fetching trade halt data:', error);
            });
    }

  return (
    <Container maxWidth="xl">
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
          {data.map((d) => {
            const color = d.resume_time === '' ? 'red' : 'white'
            return (
            <TableRow key={data.symbol} css={css`
              background-color: ${color}`}>
              <TableCell component="th" scope="row">
                {d.symbol}
              </TableCell>
              <TableCell>{d.reason_code}</TableCell>
              <TableCell>{d.halt_time}</TableCell>
              <TableCell>{d.resume_time}</TableCell>
              <TableCell>{d.pub_date}</TableCell>
            </TableRow>
            )})}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
