import '../styles/globals.css'
import '../styles/main.css'
import Link from 'next/link'

function Marketplace({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <center>
          <h1 className="text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
            <div className="py-5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                Ticketing Marketplace on Meter Blockchain
              </span>
            </div>
          </h1>
        </center>
        <div className="flex mt-6">
          <Link href="/">
            <a className="ml-10 mr-14 text-lg text-white items-center bg-none border-2 border-blue-500 py-2 px-6 hover:border-blue-400 rounded-2xl text-base">
              Events
            </a>
          </Link>
          <Link href="/create-ticket">
            <a className="mr-14 text-lg text-white items-center bg-none border-2 border-blue-500 py-2 px-6 hover:border-blue-400 rounded-2xl text-base">
              Sell Tickets
            </a>
          </Link>
          <Link href="/my-tickets">
            <a className="mr-14 text-lg text-white items-center bg-none border-2 border-blue-500 py-2 px-6 hover:border-blue-400 rounded-2xl text-base">
              My Tickets
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-14 text-lg text-white items-center bg-none border-2 border-blue-500 py-2 px-6 hover:border-blue-400 rounded-2xl text-base">
              Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace