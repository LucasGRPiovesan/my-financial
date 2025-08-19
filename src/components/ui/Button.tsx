import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...rest }: Props) {
  if (variant === 'ghost') {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-xl px-3 py-2 font-medium hover:bg-slate-100 active:scale-[.98] transition ${className}`}
        {...rest}
      />
    )
  }
  return <button className={`btn ${className}`} {...rest} />
}