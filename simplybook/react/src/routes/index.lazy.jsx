import { createLazyFileRoute } from "@tanstack/react-router";
import Header from "../components/Common/Header.jsx";
import Progress from "../components/Dashboard/Progress";
import Bookings from "../components/Dashboard/Bookings";
import Management from "../components/Dashboard/Management";
import TipsTricks from "../components/Dashboard/TipsTricks";
import OurPlugins from "../components/Dashboard/OurPlugins";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-screen-2xl w-full">
        <div className="mx-auto my-4 grid min-h-full w-full grid-cols-12 gap-5">
          <Progress />
          <Bookings />
          <Management />
          <TipsTricks />
          <OurPlugins />
        </div>
      </div>
    </>
  );
}