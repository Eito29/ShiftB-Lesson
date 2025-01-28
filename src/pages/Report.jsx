import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../styles/Top.module.css'

export default function Report() {
  // useParamsでURLパラメータを取得。
  const { id } = useParams(); // { id }は<Route path="/report/:id" element={<Report />} />と一致
  const [post, setPosts] = useState([]); // 「空の配列」
  const [isLoading, setIsLoading] = useState(true); // 読み込み中用に準備。isLoadingの初期状態をtrueに設定

  // APIでpostsを取得する処理をuseEffectで実行。
  useEffect(() => { //データを非同期に取得するため、最初のレンダリング時にはpostはまだnullかundefined
    const loadPosts = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPosts(data.post);
      setIsLoading(false); // データ取得後に読み込み中の状態を終了する
    }

    loadPosts();
  }, [id]) // idの値が変更されるたびにuseEffectが発火

  // 読み込み中
  if (isLoading) {
    return <div>読み込み中です。しばらくお待ちください。</div>;
  }

  // 記事がない場合
  if (!post) return <div>記事が見つかりません。</div>; // この部分がないと、postがまだデータを取得できていない状態でレンダリングが進んでしまい、エラーが発生する

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