"use client"
import { useState } from "react";
import TrendlyLoader from "./(components)/TrendlyLoader/TrendlyLoader";

export default function loading() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
    {!loaded && <TrendlyLoader onFinish={() => setLoaded(true)} />}
    </>
  )
}
