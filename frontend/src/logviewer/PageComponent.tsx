import React from 'react';
import { CountedPage, Line } from './page';

interface PageComponentProps {
  page: CountedPage;
}

export const PageComponent: React.FC<PageComponentProps> = (props: PageComponentProps) => {
  const handleExpand = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    alert('hi');
  };

  const collapsed = props.page.lines.length === 0;
  return (
    <>
      {collapsed && (
        <div className="line header">
          <a href="#" onClick={handleExpand}>
            [+] {props.page.lineCount} lines collapsed. Click to expand.
          </a>
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
