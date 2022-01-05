import { Client } from '@notionhq/client'
export default () => {
  const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
  const digitalGardenDBId = process.env.NOTION_DG_DB_ID

  const getPageInfo = (id) => client.pages.retrieve({
    page_id: id
  })

  const getPageContent = (id) => client.blocks.children.list({
    block_id: id
  })

  const getPostList = () => client.databases.query({
    database_id: digitalGardenDBId
  })

  const getPostById = (id) => {
    const pageInfo = getPageInfo(id)
    const pageData = getPageContent(id)
    return Promise.all([pageInfo, pageData]).then(([pageInfo, pageData]) => ({ pageInfo, pageData }))
  }

  return {
    getPostList,
    getPostById
  }
}
