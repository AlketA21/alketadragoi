'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'

function StackImage({
  src,
  alt,
  index,
  total,
}: {
  src: string
  alt: string
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.035])
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, index === total - 1 ? 1 : 0.55])

  const topOffset = 88 + index * 18

  return (
    <div ref={ref} className="sticky" style={{ top: `${topOffset}px` }}>
      <motion.div
        style={{ scale, opacity }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] backdrop-blur-md"
      >
        {/* Shimmer skeleton — visible until the real image finishes loading */}
        {!loaded && (
          <div className="absolute inset-0 aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-muted via-card to-muted" />
        )}

        {/* Full, uncropped image — width sets the size, height follows naturally */}
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1600}
          sizes="(max-width: 768px) 100vw, 768px"
          onLoad={() => setLoaded(true)}
          className={`h-auto w-full object-contain transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.div>
    </div>
  )
}

export function ProjectGalleryStack({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  return (
    <div className="mt-16 flex w-full flex-col gap-6">
      {images.map((src, i) => (
        <StackImage
          key={src}
          src={src}
          alt={`${title} — photo ${i + 1}`}
          index={i}
          total={images.length}
        />
      ))}
      <div className="h-12" />
    </div>
  )
}
