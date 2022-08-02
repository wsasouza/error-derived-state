import { useState, useEffect } from 'react';

interface Repo {
  name: string;
  description: string;
}


export function App() {
  const [repos, setRepos] = useState<Repo[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/wsasouza/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
  }, [])

  return (
    <div>
      <input type="text" name='search' placeholder='buscar' />

      <ul>
        {repos.map(repo => {
          return (
            <li key={repo.name}>
              {repo.name}
            </li>
          )
        })}
      </ul>        
    </div>
  )
}


