const get_all_messages_query = `
query Query {
  getAllMessages {
    text
  }
}`;

fetch('http://localhost:4000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({ query: get_all_messages_query })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));