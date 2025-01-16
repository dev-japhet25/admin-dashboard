'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info, X, RefreshCw } from 'lucide-react'

interface ModalProps {
  children: React.ReactNode,
  onClick: () => void
  open: boolean
  setOpen: (open: boolean) => void
  modalHead: string
  className?: string,
  actionItems?: boolean,
  actionItemText?: string,
  actionItemMethod?: () => void
}

export const Modal = ({ children, onClick, open, setOpen, modalHead, className, actionItemText, actionItems, actionItemMethod }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={className ? className : 'bg-white overflow-auto'} >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-slate-800 uppercase py-3  flex items-center justify-center gap-2">
            <Info className="h-6 w-6" />
            {modalHead}
          </DialogTitle>
        </DialogHeader>

        <div className="mx-auto sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] overflow-auto">
          {children}
        </div>

        <DialogFooter>
          {actionItems ? <Button
            variant="secondary"
            onClick={actionItemMethod}
            className="bg-white border border-gray-400 rounded-md px-4 hover:bg-slate-200 focus:ring-0 focus:ring-blue-500 mt-5">

            <RefreshCw className="h-6 w-6 mr-2 text-gray-900 hover:text-blue-600" /> <span className='text-gray-900 font-semibold hover:text-blue-600'>{actionItemText}</span>
          </Button> : null}
          <Button
            variant="secondary"
            onClick={onClick}
            className="w-full sm:w-auto bg-gray-900 hover:bg-blue-900 mt-5"
          >

            <X className="h-4 w-4 mr-2 text-white" onClick={onClick} />
             <span className='text-white font-medium'>Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

