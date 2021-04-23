import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { EnvironmentOutlined } from '@ant-design/icons'
import Pointer from '../images/pointer.png'

const Mapbox = ({
  areaLatitude,
  areaLongitude,
  startLatitude,
  startLongitude,
  address,
}) => {
  const [viewPort, setViewPort] = useState({
    longitude: null,
    latitude: null,
    width: '90vw',
    height: '60vh',
    zoom: 8,
  })

  const [selectedPlace, setSelectedPlace] = useState(true)

  useEffect(() => {
    setViewPort({
      ...viewPort,
      longitude: areaLongitude,
      latitude: areaLatitude,
    })
  }, [areaLongitude, areaLatitude])

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/markusmatu/cknt5wz6k0wjh18phgtrzmyce'
        onViewportChange={(viewPort) => {
          setViewPort(viewPort)
        }}
      >
        {startLatitude && startLongitude && (
          <Marker
            offsetTop={(-viewPort.zoom * 4) / 2}
            latitude={startLatitude}
            longitude={startLongitude}
          >
            <img
              className='pointer'
              onClick={(e) => {
                e.preventDefault()
                setSelectedPlace(true)
              }}
              src={Pointer}
              width={viewPort.zoom * 4}
              height={viewPort.zoom * 4}
            />
          </Marker>
        )}

        {selectedPlace && startLongitude && startLatitude && (
          <div style={{ color: 'red' }}>
            <Popup
              latitude={startLatitude}
              longitude={startLongitude}
              onClose={() => setSelectedPlace(false)}
            >
              <div>
                <p className='pt-2' style={{ color: 'red' }}>
                  Start Location: {address}
                </p>
              </div>
            </Popup>
          </div>
        )}
      </ReactMapGL>
    </div>
  )
}

export default Mapbox
