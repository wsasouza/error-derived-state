import { useState, useEffect } from 'react';

interface Repo {
  name: string;
  description: string;
}


export function App() {
  const [repos, setRepos] = useState<Repo[]>([]); 
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');  

  console.log('Render');

  useEffect(() => {
    fetch('https://api.github.com/users/wsasouza/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
  }, []);

  useEffect(() => {
    if (search.length > 0)
      setFilteredRepos(repos.filter(repo => repo.name.includes(search)));
  }, [search]);  

  return (
    <div>
      <input 
        type="text" 
        name="search"
        placeholder="buscar"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      { search.length > 0 ? (
          <ul>
            {filteredRepos.map(repo => {
              return (
                <li key={repo.name}>
                  {repo.name}
                </li>
              )
            })}
          </ul> 
        ) : (
          <ul>
            {repos.map(repo => {
              return (
                <li key={repo.name}>
                  {repo.name}
                </li>
              )
            })}
          </ul> 
        )
      }       
    </div>
  );
}


