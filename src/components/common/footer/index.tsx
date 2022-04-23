import React, { FC, useCallback } from 'react'
import { getUrlImageByTemplate } from '../../../utils/get-url-image'
import useContentManager from './hooks/use-content-manager'
import './styles.scss'

const Footer: FC = () => {
  const { socialMedia } = useContentManager()

  const checkEmail = useCallback((link: string): boolean => {
    return /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(link)
  }, [])

  return (
    <footer className="footer">
      <div className="footer__box-links">
        {socialMedia?.length
          ? socialMedia.map((item) =>
            item?.icon
              ? <a
                  key={item.id}
                  href={checkEmail(item.link) ? 'mailto:' + item.link : item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link footer__link_img">
                  <img
                    src={getUrlImageByTemplate(item.icon)}
                    alt={item.name}
                    width="100%"
                  />
                </a>
              : (
                <a
                  href={item.link}
                  key={item.id}
                  className="footer__link footer__link_text">
                  {item.name || item.link}
                </a>
                )
          )
          : null}
      </div>
    </footer>
  )
}

export default Footer
