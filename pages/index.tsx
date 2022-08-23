import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { apiClient } from "../utilities/apiClient";

const image = require("../assets/comment.png");

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);

  const searchHackerNews = async (query: string) => {
    if (query.trim()) {
      try {
        const {
          data: { hits },
        }: { data: { hits: any[] } } = await apiClient.get("/search", {
          params: { query: searchQuery },
        });
        console.log(
          hits
            .sort(
              (article1, article2) =>
                new Date(article1.created_at).getTime() -
                new Date(article2.created_at).getTime()
            )
            .reverse()
        );
        setArticles(hits);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Hybr1d Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app-container">
        <h1 className="heading">Hybr1d Assignment</h1>
        <div className="input-container">
          <input
            className="input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button
            className="button"
            onClick={() => searchHackerNews(searchQuery)}
          >
            Search
          </button>
        </div>
        <div className="article-container">
          {articles &&
            articles.map((article) => (
              <ArticleItem key={article.created_at_i} article={article} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

const ArticleItem = ({ article }: { article: any }) => {
  const router = useRouter();
  return (
    <div
      className="article-item"
      onClick={() => router.push(`/article/${article.objectID}`)}
    >
      <p>{article.title}</p>
      <span>
        {new Date(article.created_at).toLocaleString("default", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
        <div>
          <Image alt="comment-icon" src={image} width={16} height={16} />
          {article.num_comments}{" "}
        </div>
      </span>
    </div>
  );
};
