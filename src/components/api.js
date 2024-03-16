import React, { Component } from "react";
import Chart from "react-apexcharts";

class RequestsPerHotelChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotelData: {}
    };
  }

  componentDidMount() {
    fetch('https://checkinn.co/api/v1/int/requests')
      .then(response => response.json())
      .then(data => {
        // Process the data and calculate requests per hotel
        const requestsPerHotel = this.calculateRequestsPerHotel(data);
        // Update state with the calculated data
        this.setState({ hotelData: requestsPerHotel });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to calculate requests per hotel
  calculateRequestsPerHotel = (requests) => {
    const requestsPerHotel = {};

    // Iterate through each request
    requests.forEach(request => {
      const hotelName = request.hotel.name;

      // Increment the count for the hotel or initialize it to 1 if it's the first request for the hotel
      requestsPerHotel[hotelName] = (requestsPerHotel[hotelName] || 0) + 1;
    });

    return requestsPerHotel;
  };

  render() {
    const { hotelData } = this.state;

    // Extract hotel names and request counts for plotting
    const categories = Object.keys(hotelData);
    const data = Object.values(hotelData);

    // Chart options
    const options = {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Hotels'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Requests'
        }
      }
    };

    // Chart series
    const series = [{
      name: 'Requests',
      data: data
    }];

    return (
      <Chart options={options} series={series} type="bar" width={500} height={320} />
    );
  }
}

export default RequestsPerHotelChart;
