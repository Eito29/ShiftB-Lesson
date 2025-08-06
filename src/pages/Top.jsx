import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import classes from '../styles/Top.module.css'

// 解説
// APIデータを入れる為のfatcher関数を用意
// asyncで非同期処理（待つ処理）にする
// res(API取得のfetch()が返すResponseオブジェクトの略称)にデータを受信
// data関数にresで取得したデータをJSON形式に変換して保存
// stateに保存

export default function Top() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        // １．データ取得（エラーが起こるかもしれない処理）
        // fetch(...)でデータを取得、awaitで「データが返ってくるまで待つ」、それをres関数に入れ込む
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")

        // ２．レスポンスが正常でない場合はエラーを投げる　→　catchへ
        if (!res.ok) {
          // 「Error という組み込みのコンストラクタ関数を使って、新しいエラーオブジェクトを作る」という意味
          // throw「作成したエラーを投げて、プログラムの流れを止める」
          throw new Error("データの取得に失敗しました");
        }

        // ３．正常にデータを取得し、stateに保存
        // awaitで読み込み完了まで待ち、res.json()でJSON形式のデータとして読み込み、data関数に入れ込む
        const data = await res.json();
        // stateに保存
        setPosts(data.posts);

      } catch (error) {
        // ４．エラーが起きたときの処理
        // (error)にはJSのErrorオブジェクトとしてerror.messageがあるのでそれをsetErrorに保存
        setError(error.message);
        // 古いデータや誤ったデータを表示しないために空にする
        setPosts([]);
        // console確認用
        console.error(error);
      } finally {
        // ５．成功しても失敗しても実行される処理（ローディング終了）
        setIsLoading(false);
      }
    }

    fetcher();
  }, []) //[]空でレンダリング時に一度だけ処理を発火

  if (isLoading) {
    return <div>読み込み中です。しばらくお待ちください。</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (posts.length === 0) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div>
      <ul className={classes.list}>
        {
          posts.map(post => (
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

                    {/* 直接HTMLを埋め込むためのプロパティ */}
                    <p dangerouslySetInnerHTML={{ __html: post.content }} className={classes.postsContent}></p>
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
