import React from "react";
import dynamic from "next/dynamic";
// import Map from './Map/Map';

const Map = dynamic(() => import("./Map/Map"), { ssr: false });

const Index = (props) => {
  return (
    <>
      <h2>Index</h2>
      <Map divesites={props.divesites} />
    </>
  );
};

export default Index;
