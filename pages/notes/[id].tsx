import notesService from "../../services/notes.service"
import { useRouter } from "next/router"
// services

const NotePage: React.FC<{ htmlContent: any }> = ({ htmlContent }) => {
  // const router = useRouter()
  // const { id } = router.query

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default NotePage

export const getStaticProps = async ({ params }) => {
  const client = notesService()
  const postData = await client.getPostData(params.id)

  return {
    props: {
      htmlContent: postData.htmlContent,
    },
  }
}

export const getStaticPaths = async () => {
  const client = notesService()
  const postList = client.getPostList()
  const IDList = postList.map((postData) => ({ params: { id: postData.id } }))

  return {
    paths: IDList,
    fallback: false,
  }
}
