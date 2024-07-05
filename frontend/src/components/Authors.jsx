import { ALL_AUTHORS } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({variables: {name, born}})
    setName('')
    setBorn('')
  }
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2> Set birthyear</h2>
      <form onSubmit={submit}>
        <label>Pick an author:
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div>born
          <input
            value ={born}
            onChange={({target}) => setBorn(parseInt(target.value, 10))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
