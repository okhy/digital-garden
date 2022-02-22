import { useRouter } from "next/router"
// services
import notesService from "../../services/notes.service"

const NotePage: React.FC<{ htmlContent: any }> = ({ htmlContent }) => {
  const router = useRouter()
  const { id } = router.query
  // console.log(htmlContent)

  return <p>Post: {id}</p>
}

export default NotePage

export const getStaticProps = async ({ params }) => {
  const client = notesService()
  const postData = await client.getPostData(params.id)
  console.log(postData)

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
