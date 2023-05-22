import { useCallback, useEffect, useRef, useState } from 'react';

import { Graph, GraphConfiguration, GraphData, GraphLink, GraphNode, LinkLabelProperty } from 'react-d3-graph';

import movies from './data/index.json';
import './App.css'

interface Movie {
  Starring: string[];
  Title: string;
}

const searchMoviesByTitle = (title: string, pageSize: number, pageNumber: number): any[] => {
  const matchingMovies = movies.filter(movie => {
    if (!('Starring' in movie) || !Array.isArray(movie?.Starring) || movie?.Starring.length === 0) {
      return false;
    }
    return movie.Title.toLowerCase().includes(title.toLowerCase());
  });
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedMovies = matchingMovies.slice(startIndex, endIndex);
  return slicedMovies;
}

const typesLinks = [
  { type: 'STRAIGHT', color: '#DB0160', strokeLinecap: "butt" },
  { type: 'CURVE_SMOOTH', color: '#AA0BDB', strokeLinecap: "butt" },
  { type: 'CURVE_FULL', color: '#DB2D0B', strokeLinecap: "butt" },
  { type: 'STRAIGHT', color: '#16DB8D', strokeLinecap: "round" },
  { type: 'CURVE_SMOOTH', color: '#96DB16', strokeLinecap: "round" },
  { type: 'CURVE_FULL', color: '#FF8CBD', strokeLinecap: "round" },
  { type: 'STRAIGHT', color: '#FFF599', strokeLinecap: "square" },
  { type: 'CURVE_SMOOTH', color: '#66FF6C', strokeLinecap: "square" },
];

export const App = () => {

  const [search, setSearch] = useState<Movie[]>([] as Movie[]);
  const [value, setValue] = useState('');
  const [nodeSelected, setNodeSelected] = useState('');
  const [config, setConfig] = useState<Partial<GraphConfiguration<GraphNode, GraphLink>>>({});
  const wrapperGraph = useRef<HTMLElement | null>(null);

  const [graph, setGraph] = useState<GraphData<GraphNode, GraphLink>>({} as GraphData<GraphNode, GraphLink>);
  const [edges, setEdges] = useState<Movie[]>([] as Movie[]);

  useEffect(() => {
    const data = searchMoviesByTitle(value, 9, 1);
    setSearch(data);
  }, [value]);

  const addMovie = useCallback((movie: Movie) => {
    setEdges([...edges, movie].filter(({ Title }, index, edges) => edges.findIndex(({ Title: title }) => Title === title) === index).slice(0, 8));
  }, [edges, edges.length]);


  const removeMovie = useCallback((movie: Movie) => {
    setEdges(edges.filter(({ Title }) => Title !== movie.Title));
  }, [edges, edges.length]);




  useEffect(() => {
    // nodes are the Starring
    // links are the Title
    const nodes = [...(new Set(edges.reduce((acc, { Starring }) => ([...acc, ...Starring]), [] as string[]))).values()]
      .map((node) => ({ id: node, }));

    // create a pair order between Starring in a movie 
    // @ts-ignore
    const links = edges.reduce((acc, { Starring, Title }, indexTitle) => {
      // @ts-ignore

      const pairs = Starring.reduce((acc, starring, key) => {
        if (key === 0) {
          return acc;
        }

        // @ts-ignore
        const pair = Starring.reduce((acc, pair, index) => {
          if (index === key) {
            return acc;
          }
          return [...acc, { source: starring, target: pair, label: Title, highlightColor: 'lightblue', ...typesLinks[indexTitle] }];
        }, [] as Record<string, string>[]);


        return [...acc, ...pair];
      }, [] as Record<string, string>[]);

      return [...acc, ...pairs];
    }, [] as Record<string, string>[]);

    const graph = {
      nodes,
      links,
    } as unknown as GraphData<GraphNode, GraphLink>;
    setGraph(graph);
  }, [edges, edges.length]);

  // @ts-ignore
  const onClickGraph = useCallback((node: string) => {
    setNodeSelected(node);
  }, []);


  useEffect(() => {
    setConfig({
      nodeHighlightBehavior: true,
      height: wrapperGraph?.current?.clientHeight ?? 0,
      width: wrapperGraph?.current?.clientWidth ?? 0,
      node: {
        color: 'lightgreen',
        size: 200,
        highlightStrokeColor: 'blue'
      },
      link: {
        highlightColor: 'lightblue',
        renderLabel: true,
        labelProperty: ((node) => {
          const { source, target } = node;
          if ([source, target].includes(nodeSelected)) {
            return (node['label' as keyof GraphLink] ?? '') as string;
          }
          return '';
        }) as LinkLabelProperty<GraphLink>
      },
      d3: {
        gravity: -1500
      }
    });
  }, [edges, wrapperGraph.current, nodeSelected]);




  return (
    <>
      <main>

        <header className='border-wrapper' >
          <div className="border"></div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="https://www.konradlorenz.edu.co/wp-content/themes/andreco/images/logo-konrad.png" alt="" style={{ height: '1.5rem' }} />
            <h1>Disney Connections</h1>
          </span>
        </header>
        <article>
          <section className='menu border-wrapper'>
            <div className="border"></div>
            <article className='form-item'>
              <input
                type="text"
                className={value.length > 0 ? 'active' : ''}
                name=""
                id="search"
                value={value}
                onChange={({ target: { value } }) => setValue(value)}
              />
              <label htmlFor='search'>Search a movie</label>
            </article>
            <article className='results'>
              {search.length && <h2>Add Movies</h2>}
              {search.map(({ Title, Starring }, key) => (
                <button
                  className='border-wrapper'
                  key={key}
                  onClick={() => addMovie({ Title, Starring })}
                >
                  <div className="border"></div>
                  <span>{Title}</span>
                </button>
              ))}
            </article>
          </section>
          <section className='graph border-wrapper'>
            <div className="border"></div>
            <article>
            </article>
            <article ref={wrapperGraph} >
              <Graph
                id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
                data={graph}
                config={config}
                onClickNode={onClickGraph}
              />
            </article>
          </section>
          {
            edges.length
            && <section className='nodes border-wrapper' >
              <div className="border"></div>
              {
                edges.map(({ Starring, Title }, key) => (
                  <button
                    key={key}
                    onClick={() => removeMovie({ Title, Starring })}
                    style={{ '--color': typesLinks[key].color } as React.CSSProperties}
                  >
                    <span>{Title}</span>
                  </button>
                ))
              }
            </section>

          }
        </article>
      </main>
    </>
  )
}

