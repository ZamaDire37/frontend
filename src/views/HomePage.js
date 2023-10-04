

function HomePage() {
  return (
    <div className="wrapper">
      <div className="top">
        
      </div>
      <div className="inputCentre">
        <div id="welcome">
          Dinstang ka Weather?
        </div>
        <div id="instructions">
          Enter a South African zipcode to view the weather for a certain area. <br></br> Group members: Kagiso Kgobane, Steven Ayensu, Simphiwe Nkgau, Omphemetde Dire, Khumo Olifant
        </div>
        <div className="dataCapture">
          <form id="zipCapture" action="zipPost" method="post">
            <div>
              <input type="text" id="zip" name="zip" required/>
            </div>
            <div id="unitRadio">
              <div className="unitRadioButtons">
                <input type="radio" id="metric" name="unit" value="metric" defaultChecked/>
                <label htmlFor="metric">Celcius</label>
              </div>
              <div className="unitRadioButtons">
                <input type="radio" id="imperial" name="unit" value="imperial" defaultChecked/>
                <label htmlFor="imperial">Fahrenheit</label>
              </div>
            </div>
            <div>
              <button id="zipSubmit" type="submit">View Corresponding Weather</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;