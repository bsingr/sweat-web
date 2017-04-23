import React, { Component } from 'react';
import PouchDB from 'pouchdb';

class GeoTracker extends Component {
  constructor(props) {
    super(props);
    this.db = new PouchDB('sweat');
    this.state = {
      count: 0,
      error: null
    };
    this.reloadCount();
  }

  reloadCount() {
    this.db.info().then((result) => {
      this.setState({count: result.doc_count})
    }).catch((err) => {
      this.setState({error: err.message});
    });
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const doc = {};
        doc._id = `${position.timestamp}`;
        if (position.coords.accuracy) doc.accuracy = position.coords.accuracy;
        if (position.coords.altitude) doc.altitude = position.coords.altitude;
        if (position.coords.altitudeAccuracy) doc.altitudeAccuracy = position.coords.altitudeAccuracy;
        if (position.coords.heading) doc.heading = position.coords.heading;
        if (position.coords.latitude) doc.latitude = position.coords.latitude;
        if (position.coords.longitude) doc.longitude = position.coords.longitude;
        if (position.coords.speed) doc.speed = position.coords.speed;
        this.db.put(doc).then(() => {
          this.reloadCount();
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
    return (
      <div>
        {this.state.error ? <span>Error: {this.state.error}</span> : null}
        {this.state.count}
      </div>
    );
  }
}

export default GeoTracker;
