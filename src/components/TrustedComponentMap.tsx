import { ReactNode } from 'react'

// Define prop types for components
type ButtonProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

type CardProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

type InputProps = {
  className?: string;
  [key: string]: any;
};

type TextProps = {
  className?: string;
  children?: ReactNode;
  text?: string;
  [key: string]: any;
};

type DivProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

type SpanProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
};

type LinkProps = {
  className?: string;
  children?: ReactNode;
  href?: string;
  [key: string]: any;
};

// Trusted component map for safe rendering
export const COMPONENT_MAP = {
  Button: ({ className, children, ...rest }: ButtonProps) => (
    <button 
      className={className || 'bg-gray-500 text-white px-4 py-2 rounded'}
      {...rest}
    >
      {children || 'Button'}
    </button>
  ),
  
  Card: ({ className, children, ...rest }: CardProps) => (
    <div 
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className || ''}`}
      {...rest}
    >
      {children}
    </div>
  ),
  
  Input: ({ className, ...rest }: InputProps) => (
    <input
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      {...rest}
    />
  ),
  
  Text: ({ className, children, text, ...rest }: TextProps) => (
    <p className={className || 'text-gray-900'} {...rest}>
      {children || text}
    </p>
  ),
  
  Div: ({ className, children, ...rest }: DivProps) => (
    <div className={className || ''} {...rest}>
      {children}
    </div>
  ),
  
  Span: ({ className, children, ...rest }: SpanProps) => (
    <span className={className || ''} {...rest}>
      {children}
    </span>
  ),
  
  Link: ({ className, children, href, ...rest }: LinkProps) => (
    <a 
      href={href || '#'}
      className={`text-blue-600 hover:text-blue-800 underline ${className || ''}`}
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