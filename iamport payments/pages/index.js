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
      <button><Link href="/pay">Go to General Payment</Link></button>
      <button><Link href="/regularpay">Go to Regualr Payment</Link></button>

    </>
  )
}

export default Home;