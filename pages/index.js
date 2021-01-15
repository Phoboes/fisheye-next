import Head from "next/head";
import Index from "../components/pages/index/Index";

function Home(divesites) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index divesites={divesites} />
    </div>
  );
}

Home.getInitialProps = async ({ req }) => {
  const protocol =
    req.headers.host.indexOf("local") !== -1 ? "http://" : "https://";
  const baseUrl = req ? `${protocol}${req.headers.host}` : "";
  const res = await fetch(`${baseUrl}/api/divesites`);
  const json = await res.json();
  return { divesites: json };
};

export default Home;
