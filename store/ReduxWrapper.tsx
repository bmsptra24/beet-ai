import { Provider } from "react-redux";
import store from "@/store/store";

const ReduxWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
