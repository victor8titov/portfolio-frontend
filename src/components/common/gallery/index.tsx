import React, { FC, useMemo } from 'react'
import { ImageView } from '../../../api/types/image.types'
import './styles.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { getUrlImageByTemplate } from '../../../utils/get-url-image'
import NextArrow from './components/next-arrow'
import PrevArrow from './components/prev-arrow'
import { uniteClasses } from '../../../utils/unite-style-classes'

type Props = {
  images?: ImageView[]
}

const Gallery: FC<Props> = (props) => {
  const { images } = props

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    accessibility: true,
    arrows: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div className='gallery__dot' />
    )
  }), [])

  const isOneImage = useMemo(() => images && images?.length <= 1, [images])

  if (!images) return null

  return (
    <div className={uniteClasses('gallery', isOneImage && 'gallery_one-image')}>
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
