import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { apiClient } from "../../utilities/apiClient";

const pointsImageLike = require("../../assets/thumb-up.png");
const pointsImageDislike = require("../../assets/dislike.png");
import Image from "next/image";

function Article() {
  const router = useRouter();
  const { articleId } = router.query;
  const [articleData, setArticleData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      if (articleId) {
        const { data } = await apiClient.get(`/items/${articleId}`);
        setArticleData(data);
        setIsLoading(false);
      }
    })();
  }, [articleId]);
  if (isLoading) {
    return (
      <div>
        <div className="article">
          <h1 className="article-heading">...Loading</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Article {articleId}</title>
        <meta name="description" content="Hybr1d Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {articleData && (
        <div className="article">
          <h1 className="article-heading">
            {articleData.title}
            <span className="article-points">
              <div>
                <Image
                  src={
                    articleData.points > 0
                      ? pointsImageLike
                      : pointsImageDislike
                  }
                  width={15}
                  height={15}
                  layout="fixed"
                  alt="Like Image"
                />
              </div>
              {articleData.points}{" "}
            </span>
          </h1>
          <div className="comments-container">
            {articleData.children.map((comment: any) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Comment = ({ comment }: { comment: any }) => {
  return (
    <>
      {comment.text && comment.author ? (
        <div className="article-comment">
          <h3>{comment.author}</h3>
          <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
          <div>
            <span>{new Date(comment.created_at).toDateString()}</span> &nbsp;
            <span>
              {comment.points}&nbsp;&nbsp;
              <Image
                src={comment.points > 0 ? pointsImageLike : pointsImageDislike}
                width={20}
                height={20}
                layout="fixed"
                alt="Like Image"
              />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Article;
