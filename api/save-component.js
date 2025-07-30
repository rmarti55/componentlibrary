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

    // Create registry entry
    const newComponentEntry = `{
  id: '${sanitizedName.toLowerCase()}',
  name: '${sanitizedName}',
  description: 'AI-generated component',
  component: ${componentExportName},
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

    return res.status(200).json({ 
      success: true, 
      message: 'Component ready for library integration',
      fileName,
      componentCode,
      componentName: sanitizedName,
      category: targetCategory,
      registryEntry: newComponentEntry,
      instructions: `Add this component to src/components/${fileName} and update src/data/componentCategories.ts`
    })
  } catch (error) {
    console.error('Save component error:', error)
    return res.status(500).json({ error: 'Failed to process component' })
  }
} 