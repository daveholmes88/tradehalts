"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <h1>Hello World</h1>
        {data.map(d => <li>{d.symbol}</li>)}
    </div>
  );
}
