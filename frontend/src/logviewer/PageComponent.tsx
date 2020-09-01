import React from "react";
import { CountedPage, Line } from "./page";

interface PageComponentProps {
  page: CountedPage;
}

export const PageComponent: React.FC<PageComponentProps> = (props: PageComponentProps) => {
  return (
    <div className="page">
      {props.page.start}
      {props.page.lines.map((line: Line) => {
        return (
          <div className="line">
            {line.date}
            {line.severity}
            {line.message}
          </div>
        );
      })}
    </div>
  );
}
