import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

const render = (status: Status) => {
  return <p>{status}</p>;
};

interface GoogleMapProps extends google.maps.MapOptions {
  zoom: number;
  latitude: number;
  longitude: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  zoom,
  latitude,
  longitude
}) => {

  let [zoomValue, setZoom] = React.useState(zoom); // initial zoom
  let [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: latitude,
    lng: longitude,
  });

  React.useEffect(() => {
    if (zoom !== zoomValue) { setZoom(zoom) }

    if (latitude !== center.lat) {
      setCenter({
        lat: latitude,
        lng: longitude,
      })
    }

    if (longitude !== center.lng) {
      setCenter({
        lat: latitude,
        lng: longitude,
      })
    }
  });

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={"AIzaSyBeNCOUwn-ubDcBdjEWOsuuc4e-aMroprk"} render={render}>
        <Map
          center={center}
          zoom={zoomValue}
          style={{ flexGrow: "1", height: "450px" }}
        >
          <Marker position={{
            "lat": latitude,
            "lng": longitude
          }} />
        </Map>
      </Wrapper>
    </div>
  );
};

interface MapProps extends google.maps.MapOptions {
  children: React.ReactNode;
  style: { [key: string]: string };
}

const Map: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  let ref = React.useRef<HTMLDivElement>(null);
  let [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default GoogleMap;
