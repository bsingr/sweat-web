import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import GoogleMapReact from 'google-map-react';

const Marker = (props) => {
  return (
    <div style={{backgroundColor: 'red'}}>
      Hello
    </div>
  );
}

class GeoTracker extends Component {
  constructor(props) {
    super(props);

    // this.db = new PouchDB('sweat');

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    let googleMap;
    if (this.state.latitude && this.state.longitude) {
      googleMap = <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"}}
        defaultCenter={{
          lat: this.state.latitude,
          lng: this.state.longitude
        }}
        defaultZoom={16}
      >
        <Marker lat={this.state.latitude} lng={this.state.longitude} />
      </GoogleMapReact>
    }
    return (
      <div>
        {this.state.error ? <span>Error: {this.state.error}</span> : null}
        <div style={{ height: '400px', width: '100%' }}>
          {googleMap}
        </div>
      </div>
    );
  }
}

export default GeoTracker;
