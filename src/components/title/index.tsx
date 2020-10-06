import React, { FC } from "react";
import './index.less'

type Props = {
  title: string;
};

const Title: FC<Props> = ({ title }) => {
  return (
    <div className="title">
      <p>{title}</p>
    </div>
  );
};

export default Title;
