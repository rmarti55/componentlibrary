# MCP Visualizer

A local development component library that integrates with Cursor's MCP (Model Context Protocol) to generate React components from Figma designs.

## Overview

MCP Visualizer is a local React application designed to work with Cursor's MCP integration to:
- Generate React components from Figma designs
- Organize components in a searchable library
- Preview generated components with code viewing
- Manage component metadata and properties

## Features

- 🎨 **Figma Integration**: Connect to Figma via MCP to generate components
- 📚 **Component Library**: Organize and browse generated components
- 🔍 **Search & Filter**: Find components by name, category, or tags
- 👁️ **Preview Mode**: View generated components and their code
- 💾 **Persistent Storage**: Components are saved locally in browser storage
- 🔄 **Real-time Updates**: Connection status and component generation in real-time

## Project Structure

```
src/
├── components/          # React components
│   ├── ComponentSidebar.tsx    # Component list and search
│   ├── ComponentPreview.tsx    # Component preview and code view
│   └── FigmaConnector.tsx      # MCP integration interface
├── hooks/              # React hooks
│   └── useComponentRegistry.ts # Component state management
├── services/           # Service layer
│   └── figmaMcp.ts    # MCP integration service
├── types/              # TypeScript types
│   └── Component.ts   # Component interface
└── styles/             # Styling
    └── index.css      # Tailwind CSS + custom styles
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Usage

### Generating Components

1. **Connect to Figma**: Ensure your MCP connection to Figma is active
2. **Enter Node ID**: Input a Figma node ID or paste a Figma URL
3. **Generate**: Click "Generate" to create a React component
4. **View & Edit**: The component will appear in your library

### Managing Components

- **Search**: Use the search bar to find components by name or description
- **Filter**: Filter by category using the dropdown
- **Select**: Click on a component to view it in the preview panel
- **Copy Code**: Use the "Copy Code" button to get the component code

### Component Preview

- **Preview Tab**: See component information and metadata
- **Code Tab**: View the generated React component code
- **Figma Link**: Click to open the original Figma design

## MCP Integration

This project integrates with Cursor's MCP system to access Figma tools:

- `mcp_Figma_get_code`: Generate React component code
- `mcp_Figma_get_image`: Get component preview images
- `mcp_Figma_get_variable_defs`: Access design tokens
- `mcp_Figma_get_code_connect_map`: Get component mappings

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Local Storage** for persistence

## Notes

- This is a **local development tool** - not intended for deployment
- Components are stored in browser localStorage
- MCP connection status is checked periodically
- The app is designed to work specifically with Cursor's MCP integration

## Workflow

1. **Generate**: Use MCP to create components from Figma designs
2. **Organize**: Components are automatically added to your library
3. **Browse**: Use the sidebar to navigate your component collection
4. **Preview**: View components and copy code for use in your projects

## Contributing

This project is designed as a local development component library. To extend functionality:

1. Add new component types in `src/types/`
2. Extend the MCP service in `src/services/figmaMcp.ts`
3. Add new UI components in `src/components/`
4. Update styling in `src/index.css` 