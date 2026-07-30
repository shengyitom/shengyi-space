import type { ImgHTMLAttributes } from 'react'

type OptimizedFormat = 'avif' | 'webp'

export function optimizedImagePath(src: string, format: OptimizedFormat) {
  return src.replace(/\.(png|jpe?g)$/i, `.${format}`)
}

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}

export function OptimizedImage({
  src,
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...imageProps
}: OptimizedImageProps) {
  return (
    <picture className="contents">
      <source srcSet={optimizedImagePath(src, 'avif')} type="image/avif" />
      <source srcSet={optimizedImagePath(src, 'webp')} type="image/webp" />
      <img
        src={optimizedImagePath(src, 'webp')}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...imageProps}
      />
    </picture>
  )
}
