import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import classes from '../styles/Top.module.css'

export default function Top() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // エラーメッセージ用の状態

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const loadPosts = async () => {
      // try エラーが発生する可能性のあるコード
      // catch エラーが発生した場合の処理
      // finally 必ず実行したい処理
      try {
        // １．データ取得開始
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/");

        // ２．レスポンスが正常でない場合はエラーを投げる　→　catchへ
        if (!res.ok) { //okはプロパティ名。レスポンスがエラーの場合にエラー処理
          throw new Error("データの取得に失敗しました");
        }

        // ３．正常にデータを取得し、stateに保存
        const data = await res.json();
        setPosts(data.posts);

      } catch (error) {
        // ４．取得エラーの場合
        setError(error.message); // error.messageでエラーメッセージを設定「Failed to fetch」
        setPosts([]); // 空の配列をセット
        console.error(error); // (error)はthrow new Error("データの取得に失敗しました");を表示　※本番環境ではconsole.errorは使用しない方がよい。
      } finally {
        setIsLoading(false); // データ取得後に読み込みを終了する
      }
    }

    loadPosts();
  }, []) //[]空でレンダリング時に一度だけ処理を発火

  // 読み込み中
  if (isLoading) {
    return <div>読み込み中です。しばらくお待ちください。</div>;
  }

  // エラーが発生した場合
  if (error) {
    return <div>{error}</div>; // データの取得に失敗しましたを表示
  }

  // postsが空の場合
  if (posts.length === 0) {
    return <div>記事が見つかりません</div>;
  }
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
                      <h1 className={classes.postsTitle}>{post.title}</h1>
                      <p dangerouslySetInnerHTML={{ __html: post.content }} className={classes.postsContent}></p>{/* 直接HTMLを埋め込むためのプロパティ */}
                    </div>
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
