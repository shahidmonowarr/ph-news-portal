import RootLayout from "@/components/Layouts/RootLayout";
import AllNews from "@/components/UI/AllNews";
// import Banner from "@/components/UI/Banner";
import { useGetNewsesQuery } from "@/redux/api/api";
import dynamic from "next/dynamic";
import Head from "next/head";

const HomePage = ({ allNews }) => {
  const { data, isLoading, isError, Error } = useGetNewsesQuery();
  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h1>Loading...</h1>,
    // to use it as client side rendering:
    // ssr: false,
  });
  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicBanner />
      {/* <AllNews allNews={data} /> */}
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const data = await res.json();

//   return {
//     props: {
//       allNews: data,
//     },
//     revalidate: 10,
//   };
// };
export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();

  return {
    props: {
      allNews: data?.data,
    },
    // revalidate: 10,
    // we don't need this line if we use getServerSideProps
  };
};
