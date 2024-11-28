'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info, X } from 'lucide-react'

interface ModalProps {
  children: React.ReactNode,
  onClick: () => void
  open: boolean
  setOpen: (open: boolean) => void
  modalHead: string
  className?: string
}

export const Modal = ({ children, onClick, open, setOpen, modalHead, className }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='bg-gray-50 overflow-auto'>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-900 uppercase py-3  flex items-center justify-center gap-2">
            <Info className="h-6 w-6" />
            {modalHead}
          </DialogTitle>
        </DialogHeader>

        <div className="mx-auto sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] overflow-auto">
          {children}
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onClick}
            className="w-full sm:w-auto bg-gray-900 hover:bg-blue-300"
          >
            <X className="h-4 w-4 mr-2 text-white" /> <span className='text-white font-medium'>Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

