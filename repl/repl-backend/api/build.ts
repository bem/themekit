import { NowRequest, NowResponse } from '@vercel/node'

function withCors(fn: (req: NowRequest, res: NowResponse) => void) {
  return (req: NowRequest, res: NowResponse) => {
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return fn(req, res)
  }
}

export default withCors((req: NowRequest, res: NowResponse) => {
  res.json({ data: 'hello' })
})
