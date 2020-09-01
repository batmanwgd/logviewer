import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { CountedPage, Page } from './page';
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
  & >.header {
    width: 100%;
    .stats {
      box-sizing: border-box;

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

      background: white;
      .line {
        font-family: "Courier New", Courier, monospace;
        font-size: 0.75em;
        text-align: left;
        &:first-child {
          border: 0;
        }
        border-top: 1px solid red;
        display: flex;
        .details {
          float: 0 1;
          display: flex;
          .date {
            float: 1;
          }
          .severity {
            float: 0 1;
          }
        }
        .message {
          float: 1;
        }
        @media (max-width: ${breakpointSmall}) {
          flex-direction: column;
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
      .then((page: Page) => {
        addPage({ ...page, lineCount: page.lines.length });
      });
  });

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const lastEnd = book.pages[book.pages.length - 1].end;
    fetchLogPage(lastEnd + 1)
      .then((page: Page) => {
        addPage({ ...page, lineCount: page.lines.length });
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
