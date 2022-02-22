import fs from 'fs'
import path from 'path'

type postData = {
  id: string, title: string, htmlContent?: string
}

const notesService = () => {
  const getPostList = (): postData[] => {
    return fs.readdirSync(path.join('markdown'))
      .filter(folderName => folderName[0] != '.')
      .map(folderName => {
        const postId = folderName?.replace(/\s/g, '-').toLowerCase()
        return {
          id: postId,
          title: folderName
        }
      })
  }

  const getPostById = (id) => id

  const getPostData = (id): postData => {
    const postData = getPostList().find(post => id === post.id)
    const markdownContent = postData?.title ? fs.readFileSync(path.join('markdown', postData.title, 'content.md'), 'utf-8') : ''
    const htmlContent = ''
    console.log({ ...postData, htmlContent, markdownContent })

    return { ...postData, htmlContent }
  }

  return {
    getPostList,
    getPostById,
    getPostData
  }
}

export default notesService