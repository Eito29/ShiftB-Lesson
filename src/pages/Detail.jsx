import React from 'react'
import { useParams } from 'react-router-dom' // React Routerのフックで、URLのパラメータ（この場合はid）を取得するために使う
import { posts } from '../data/posts'
import classes from '../styles/Detail.module.css'

export const Detail = () => {
  // <Route path="/posts/:id" element={<Detail />} />ここの:id 動的な値を受け取ることが可能
  const {id} = useParams()
  // find()は配列から最初に条件に合う要素を返す。
  // parseInt()は文字列を整数に変換する関数
  // postItem.idとparams.id（整数）を比較し、一致する投稿を取得
  const post = posts.find((postItem) => postItem.id === parseInt({id}.id));

  if (!post) {
    return <div className={classes.notFound}>記事が見つかりません</div>
  }

  return (
    <>
      <div className={classes.list}>
        <img src={post.thumbnailUrl} className={classes.img} alt={`${post.title}の画像`} />
        <div className={classes.post}>
          <small className={classes.postsDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
          <div>
            {post.categories.map((category) => {
              return (
                <span key={category} className={classes.postsCategory}>{category}</span>
              );
            })}
          </div>
        </div>
        <h1 className={classes.postsTitle}>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
    </>
  );
}
