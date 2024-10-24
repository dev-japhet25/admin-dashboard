"use client"

import Image from 'next/image'

export default function ImageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative w-32 h-32">
          <Image
            src="/logo-dark.png"
            alt="Loading..."
            width={150}
            height={150}
            className="animate-blink"
          />
        </div>
      </div>
    </div>
  )
}