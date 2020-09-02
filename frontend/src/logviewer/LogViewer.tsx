import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { CountedPage, Page } from './page';
import { bookReducer, Book } from './reducer';
import { PageComponent } from './PageComponent';
import { fetchLogPage } from './http';

const breakpointSmall = '620px';
const Wrapper = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    max-width: 800px;
  }
  & > .header {
    width: 100%;

    .stats {
      box-sizing: border-box;
      max-width: 800px;

      margin: 0px auto;
      // border-bottom: 2px solid black;
      background: #ffffffee;
      box-shadow: 0px 3px 3px #ccc;

      height: 100%;
    }

    position: fixed;
    top: 0;
    height: 50px;
  }

  .content {
    .table {
      padding-top: 50px;
      background: blue;

      background: white;
      .line {
        padding: 5px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.75em;
        text-align: left;
        &:first-child {
          border: 0;
        }
        border-top: 1px solid #92d3f5ff;
        display: flex;
        .details {
          flex: 0 0 250px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-right: 5px;
          .date {
            flex: 1 0;
            white-space: nowrap;
          }
          .severity {
            // text-align: left;
            flex: 0 0;
            padding: 0 3px;
            background: #92d3f5ff;
            border-radius: 3px;
          }
        }
        .message {
          flex: 1 1;
        }
        @media (max-width: ${breakpointSmall}) {
          .details {
            flex: 0 0;
            padding-right: 0;
            .severity {
              // padding: 0;
            }
          }
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
    .footer {
      background: grey;
    }
  }
`;

export const LogViewer: React.FC = () => {
  const [book, addPage] = useReducer<React.Reducer<Book, CountedPage>>(bookReducer, {
    pages: [],
    stats: {},
  });

  useEffect(() => {
    fetchLogPage(0).then((page: Page) => {
      addPage({ ...page, lineCount: page.lines.length });
    });
  }, []);

  const handleLoadMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const lastEnd = book.pages[book.pages.length - 1].end;
    fetchLogPage(lastEnd + 1).then((page: Page) => {
      addPage({ ...page, lineCount: page.lines.length });
    });
  };

  return (
    <Wrapper>
      <div className="header">
        <div className="stats">stats</div>
      </div>
      <div className="content">
        <div className="table">
          {book.pages.map((page: CountedPage, key: number) => (
            <PageComponent page={page} key={`page-${key}`} />
          ))}
        </div>
      </div>

      <div className="footer">
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </Wrapper>
  );
};
