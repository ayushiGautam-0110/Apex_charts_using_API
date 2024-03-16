import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const GraphComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get(' https://checkinn.co/api/v1/int/requests')
      .then(response => {
        setData(response.data.requests);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const aggregateData = () => {
    const aggregatedData = {};
    data.forEach(request => {
      const hotelName = request.hotel.name;
      if (!aggregatedData[hotelName]) {
        aggregatedData[hotelName] = 1;
      } else {
        aggregatedData[hotelName]++;
      }
    });
    return aggregatedData;
  };

  
  const chartData = {
    options: {
      chart: {
        id: 'hotel-requests-chart',
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: Object.keys(aggregateData())
      }
    },
    series: [{
      name: 'Number of Requests',
      data: Object.values(aggregateData())
    }]
  };




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2 style={{ textAlign: 'center' }}>Number of Requests Per Hotel</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
          width={700}
        />
      </div>
    </div>
  );
};

export default GraphComponent;
