import { ReactNode } from 'react'

// Define prop types for components
type BasicProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

// Trusted component map for safe rendering
export const COMPONENT_MAP = {
  Button: ({ className, children, ...rest }: BasicProps) => (
    <button className={className} {...rest}>
      {children}
    </button>
  ),
  
  Card: ({ className, children, ...rest }: BasicProps) => (
    <div className={className} {...rest}>
      {children}
    </div>
  ),
  
  Input: ({ className, ...rest }: BasicProps) => (
    <input className={className} {...rest} />
  ),
  
  Text: ({ className, children, text, ...rest }: BasicProps) => (
    <p className={className} {...rest}>
      {children || text}
    </p>
  ),
  
  Div: ({ className, children, ...rest }: BasicProps) => (
    <div className={className} {...rest}>
      {children}
    </div>
  ),
  
  Span: ({ className, children, ...rest }: BasicProps) => (
    <span className={className} {...rest}>
      {children}
    </span>
  ),
  
  Link: ({ className, children, href, ...rest }: BasicProps) => (
    <a 
      href={href || '#'}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}

export type ComponentType = keyof typeof COMPONENT_MAP

export interface ComponentDefinition {
  type: ComponentType
  props: Record<string, any>
} 