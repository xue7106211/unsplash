"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ImageCardProps {
  imageUrl: string
  title: string
  photographer: string
  fullImageUrl: string
}

export function ImageCard({ imageUrl, title, photographer, fullImageUrl }: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setIsOpen(true)}>
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 bg-gray-900">
            <h3 className="font-semibold truncate text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400">by {photographer}</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            摄影师: {photographer}
          </DialogDescription>
          <div className="relative aspect-video">
            <Image
              src={fullImageUrl}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="p-4 bg-gray-900">
            <h3 className="font-semibold text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400">by {photographer}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 