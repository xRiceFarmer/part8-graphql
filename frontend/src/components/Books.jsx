import { useState } from "react";
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useQuery } from "@apollo/client"
const Books = () => {
  
  const [filter, setFilter] = useState('')

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(
    filter ? ALL_BOOKS : ALL_BOOKS,
    {
      variables: filter ? { genre: filter } : {},
      fetchPolicy: "cache-and-network",
    }
  );

  const { loading: genresLoading, error: genresError, data: genresData } = useQuery(
    ALL_GENRES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  if (booksLoading || genresLoading) return <div>...loading</div>;
  if (booksError) return <div>Error: {booksError.message}</div>;
  if (genresError) return <div>Error: {genresError.message}</div>;

  const books = booksData.allBooks;
  const genres = genresData.allGenres;
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      ))}
      <button onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
