import Axios from "axios";
import { FC } from "react";

type Props = {
  content: any;
};
const View: FC<Props> = ({ content }) => {
  console.log(content);
  return <>helo</>;
};

export default View;

export const getServerSideProps = async () => {
  const { data } = await Axios.get("http://dev-kim.local:3000/api/run");
  return {
    props: {
      content: JSON.parse(data),
    },
  };
};
