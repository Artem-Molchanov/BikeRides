import Card from "../../components/Card/Card";

export default function Routes({ allRoutes, allUsers, setCurrentRoute, setTitle }) {
  console.log(allRoutes);
  
    return (
      <div className="routePage">
        <div className="cardAllTrack">
          {allRoutes.map((route, index) => (
            <Card key={index} route={route} allUsers={allUsers} setCurrentRoute={setCurrentRoute} setTitle={setTitle} />
          ))}
        </div>
      </div>
    );
  }
  