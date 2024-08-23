import Card from "../../components/Card/Card";

export default function Routes({
  allRoutes,
  allUsers,
  setCurrentRoute,
  setTitle,
  averageScore,
  setAverageScore,
  user,
}) {
  
  let heightRoutePage = '100vh'
  if(allRoutes.length > 2) {
    heightRoutePage = '100%'
  }

  return (
    <div style={{height: heightRoutePage}}>
      <div className="cardAllTrack">
        {allRoutes.map((route, index) => (
          <Card
            key={index}
            route={route}
            allUsers={allUsers}
            setCurrentRoute={setCurrentRoute}
            setTitle={setTitle}
            averageScore={averageScore}
            setAverageScore={setAverageScore}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
