import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Image from 'next/image'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', location: '', link:'' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url);
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price, location, link } = formInput
    if (!name || !description || !price || !location || !link || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, location, link, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Event name"
          className="mt-8 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Event description"
          className="mt-5 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input 
          placeholder="Event location"
          className="mt-5 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, location: e.target.value })}
        />
        <input 
          placeholder="Event link"
          className="mt-5 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, link: e.target.value })}
        />
        <input
          placeholder="Ticket price in MTR"
          className="mt-5 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <label className="mt-5 text-red-400 text-sm"><i>We are currently working on our business model, you can only mint 1 ticket at this moment.</i></label>
        <input
          type="number"
          value="1"
          min="1"
          max="1"
          placeholder="How many Tickets?"
          className="mt-2 border rounded p-4 bg-white hover:bg-gray-200"
          onChange={e => updateFormInput({ ...formInput, quantity: e.target.value })}
        readOnly/>
        <label className="mt-5 text-white">Choose Ticket Artwork 🎫 </label>
        <label className="mt-2 text-gray-400 text-sm"><i>Ideal artwork size: 650x300*</i></label>
        <input
          type="file"
          name="Asset"
          className="my-5 text-white cursor-pointer"
          onChange={onChange}
        />
        {
          fileUrl && (
            <center><Image height="170" width="320" className="rounded mt-5" src={fileUrl} /></center>
          )
        }
        <button onClick={createMarket} className="mt-5 border-2 border-blue-500 hover:bg-gray-900 text-2xl text-white rounded p-4 shadow-lg">
          Create Ticket
        </button>
      </div>
    </div>
  )
}