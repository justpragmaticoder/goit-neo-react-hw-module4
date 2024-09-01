import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.css";

const LOADER_COLOR = '#465df3';
const LOADER_HEIGHT = 80;
const LOADER_WIDTH = 80;

const Loader = () => {
  return (
    <ThreeDots
      color={LOADER_COLOR}
      height={LOADER_HEIGHT}
      width={LOADER_WIDTH}
      wrapperClass={styles.loaderWrapper}
    />
  );
};

export default Loader;
