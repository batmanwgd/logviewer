import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { CountedPage } from './page';
import { bookReducer, Book } from './reducer';
import { PageComponent } from './PageComponent';
import { fetchLogPage } from './http';

const breakpointSmall = 800;
const Wrapper = styled.div`
  font-size: 1em;
  & > div {
    width: 720px;
    margin: 0px auto;
  }
  .header {
    width: 100%;
    .stats {
      width: 720px;
      margin: 0px auto;
      border: 1px solid green;
      height: 100%;
    }

    position: fixed;
    top: 0;
    background: red;
    height: 50px;

  }

  .content {

    .table {
      padding-top: 50px;
      background: blue;

      .page {
        background: white;
        .line {
          &:first-child {
            border: 0;
          }
          border-top: 1px solid red;
        }
      }
    }  
  }
  .footer {
    background: yellow;
    height: 30pt;
  }
  

  @media (max-width: ${breakpointSmall}) {

  }
`;

export const LogViewer: React.FC = () => {

  const [book, addPage] = useReducer<React.Reducer<Book, CountedPage>>(
    bookReducer,
    {
      pages: [],
      stats: {},
    }
  );

  useEffect(() => {
    fetchLogPage(0)
      .then((page: CountedPage) => {
        addPage(page);
      });
  });

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const lastEnd = book.pages[book.pages.length - 1].end;
    fetchLogPage(lastEnd + 1)
      .then((page: CountedPage) => {
        addPage(page);
      });
  }
  
  return (
    <Wrapper>
      <div className="header"><div className="stats">stats</div></div>
      <div className="content">
        <div className="table">
          {book.pages.map((page: CountedPage) => <PageComponent page={page} />)}
        </div>
      </div>

      <div className="footer">
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </Wrapper>
  );
};
