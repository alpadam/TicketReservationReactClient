import React from "react";
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from "react-google-maps";

const SimpleMap = props => (
  <section id="locationGoogleMaps">
    <GoogleMapLoader
      containerElement={
        <div
          {...props.containerElementProps}
          style={{
            height: `100%`,
          }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={10}
          defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        >
            <Marker
              position={{lat: props.latitude, lng: props.longitude }}
              key={props.name}
            />

        </GoogleMap>
      }
    />
  </section>
);

export default SimpleMap;
