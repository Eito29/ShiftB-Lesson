import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import classes from '../styles/Top.module.css'

export default function Top() {
  const [posts, setPosts] = useState([]);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"); // (例)郵便局に手紙を出す await fetch()
      const data = await res.json(); // (例)返事を開けて内容を確認 await res.json()
      setPosts(data.posts); // (例)返事の内容をノートに書き留める（状態に保存）
    }

    loadPosts();
  }, []) //[]空でレンダリング時に一度だけ処理を発火

  return (
    <div>
      <ul className={classes.list}>
        {
          posts.map(post => ( // (post)でもよい。複数の場合は(post1, post2)など
            <li key={post.id} className={classes.listbox}>
              <Link to={'/report/' + post.id} className={classes.link}>
                <div className={classes.posts}>
                  <div>
                    <div className={classes.post}>
                      <small className={classes.postsDate}>
                        {/* new Date()で日時をJavaScriptのDateオブジェクトに変換して、toLocaleDateString()というメソッドで表示形式を変えるy/m/d/}*/}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </small>
                      <div>

                        {/* カテゴリ用に繰り返し処理 */}
                        {post.categories.map((category) => {
                          return (
                            <span key={category} className={classes.postsCategory}>{category}</span>
                          );
                        })}
                      </div>
                    </div>
                    <h1 className={classes.postsTitle}>{post.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: post.content }} className={classes.postsContent}></p>{/* 直接HTMLを埋め込むためのプロパティ */}
                  </div>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
