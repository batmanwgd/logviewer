import React from "react";
import { CountedPage, Line } from "./page";

interface PageComponentProps {
  page: CountedPage;
}

export const PageComponent: React.FC<PageComponentProps> = (props: PageComponentProps) => {
  return (
    <>
      <div className="line header">
        {props.page.start}
      </div>
      {props.page.lines.map((line: Line) => {
        return (
          <div className="line">
            <div className="details">
              <div className="date">{line.date}</div>
              <div className="severity">{line.severity}</div>
            </div>
            <div className="message">
              {line.message}
            </div>
          </div>
        );
      })}
    </>
  );
}
