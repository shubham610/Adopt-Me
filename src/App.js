const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, { animal: "Dog", name: "Zoey", breed: "Husky" }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Tommy",
      breed: "Golden Retreiver",
    }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Tiger",
      breed: "Labrador",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
