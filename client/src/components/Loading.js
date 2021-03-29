import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ className }) => {
  return (
    <div className={"flex justify-center items-center " + className}>
      <ClipLoader color="#F59E0B" />
    </div>
  );
};

export default Loading;
