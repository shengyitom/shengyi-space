import { useEffect, useRef, useState } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4'

type VideoFrameRequest = (
  callback: (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => void,
) => number

type VideoFrameCancel = (handle: number) => void

export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const displayCanvasRef = useRef<HTMLCanvasElement>(null)
  const capturedFramesRef = useRef<HTMLCanvasElement[]>([])
  const captureRequestRef = useRef<number | null>(null)
  const playbackRequestRef = useRef<number | null>(null)
  const lastCapturedTimeRef = useRef(-1)
  const captureStoppedRef = useRef(false)
  const [framesReady, setFramesReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const displayCanvas = displayCanvasRef.current

    if (!video || !displayCanvas) return

    let disposed = false
    let frameWidth = 0
    let frameHeight = 0
    captureStoppedRef.current = false
    capturedFramesRef.current = []
    lastCapturedTimeRef.current = -1

    const requestVideoFrame = Reflect.get(video, 'requestVideoFrameCallback') as
      | VideoFrameRequest
      | undefined
    const cancelVideoFrame = Reflect.get(video, 'cancelVideoFrameCallback') as
      | VideoFrameCancel
      | undefined

    const stopCapture = () => {
      captureStoppedRef.current = true
      if (captureRequestRef.current === null) return

      if (typeof cancelVideoFrame === 'function' && typeof requestVideoFrame === 'function') {
        cancelVideoFrame.call(video, captureRequestRef.current)
      } else {
        window.cancelAnimationFrame(captureRequestRef.current)
      }
      captureRequestRef.current = null
    }

    const setCaptureSize = () => {
      if (!video.videoWidth || !video.videoHeight) return false
      frameWidth = Math.min(960, video.videoWidth)
      frameHeight = Math.round((video.videoHeight / video.videoWidth) * frameWidth)
      return true
    }

    const captureCurrentFrame = () => {
      if (
        disposed ||
        captureStoppedRef.current ||
        video.ended ||
        !setCaptureSize() ||
        video.currentTime === lastCapturedTimeRef.current
      ) {
        return
      }

      const frame = document.createElement('canvas')
      frame.width = frameWidth
      frame.height = frameHeight
      const context = frame.getContext('2d', { alpha: false })
      if (!context) return

      context.drawImage(video, 0, 0, frameWidth, frameHeight)
      capturedFramesRef.current.push(frame)
      lastCapturedTimeRef.current = video.currentTime
    }

    const scheduleCapture = () => {
      if (disposed || captureStoppedRef.current || video.ended) return

      if (typeof requestVideoFrame === 'function') {
        captureRequestRef.current = requestVideoFrame.call(video, () => {
          captureCurrentFrame()
          scheduleCapture()
        })
      } else {
        captureRequestRef.current = window.requestAnimationFrame(() => {
          captureCurrentFrame()
          scheduleCapture()
        })
      }
    }

    const beginCapture = () => {
      if (captureRequestRef.current !== null || captureStoppedRef.current) return
      captureCurrentFrame()
      scheduleCapture()
    }

    const beginCanvasPlayback = () => {
      const frames = capturedFramesRef.current
      if (!frames.length || disposed) return

      displayCanvas.width = frames[0].width
      displayCanvas.height = frames[0].height
      const context = displayCanvas.getContext('2d', { alpha: false })
      if (!context) return

      let frameIndex = 0
      let direction = 1
      let previousTimestamp = 0
      const interval = 1000 / 30

      const drawFrame = (timestamp: number) => {
        if (disposed) return

        if (timestamp - previousTimestamp >= interval) {
          context.drawImage(frames[frameIndex], 0, 0)

          if (frames.length > 1) {
            if (frameIndex === frames.length - 1) direction = -1
            if (frameIndex === 0) direction = 1
            frameIndex += direction
          }

          previousTimestamp = timestamp - ((timestamp - previousTimestamp) % interval)
        }

        playbackRequestRef.current = window.requestAnimationFrame(drawFrame)
      }

      context.drawImage(frames[0], 0, 0)
      setFramesReady(true)
      playbackRequestRef.current = window.requestAnimationFrame(drawFrame)
    }

    const handleLoadedData = () => {
      if (disposed) return
      setCaptureSize()
      video.play().catch(() => undefined)
    }

    const handleEnded = () => {
      stopCapture()
      beginCanvasPlayback()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', beginCapture)
    video.addEventListener('ended', handleEnded)

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) handleLoadedData()

    return () => {
      disposed = true
      stopCapture()
      if (playbackRequestRef.current !== null) {
        window.cancelAnimationFrame(playbackRequestRef.current)
      }
      video.pause()
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', beginCapture)
      video.removeEventListener('ended', handleEnded)
      capturedFramesRef.current = []
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 origin-top scale-[1.15] overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="h-full w-full object-cover object-top"
        style={{ display: framesReady ? 'none' : 'block' }}
      />
      <canvas
        ref={displayCanvasRef}
        className="h-full w-full object-cover object-top"
        style={{ display: framesReady ? 'block' : 'none' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/15 to-white/30" />
    </div>
  )
}
