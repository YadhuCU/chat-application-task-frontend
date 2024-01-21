import { Sidebar } from "../components/Sidebar";
import { MessageArea } from "../components/MessageArea";

export const Home = () => {
  return (
    <div className="container overflow-hidden grid md:grid-cols-[1fr,2fr] md:container-lg p-1 md:p-5 gap-1">
      <Sidebar />
      <MessageArea />
    </div>
  );
};
