import { useEffect } from "react"
import Link from "next/link"



const Home = () => {
  useEffect(() => {
    document.getElementById('__next').classList.add('start-page');
    return () => {
      document.getElementById('__next').classList.remove('start-page');
    };
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-400 flex justify-center mt-40">
        😀this is iamport payment test page
      </h1>
      <div className="flex justify-center mt-40 gap-10">
        <button className="font-bold hover:text-blue-300"><Link href="/pay">Go to General Payment</Link></button>
        <button className="font-bold hover:text-blue-300"><Link href="/regularpay">Go to Regualr Payment</Link></button>
      </div>
    </>
  )
}

export default Home;