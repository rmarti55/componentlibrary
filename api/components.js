import { componentStorage } from '../../src/lib/storage.js'
import { componentCategories } from '../../src/data/componentCategories.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get AI-generated components from database
    const aiComponents = await componentStorage.getComponents()
    
    // Get static components from componentCategories
    const staticComponents = componentCategories.flatMap(category => 
      category.variants.map(variant => ({
        ...variant,
        category: category.name.toLowerCase(),
        aiGenerated: false,
        created: null // Static components don't have creation date
      }))
    )
    
    // Combine and sort components
    const allComponents = [...staticComponents, ...aiComponents]
    
    return res.status(200).json({ 
      components: allComponents,
      staticCount: staticComponents.length,
      aiCount: aiComponents.length,
      totalCount: allComponents.length
    })
  } catch (error) {
    console.error('Get components error:', error)
    return res.status(500).json({ error: 'Failed to fetch components' })
  }
} 