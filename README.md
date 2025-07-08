# MCP Visualizer

A component library for organizing and previewing Figma-generated React components, designed to work with Cursor's MCP (Model Context Protocol) integration.

## Overview

MCP Visualizer is a React application for:
- Organizing and browsing Figma-generated React components
- Previewing components and viewing their code
- Managing component metadata and categories

**All usage, preview, and deployment are handled via Vercel at:**
[https://vercel.com/rmarti55s-projects/componentlibrary](https://vercel.com/rmarti55s-projects/componentlibrary)

> **Note:** This project is not intended to be run locally. Do not use localhost or local development servers for this project.

## Features

- 🎨 **Figma Integration**: Generate components from Figma via Cursor's MCP tools
- 📚 **Component Library**: Organize and browse generated components
- 🔍 **Search & Filter**: Find components by name, category, or tags
- 👁️ **Preview Mode**: View components and their code
- 🟢 **Vercel Deployment**: Always up-to-date with the latest GitHub commits

## Project Structure

```
src/
├── components/          # React components
│   ├── CategoryPreview.tsx
│   ├── ColorPalette.tsx
│   ├── CommentsChip.tsx
│   ├── ComponentPreview.tsx
│   ├── ComponentSidebar.tsx
│   ├── FilterChip.tsx
│   ├── FilterChipGroup.tsx
│   ├── FilterChips.tsx
│   ├── MultiBrandDashboard.tsx
│   ├── Typography.tsx
│   └── ui/              # UI primitives (badge, button, card, etc.)
├── data/                # Static data (categories, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── styles/              # CSS and font styles
├── types/               # TypeScript types
└── main.tsx             # App entry point
```

## Deployment & Workflow

- **Source of truth:** [GitHub repository](https://github.com/rmarti55/componentlibrary)
- **Production deployment:** [Vercel project](https://vercel.com/rmarti55s-projects/componentlibrary)
- **Auto-deploy:** Every push to GitHub `main` triggers an automatic deployment to Vercel. No manual deployment or local preview is needed.
- **No localhost:** Do not run `npm run dev` or use any local server. All previews and usage are via the Vercel URL above.

## Usage

1. **Generate components in Cursor** using MCP tools from Figma
2. **Add components to this project** (via code, PR, or automation)
3. **Push to GitHub** – triggers Vercel auto-deploy
4. **Preview and organize components** at the Vercel deployment URL

## Contributing

- Add new components to `src/components/` and register them as needed
- Update metadata in `src/data/` or `components.json`
- All changes must be pushed to GitHub; Vercel will auto-deploy
- Do not attempt to run or preview locally

## Tech Stack

- **React 18** + TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling

## Notes

- This project is for component organization and preview only
- All previews and usage are via the Vercel deployment
- No local development or localhost usage 