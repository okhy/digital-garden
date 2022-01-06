import { useRouter } from "next/router"
// services
import notionClient from "../../services/notion.service"
// utils
import HTMLParser from "../../utils/notionBlockToHTMLParser"

const NotePage: React.FC<{ htmlContent: any }> = ({ htmlContent }) => {
  const router = useRouter()
  const { id } = router.query
  console.log(htmlContent)

  return <p>Post: {id}</p>
}

export default NotePage

export const getStaticProps = async ({ params }) => {
  const client = notionClient()
  const postData = await client.getPostData(params.id)

  return {
    props: {
      htmlContent: HTMLParser(postData.pageData.results),
    },
  }
}

export const getStaticPaths = async () => {
  const client = notionClient()
  const postList = await client.getPostList()
  const IDList = postList.map((postData) => ({ params: { id: postData.id } }))

  return {
    paths: IDList,
    fallback: false,
  }
}
