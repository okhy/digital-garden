import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

import { marked } from 'marked'
import DOMPurify from 'dompurify'
const { window } = new JSDOM('<!DOCTYPE html>')
const domPurify = DOMPurify(window)
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js')
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

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
    const htmlContent = domPurify.sanitize(marked.parse(markdownContent))
    // console.log({ ...postData, htmlContent, markdownContent })

    return { ...postData, htmlContent }
  }

  return {
    getPostList,
    getPostById,
    getPostData
  }
}

export default notesService