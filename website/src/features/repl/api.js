export async function buildTokens({ content }) {
  const response = await fetch('http://localhost:3000/build', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: 'button.tokens.json',
      content: JSON.stringify(content),
    }),
  })
  const data = await response.json()
  return data.raw[0].content
  // console.log('>>> data', data)
}
