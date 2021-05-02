import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'

const UploadImages = ({ tourInfo, setTourInfo, setLoading }) => {
  const user = useSelector((state) => state.user)

  const uploadImagesAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = tourInfo.images

    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: {
                    token: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                setLoading(false)
                allUploadedFiles.push(res.data)

                setTourInfo({ ...tourInfo, images: allUploadedFiles })
              })
              .catch((err) => {
                setLoading(false)
              })
          },
          'base64'
        )
      }
    }
  }

  const handleImageDelete = (public_id) => {
    setLoading(true)

    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        {
          headers: {
            token: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false)
        const { images } = tourInfo
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id
        })
        setTourInfo({ ...tourInfo, images: filteredImages })
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className='row'>
        {tourInfo.images &&
          tourInfo.images.map((image) => (
            <Badge
              key={image.public_id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleImageDelete(image.public_id)}
              count='X'
            >
              <Avatar
                src={image.url}
                size={200}
                shape='square'
                className='ml-3'
              />
            </Badge>
          ))}
      </div>
      <div className='row'>
        <label className='btn btn-primary btn-raised mt-3'>
          Choose File
          <input
            type='file'
            hidden
            multiple
            onChange={uploadImagesAndResize}
            accept='images/*'
          />
        </label>
      </div>
    </>
  )
}

export default UploadImages
