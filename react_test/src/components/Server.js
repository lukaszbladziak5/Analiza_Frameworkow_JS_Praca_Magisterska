import React, { useState } from 'react';
import axios from 'axios';
import buildData from '../dummyData';
import '../Server.css';
import logo from '../logo.png';
import Row from './Row';

const Server = () => {
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [data, setData] = useState([]);
  const databaseLink = 'https://analiza-frameworkow-js-default-rtdb.firebaseio.com/data';

  const onUpdateOneThousandRows = async (num) => {
    setNumberOfRows(num);
    try {
      const response = await axios.get(`${databaseLink}/api/oneThousandRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        for (const key of keys) {
          const newData = buildData(num);
          const startTime = performance.now();
          await axios.put(`${databaseLink}/api/oneThousandRowsCollections/${key}.json`, newData);
          const endTime = performance.now();
          console.log(`PUT 1 000 rows time: ${endTime - startTime} ms`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateTenThousandsRows = async (num) => {
    setNumberOfRows(num);
    try {
      const response = await axios.get(`${databaseLink}/api/tenThousandsRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        for (const key of keys) {
          const newData = buildData(num);
          const startTime = performance.now();
          await axios.put(`${databaseLink}/api/tenThousandsRowsCollections/${key}.json`, newData);
          const endTime = performance.now();
          console.log(`PUT 10 000 rows time: ${endTime - startTime} ms`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateOneThousandRows = async (num) => {
    setNumberOfRows(num);
    const newData = buildData(num);
    const startTime = performance.now();

    try {
      const response = await axios.post(`${databaseLink}/api/oneThousandRowsCollections.json`, newData);
      const endTime = performance.now();
      console.log(`POST 1 000 rows time: ${endTime - startTime} ms`);
      console.log('Data added to Firebase', response);
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateTenThousandsRows = async (num) => {
    setNumberOfRows(num);
    const newData = buildData(num);
    const startTime = performance.now();

    try {
      const response = await axios.post(`${databaseLink}/api/tenThousandsRowsCollections.json`, newData);
      const endTime = performance.now();
      console.log(`POST 10 000 rows time: ${endTime - startTime} ms`);
      console.log('Data added to Firebase', response);
    } catch (error) {
      console.error(error);
    }
  };

  const onGetOneThousandRows = async () => {
    setData([]); // Resetuj dane przed pobraniem nowych
    try {
      const response = await axios.get(`${databaseLink}/api/oneThousandRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async (key) => {
          try {
            const startTime = performance.now();
            const dataResponse = await axios.get(`${databaseLink}/api/oneThousandRowsCollections/${key}.json`);
            if (dataResponse.data && typeof dataResponse.data === 'object') {
              const dataArray = Object.values(dataResponse.data);
              const newData = dataArray.map((item, index) => ({
                id: item.id !== undefined ? item.id : `${key}-${index}`,
                label: item.label !== undefined ? item.label : `Label ${index}`
              }));
              setData(prevData => [...prevData, ...newData]);
            }
            const endTime = performance.now();
            console.log(`GET 1 000 rows time: ${endTime - startTime} ms`);
          } catch (error) {
            console.error('Error fetching data for key:', key, error);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching keys:', error);
    }
  };

  const onGetTenThousandsRows = async () => {
    setData([]); // Resetuj dane przed pobraniem nowych
    try {
      const response = await axios.get(`${databaseLink}/api/tenThousandsRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async (key) => {
          try {
            const startTime = performance.now();
            const dataResponse = await axios.get(`${databaseLink}/api/tenThousandsRowsCollections/${key}.json`);
            if (dataResponse.data && typeof dataResponse.data === 'object') {
              const dataArray = Object.values(dataResponse.data);
              const newData = dataArray.map((item, index) => ({
                id: item.id !== undefined ? item.id : `${key}-${index}`,
                label: item.label !== undefined ? item.label : `Label ${index}`
              }));
              setData(prevData => [...prevData, ...newData]);
            }
            const endTime = performance.now();
            console.log(`GET 10 000 rows time: ${endTime - startTime} ms`);
          } catch (error) {
            console.error('Error fetching data for key:', key, error);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching keys:', error);
    }
  };

  const onRemove = () => {
    setNumberOfRows(0);
    setData([]);
  };

  const clearDatabase = async () => {
    const startTime = performance.now();

    try {
      const response = await axios.delete(`${databaseLink}.json`);
      const endTime = performance.now();
      console.log(`DELETE all rows in database time: ${endTime - startTime} ms`);
      console.log('Database cleared', response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="server-container">
      <img src={logo} alt={'logo'} />
      <div className="framework">
        <h1>React Server Test</h1>
      </div>

      <div className="buttons-container">
        <button id="create-1000" className="Btn" onClick={() => onCreateOneThousandRows(1000)}>Create 1 000 rows</button>
        <button id="create-10000" className="Btn" onClick={() => onCreateTenThousandsRows(10000)}>Create 10 000 rows</button>
        <button id="get-1000" className="Btn" onClick={onGetOneThousandRows}>Read 1 000 rows collections</button>
        <button id="get-10000" className="Btn" onClick={onGetTenThousandsRows}>Read 10 000 rows collections</button>
        <button id="update-1000" className="Btn" onClick={() => onUpdateOneThousandRows(1000)}>Update 1 000 rows collections</button>
        <button id="update-10000" className="Btn" onClick={() => onUpdateTenThousandsRows(10000)}>Update 10 000 rows collections</button>
        <button id="remove" className="Btn" onClick={onRemove}>Clear page</button>
        <button id="clear-db" className="Btn" onClick={clearDatabase}>Delete data from database</button>
      </div>
      <div className='div-table'>
      <table className="data-table">
        <tbody>
          {data.map((item, i) => (
            <Row key={i} item={item}></Row>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Server;