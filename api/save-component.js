import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { componentCode, componentName, category } = req.body
  if (!componentCode || !componentName || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Sanitize component name
    const sanitizedName = componentName.replace(/[^a-zA-Z0-9]/g, '')
    const fileName = `${sanitizedName}.tsx`
    const filePath = join(process.cwd(), 'src', 'components', fileName)

    // Create component file
    await writeFile(filePath, componentCode)

    // Update component registry
    const registryPath = join(process.cwd(), 'src', 'data', 'componentCategories.ts')
    const registryContent = await readFile(registryPath, 'utf-8')

    // Add component to registry (simplified - would need more complex parsing in production)
    const newComponentEntry = `
      {
        id: '${sanitizedName.toLowerCase()}',
        name: '${sanitizedName}',
        description: 'AI-generated component',
        component: ${sanitizedName},
        interactive: false,
        code: \`${componentCode.replace(/`/g, '\\`')}\`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Default state'
          }
        ]
      }`

    // Find the category and add the component
    const categoryMap = {
      'atom': 'atoms',
      'molecule': 'molecules', 
      'organism': 'organisms'
    }
    
    const targetCategory = categoryMap[category] || 'atoms'
    
    // This is a simplified approach - in production you'd want proper AST parsing
    const updatedContent = registryContent.replace(
      new RegExp(`(variants: \\[)([^\\]]*)(\\], // ${targetCategory})`),
      `$1${newComponentEntry},$2$3`
    )

    await writeFile(registryPath, updatedContent)

    return res.status(200).json({ 
      success: true, 
      message: 'Component saved successfully',
      fileName,
      category: targetCategory
    })
  } catch (error) {
    console.error('Save component error:', error)
    return res.status(500).json({ error: 'Failed to save component' })
  }
} 