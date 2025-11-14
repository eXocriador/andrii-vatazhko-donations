import type { FC } from 'react'
import LightboxLib from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export type LightboxImage = {
  src: string
  alt: string
}

type LightboxProps = {
  images: LightboxImage[]
  index: number
  open: boolean
  onClose: () => void
}

const Lightbox: FC<LightboxProps> = ({ images, index, open, onClose }) => (
  <LightboxLib
    open={open}
    close={onClose}
    index={index}
    slides={images.map((image) => ({ src: image.src, description: image.alt }))}
    carousel={{ finite: images.length <= 1 }}
    controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
  />
)

export default Lightbox
