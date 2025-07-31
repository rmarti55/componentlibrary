export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // GitHub API configuration
    const githubToken = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER || 'rmarti55'
    const repo = process.env.GITHUB_REPO || 'componentlibrary'
    const branch = 'main'

    if (!githubToken) {
      return res.status(500).json({ 
        error: 'GitHub token not configured'
      })
    }

    // Fetch componentCategories.ts from GitHub
    const registryPath = 'src/data/componentCategories.ts'
    const registryResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${registryPath}?ref=${branch}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )

    if (!registryResponse.ok) {
      return res.status(500).json({ 
        error: 'Failed to fetch component registry from GitHub'
      })
    }

    const registryData = await registryResponse.json()
    const registryContent = Buffer.from(registryData.content, 'base64').toString('utf-8')

    // Also fetch any AI-generated components from the ai/ directory
    const aiComponentsPath = 'src/components/ai'
    const aiResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${aiComponentsPath}?ref=${branch}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )

    let aiComponents = []
    if (aiResponse.ok) {
      const aiData = await aiResponse.json()
      for (const file of aiData) {
        if (file.name.endsWith('.tsx')) {
          const fileResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}?ref=${branch}`,
            {
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          )
          if (fileResponse.ok) {
            const fileData = await fileResponse.json()
            const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
            aiComponents.push({
              name: file.name.replace('.tsx', ''),
              content: fileContent,
              path: file.path
            })
          }
        }
      }
    }

    return res.status(200).json({ 
      success: true,
      registryContent,
      aiComponents,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Fetch components error:', error)
    return res.status(500).json({ error: 'Failed to fetch components from GitHub' })
  }
} 