import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// ✅ badgeVariants جاهزة للتخصيص مع ألوان الـ theme
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          // primary: أنيق + واضح
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 transition-colors',
        secondary:
          // secondary: محايد وهادئ
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors',
        destructive:
          // destructive: تحذيري مع لمسة واضحة
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          // outline: أنظف خيار minimal
          'text-foreground border-border hover:bg-accent hover:text-accent-foreground transition-colors',
        muted:
          // muted: للـ tags / info badges
          'bg-muted text-muted-foreground border-transparent',
        accent:
          // accent: لإبراز شيء محدد
          'bg-accent text-accent-foreground border-transparent hover:bg-accent/90',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-sm',
      },
      rounded: {
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'md',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
