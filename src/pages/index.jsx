import { Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import useTranslation from "next-translate/useTranslation";

const fetchData = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
};

export default function Home() {
  const { data, error, isLoading, refetch } = useQuery("商品列表", fetchData);
  const router = useRouter();
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className=" flex justify-center items-center text-2xl text-purple-600 h-screen">
        Loading..........
      </div>
    );
  if (error) return <p>Error!</p>;
  return (
    <div className="container m-auto  h-screen w-screen">
      <h2 className=" text-purple-400 text-2xl">hello world</h2>
      <div className=" flex">
        <Button type="primary">{t("common:hello")}</Button>
        <div className="w-4"></div>
        <Button type="danger">Submit</Button>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <Button type="primary" onClick={() => refetch()}>
        刷新
      </Button>
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
