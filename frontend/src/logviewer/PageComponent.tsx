import React from 'react';
import { CountedPage, Line, Page } from './page';
import { useBookContext } from './BookContext';
import { fetchLogPage } from './http';

interface PageComponentProps {
  page: CountedPage;
}

export const PageComponent: React.FC<PageComponentProps> = (props: PageComponentProps) => {
  const { addPage } = useBookContext();

  const handleExpand = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    fetchLogPage(props.page.start).then((page: Page) => {
      addPage({ ...props.page, lines: page.lines });
    });
    addPage(props.page);
  };

  const collapsed = props.page.lines.length === 0;
  return (
    <>
      {collapsed && (
        <div className="line header" onClick={handleExpand}>
          [+] {props.page.lineCount} lines collapsed. Click to expand.
        </div>
      )}
      {props.page.lines.map((line: Line, key: number) => {
        return (
          <div className="line" key={`page${props.page.start}-line${key}`}>
            <div className="details">
              <div className="date">{line.date}</div>
              <div className="severity">{line.severity}</div>
            </div>
            <div className="message">{line.message}</div>
          </div>
        );
      })}
    </>
  );
};
