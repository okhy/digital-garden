import notesService from "../../services/notes.service"
import { useRouter } from "next/router"
// styles
import styles from './styles.module.css'

const NotePage: React.FC<{ htmlContent: any }> = ({ htmlContent }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
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
