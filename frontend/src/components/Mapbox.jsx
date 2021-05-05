import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
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
    width: window.innerWidth * 0.9,
    height: '60vh',
    zoom: 8,
  })

  const [selectedPlace, setSelectedPlace] = useState(true)
  // eslint-disable-next-line
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.9)

  useEffect(() => {
    setViewPort({
      ...viewPort,
      longitude: areaLongitude,
      latitude: areaLatitude,
      width: window.innerWidth * 0.9,
    })
    // eslint-disable-next-line
  }, [areaLongitude, areaLatitude, window.innerWidth])

  useEffect(() => {
    let debounce
    const measurements = () => {
      if (debounce) {
        clearTimeout(debounce)
      }
      debounce = setTimeout(() => {
        setInnerWidth(window.innerWidth)

        if (window.innerWidth * 0.9 < width) {
          setWidth(window.innerWidth * 0.9)
        }
      }, 100)
    }

    window.addEventListener('resize', measurements)

    return () => {
      window.removeEventListener('resize', measurements)
    }
  }, [width])

  return (
    <div className='d-flex justify-content-center'>
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
              alt='pointer'
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
