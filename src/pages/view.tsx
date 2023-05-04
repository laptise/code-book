import Axios from "axios";
import { FC } from "react";

type Step = { description: string; path?: string; external?: string };
type FunctionDefinition = { steps: Step[] };
type FileDefinition = {
  [functionName: string]: FunctionDefinition;
};
type Book = {
  [fileName: string]: FileDefinition;
};
type Props = {
  content: Book;
};

const View: FC<Props> = ({ content }) => {
  const fileNames = Object.keys(content);
  return (
    <div>
      {fileNames.map((fileName, index) => (
        <FileDesc key={index} fileName={fileName} def={content[fileName]} />
      ))}
    </div>
  );
};

const FileDesc: FC<{ fileName: string; def: FileDefinition }> = ({
  fileName,
  def,
}) => {
  const functionNames = Object.keys(def);
  return (
    <div style={{ paddingLeft: 10 }}>
      {fileName}
      <div>
        {functionNames.map((funcName) => (
          <FuncDesc key={funcName} funcName={funcName} def={def[funcName]} />
        ))}
      </div>
    </div>
  );
};

const FuncDesc: FC<{ funcName: string; def: FunctionDefinition }> = ({
  funcName,
  def,
}) => {
  return (
    <div style={{ paddingLeft: 10 }}>
      {funcName}
      <div style={{ paddingLeft: 10 }}>
        {def.steps.map((step, index) => (
          <StepDesc key={index} step={step} />
        ))}
      </div>
    </div>
  );
};

const StepDesc: FC<{ step: Step }> = ({ step }) => {
  if (step.external) {
    return (
      <div>
        <a href="#">{step.description}</a>
      </div>
    );
  } else {
    return <div>{step.description}</div>;
  }
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
