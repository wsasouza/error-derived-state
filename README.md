<div align="center" id="top"> 
  <h1>- Código não otimizado</h1>

  <img src="./src/assets/error.gif" alt="Error Derived State" />

  <h1>- Código otimizado</h1>

  <img src="./src/assets/fixing.gif" alt="Fixing Derived State" />

&#xa0;

</div>

<h1 align="center">Error Derived State</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/wsasouza/error-derived-state?color=510C87">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/wsasouza/error-derived-state?color=510C87">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/wsasouza/error-derived-state?color=510C87">

  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/wsasouza/error-derived-state?color=510C87">
 
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0;  
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/wsasouza" target="_blank">Author</a>
</p>

<br>

## :dart: About

Um dos erros mais comuns no React (e você provavelmente já cometeu também) é a criação de estados derivados, que são estados criados a partir de outra informação já presente no componente.

Esses estados acabam causando renderizações desnecessárias, que podem ser substituídos facilmente por variáveis calculadas em tempo de execução.

```typescript
/* . . . */

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]); // one state ( + )
  const [search, setSearch] = useState('');

  console.log('Render');

  useEffect(() => {
    fetch('https://api.github.com/users/wsasouza/repos')
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  useEffect(() => { // one useEffect ( + )
    if (search.length > 0)
      setFilteredRepos(repos.filter((repo) => repo.name.includes(search)));
  }, [search]);

  return (
    <div>
      <input
 /* . . . */
```

👆 Código não otimizado gerando renderizações desnecessárias.<br><br>

```typescript
/* . . . */

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  // removing unnecessary state ( - )
  const [search, setSearch] = useState('');

  console.log('Render');

  useEffect(() => {
    fetch('https://api.github.com/users/wsasouza/repos')
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  // Removing unnecessary useEffect ( - )

  const filteredRepos = search.length > 0 // ( + )
	? repos.filter(repo => repo.name.includes(search))
	: [];

  return (
    <div>
      <input
 /* . . . */
```

👆 O React só precisou renderizar esse componente novamente quando setSearch foi chamado dentro do input. O valor dos repositórios filtrados não precisam ficar dentro de um novo estado, pois eles podem ser calculados dentro de um componente como uma variável.

## :rocket: Technologies

The following tools were used in this project:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/wsasouza/error-derived-state

# Access
$ cd error-derived-state

# Install dependencies
$ yarn

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/wsasouza" target="_blank">Walter Santos de Andrade Souza</a>

&#xa0;

<a href="#top">Back to top</a>
