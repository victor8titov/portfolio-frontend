import React, { FC } from 'react'
import { ImageView } from '../../../api/types/image.types'
import './styles.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { getUrlImageByTemplate } from '../../../utils/get-url-image'
import NextArrow from './components/next-arrow'
import PrevArrow from './components/prev-arrow'

type Props = {
  images?: ImageView[]
}

const Gallery: FC<Props> = (props) => {
  const { images } = props
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div className='gallery__dot' />
    )
  }

  console.log(images)

  if (!images) return null

  return (
    <div className='gallery'>
      <Slider {...settings}>
        {images.map(image => (
            <img key={image.id} className='gallery__slide' src={getUrlImageByTemplate(image, 'mid')} alt={image.description || 'img tile'} />
        ))
        }
    </Slider>
    </div>
  )
}

export default Gallery
