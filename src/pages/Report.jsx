import React from 'react'
import { useParams } from 'react-router-dom';
import { posts } from '../data/posts'
import classes from '../styles/Top.module.css'

export default function Report() {
  // useParamsでURLパラメータを取得。
  const { id } = useParams(); // { id }は<Route path="/report/:id" element={<Report />} />と一致

  // idに基づいて該当する投稿データを取得
  // findで条件にあった最初のデータを見つける。
  // idは文字列として取得されるため、parseIntで数値に変換
  const post = posts.find(post => post.id === parseInt(id));

  // 記事がない場合はこれを表示
  if (!post) return <div>記事が見つかりません</div>;

  return (
    <div>
      <div className={classes.list}>
        <div className={classes.posts}>
          <div>
            <img src={post.thumbnailUrl} className="App-logo" alt="logo" />
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
        </div>
      </div>
    </div>
  );
}