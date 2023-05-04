import Axios from "axios";
import { FC } from "react";

type SimpleStep = { description: string };
type ExternalStep = { description: string; path: string; external: string };
type Book = {
  [key: string]: {
    [functionName: string]: { steps: [SimpleStep | ExternalStep] };
  };
};
type Props = {
  content: Book;
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
