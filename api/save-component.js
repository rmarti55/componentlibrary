import { componentStorage } from '../../src/lib/storage.js'

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
    
    // Extract component name from code for import
    const nameMatch = componentCode.match(/const\s+(\w+)|export\s+default\s+(\w+)/)
    const componentExportName = nameMatch?.[1] || nameMatch?.[2] || sanitizedName

    // Map category to registry category
    const categoryMap = {
      'atom': 'atoms',
      'molecule': 'molecules', 
      'organism': 'organisms'
    }
    
    const targetCategory = categoryMap[category] || 'atoms'

    // Create component data for storage
    const componentData = {
      id: `ai-${sanitizedName.toLowerCase()}-${Date.now()}`,
      name: sanitizedName,
      category: targetCategory,
      code: componentCode,
      description: 'AI-generated component',
      created: new Date().toISOString(),
      aiGenerated: true,
      componentName: componentExportName,
      states: [
        {
          name: 'Default',
          props: {},
          description: 'Default state'
        }
      ]
    }

    // Save to database
    const success = await componentStorage.saveComponent(componentData)
    
    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Component saved to library successfully!',
        componentId: componentData.id,
        componentName: sanitizedName,
        category: targetCategory
      })
    } else {
      return res.status(500).json({ error: 'Failed to save component to database' })
    }
  } catch (error) {
    console.error('Save component error:', error)
    return res.status(500).json({ error: 'Failed to process component' })
  }
} 