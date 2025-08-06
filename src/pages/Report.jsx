import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../styles/Top.module.css';

export default function Report() {

  // useParamsでURLパラメータを取得。
  const { id } = useParams(); // { id }は<Route path="/report/:id" element={<Report />} />と一致

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      // id別でデータ取得
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      // 取得したレスポンスを JSON に変換
      const data = await res.json();
      // data.post を setPost()
      setPost(data.post);
      // ローディング完了を知らせる
      setIsLoading(false);
    }
    fetcher();
  }, [id]) // idが変わったときに実行

  // 読み込み中
  if (isLoading) {
    return <div>読み込み中です。しばらくお待ちください。</div>;
  }

  // 記事がない場合
  if (!post) {
    return <div>記事が見つかりません</div>;
  }

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