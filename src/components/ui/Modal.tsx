// Modal.tsx
import { type ReactNode } from 'react'

type ModalProps = {
  onClose: () => void
  children: ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header com botão fechar */}
        <div className="flex justify-end p-2">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {/* Conteúdo */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
