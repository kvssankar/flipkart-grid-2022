/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div> 
      <p  className="mt-2 centerComponent text-4xl font-bold"><span  style={{color:"#047BD5"}}>Meta</span><span style={{color:"#F7A200"}}>KART</span></p>
      <nav  className="navMenu border-b p-6">
        <div className="centerComponent flex mt-1">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-pink-500">
              Sell 
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">
              Owned
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">
              History
            </a>
          </Link>
        </div>
        <div className="dot"></div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp