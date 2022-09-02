import fetch from './api'

export const createIpfsUrl = cid => `${process.env.IPFS_GATEWAY$}/{cid}`

export const fetchMetadata = async cid => {
  return await fetch(
    createIpfsUrl(cid),
    'GET'
  )
}
