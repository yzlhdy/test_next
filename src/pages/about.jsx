import { Button } from "antd";
import Image from "next/image";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useInfiniteQuery } from "react-query";

import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";

// getData: 获取数据的函数

const getData = async ({ pageParam = 1 }) => {
  console.log("==================>page", pageParam);
  const res = await fetch(
    `https://fakestoreapi.com/products?limit=${pageParam}`
  );
  const data = await res.json();
  return data;
};

export default function About() {
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery("商品列表", getData, {
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 104) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  const { t } = useTranslation();
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;
  const result = data.pages[data.pages.length - 1];
  return (
    <div className=" bg-purple-300">
      <h1>{t("about:title")}</h1>
      <div className="container m-auto">
        <ul className="grid grid-cols-6 gap-3">
          {result.map((item) => (
            <li
              key={item.id}
              className="flex flex-col relative items-center justify-center shadow-xl bg-white rounded-xl p-4 cursor-pointer hover:translate-y-3 hover:scale-105"
            >
              <Image
                src={item.image}
                width={200}
                height={200}
                alt={item.title}
              />
              <p className=""> {item.title}</p>
            </li>
          ))}
        </ul>

        <Button
          type="primary"
          block
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
        >
          加载更多
        </Button>
      </div>
      <ul>
        {router.locales.map((locale) => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              <a>{locale}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
