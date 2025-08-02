import React from 'react'

// Trusted component map for safe rendering
export const COMPONENT_MAP = {
  Button: (props: any) => (
    <button 
      className={props.className || 'bg-gray-500 text-white px-4 py-2 rounded'}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || 'button'}
    >
      {props.children || 'Button'}
    </button>
  ),
  
  Card: (props: any) => (
    <div 
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${props.className || ''}`}
    >
      {props.children}
    </div>
  ),
  
  Input: (props: any) => (
    <input
      type={props.type || 'text'}
      placeholder={props.placeholder}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
      value={props.value}
      onChange={props.onChange}
    />
  ),
  
  Text: (props: any) => (
    <p className={props.className || 'text-gray-900'}>
      {props.children || props.text}
    </p>
  ),
  
  Div: (props: any) => (
    <div className={props.className || ''}>
      {props.children}
    </div>
  ),
  
  Span: (props: any) => (
    <span className={props.className || ''}>
      {props.children}
    </span>
  ),
  
  Link: (props: any) => (
    <a 
      href={props.href || '#'}
      className={`text-blue-600 hover:text-blue-800 underline ${props.className || ''}`}
    >
      {props.children}
    </a>
  )
}

export type ComponentType = keyof typeof COMPONENT_MAP

export interface ComponentDefinition {
  type: ComponentType
  props: Record<string, any>
} 