export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { componentCode, componentName, category } = req.body
  if (!componentCode || !componentName || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // GitHub API configuration
    const githubToken = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER || 'rmarti55'
    const repo = process.env.GITHUB_REPO || 'componentlibrary'
    const branch = 'main'

    if (!githubToken) {
      return res.status(500).json({ 
        error: 'GitHub token not configured',
        fallback: true 
      })
    }

    // Sanitize component name
    const sanitizedName = componentName.replace(/[^a-zA-Z0-9]/g, '')
    const fileName = `${sanitizedName}.tsx`
    const filePath = `src/components/ai/${fileName}`

    // Extract component name from code
    const nameMatch = componentCode.match(/const\s+(\w+)|export\s+default\s+(\w+)/)
    const componentExportName = nameMatch?.[1] || nameMatch?.[2] || sanitizedName

    // Map category
    const categoryMap = {
      'atom': 'atoms',
      'molecule': 'molecules', 
      'organism': 'organisms'
    }
    const targetCategory = categoryMap[category] || 'atoms'

    // Get current file content (if exists)
    let currentSha = null
    try {
      const fileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      )
      if (fileResponse.ok) {
        const fileData = await fileResponse.json()
        currentSha = fileData.sha
      }
    } catch (error) {
      // File doesn't exist, that's fine
    }

    // Create component file
    const fileContent = Buffer.from(componentCode).toString('base64')
    const fileCommitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Add AI-generated component: ${sanitizedName}`,
          content: fileContent,
          branch: branch,
          ...(currentSha && { sha: currentSha })
        })
      }
    )

    if (!fileCommitResponse.ok) {
      const error = await fileCommitResponse.text()
      console.error('GitHub file creation failed:', error)
      return res.status(500).json({ 
        error: 'Failed to create component file',
        fallback: true 
      })
    }

    // Update componentCategories.ts
    const registryPath = 'src/data/componentCategories.ts'
    const registryResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${registryPath}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )

    if (!registryResponse.ok) {
      return res.status(500).json({ 
        error: 'Failed to read component registry',
        fallback: true 
      })
    }

    const registryData = await registryResponse.json()
    const currentRegistry = Buffer.from(registryData.content, 'base64').toString('utf-8')
    const registrySha = registryData.sha

    // Create new component entry
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

    // Find the category and add the component
    const categoryRegex = new RegExp(`(variants: \\[)([^\\]]*)(\\], // ${targetCategory})`)
    const updatedRegistry = currentRegistry.replace(
      categoryRegex,
      `$1${newComponentEntry},$2$3`
    )

    // Commit registry update
    const registryUpdateResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${registryPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Add ${sanitizedName} to component registry`,
          content: Buffer.from(updatedRegistry).toString('base64'),
          branch: branch,
          sha: registrySha
        })
      }
    )

    if (!registryUpdateResponse.ok) {
      const error = await registryUpdateResponse.text()
      console.error('GitHub registry update failed:', error)
      return res.status(500).json({ 
        error: 'Failed to update component registry',
        fallback: true 
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Component saved to GitHub successfully!',
      fileName,
      componentName: sanitizedName,
      category: targetCategory,
      filePath,
      deployed: true
    })

  } catch (error) {
    console.error('GitHub API error:', error)
    return res.status(500).json({ 
      error: 'Failed to save component to GitHub',
      fallback: true 
    })
  }
} 