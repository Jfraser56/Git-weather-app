export class UI {
  contructor() {}

  toggleSearch(container) {
    container.classList.toggle("search-state");
  }

  buttonState0(button) {
    button.innerText = "Change Location";
    button.id = "state0";
  }
  buttonState1(button, container) {
    container.className = "container search-state ";
    button.innerText = "Cancel";
    button.id = "state1";
  }
  buttonState2(button) {
    button.innerText = "Submit";
    button.id = "state2";
  }

  //Painting UI with Weather INFO ------------
  insertLocation(location, city) {
    location.textContent = city;
  }

  async insertDesc(description, descValue) {
    const result = await descValue;
    description.innerText = await result;

    // descValue.then((res) => (description.innerText = res));
  }

  async insertTemp(temperature, tempValue) {
    const result = await tempValue;
    temperature.textContent = await `${result} F`;
  }

  insertIcon(container, icon) {
    const iconElement = container.firstElementChild;
    let iconType;
    const options = ["Snow", "Rain", "Clouds", "Clear", "Mist"];
    iconType = icon
      .then((res) => options.indexOf(res))
      .then((index) => {
        switch (index) {
          case 0:
            return (iconType = "far fa-snowflake fa-2x");
          case 1:
            return (iconType = "fas fa-cloud-showers-heavy fa-2x");
          case 2:
            return (iconType = "fas fa-cloud fa-2x");
          case 3:
            return (iconType = "fas fa-sun fa-2x");
          case 4:
            return (iconType = "fas fa-wind fa-2x");
        }
      })
      .then((icon) => (iconElement.className = icon));
  }

  insertWind(container, windValue) {
    const { windDirection } = windValue;
    const { windSpeed } = windValue;

    windDirection
      .then((res) => (container.textContent = `Wind: ${res} @ `))
      .then(() =>
        windSpeed.then((res) => (container.textContent += `${res}mph`))
      );
  }

  insertInfo(container, info, message, value) {
    info.then((res) => (container.textContent = `${message}: ${res}${value}`));
  }
}
