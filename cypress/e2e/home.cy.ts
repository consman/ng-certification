describe("Test the Ng-Certification Weather App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Shows the title on the home page.",()=>{
    cy.title().should("eq","ng-certification app is running!");
  });

  it("Have title in the first box of Add a location",()=>{
    cy.get("[data-test='addLocationBoxTitle']").should("include.text","Enter a zipcode:");
  });

  it("searches for a location",()=>{
    cy.get("[data-test='locationField']").type("55121");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Saint Paul");
  });

  it("should close the result",()=>{
    cy.get("[data-test='locationField']").type("55121");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Saint Paul");
    cy.get("[data-test='closeSearchResult']").click();
    cy.get("[data-test='searchResultTitle']").should("not.exist");
  });

  it("should provide the 5-day forecast ",()=>{
    cy.get("[data-test='locationField']").type("55121");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Saint Paul");
    cy.get("[data-test='fiveDayForecastLink']").click();
    cy.get("[data-test='tdForecastItem']").eq(4).should("include.text","day");
  });

  it("should take you back to the main page from the 5-day forecast ",()=>{
    cy.get("[data-test='locationField']").type("55121");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Saint Paul");
    cy.get("[data-test='fiveDayForecastLink']").click();
    cy.wait(300);
    cy.get("[data-test='backToMainPageButton']").click();
    cy.get("[data-test='addLocationBoxTitle']").should("include.text","Enter a zipcode");
    cy.get("[data-test='searchResultTitle']").eq(0).should("include.text","Saint Paul");

  });

  it("should consume a zipcode that was previously closed", ()=>{

    cy.get("[data-test='locationField']").type("95630");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Folsom");
    
    cy.get("[data-test='locationField']").type("30097");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Duluth");

    cy.get("[data-test='locationField']").type("95742");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Rancho Cordova");

    cy.get("[data-test='closeSearchResult']").eq(1).click();
    cy.get("[data-test='searchResultTitle']").eq(2).should("not.exist");
    cy.get("[data-test='searchResultTitle']").eq(1).should("include.text","Rancho Cordova");

    cy.get("[data-test='locationField']").type("30097");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").eq(2).should("include.text","Duluth");

  });

  it("should provide a separate alert if the zip code is INVALID ( other than just 5 numerics )", ()=>{

    const stub = cy.stub()  
    cy.on ('window:alert', stub)

    cy.get("[data-test='locationField']").type("8888O");
    cy.get("[data-test='searchButton']").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Unable to find any weather data for 8888O. Please try a different zip code. ')      
    });
  });


  it("should provide a separate alert if the zip code is valid ( only 5 numerics ), but the service simply returns no data", ()=>{

    const stub = cy.stub()  
    cy.on ('window:alert', stub)

    cy.get("[data-test='locationField']").type("88888");
    cy.get("[data-test='searchButton']").click().wait(2000)
    .then(() => {    
      expect(stub.getCall(0)).to.be.calledWith('The zip code, 88888, is formatted OK, but no data is returned.');            
    });
    
  });
  
  it("should provide a separate alert if the zip code's location is already in the search results.", ()=>{

    const stub = cy.stub()  
    cy.on ('window:alert', stub)

    cy.get("[data-test='locationField']").type("95742");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Rancho Cordova");

    cy.get("[data-test='locationField']").type("95630");
    cy.get("[data-test='searchButton']").click();
    cy.get("[data-test='searchResultTitle']").should("include.text","Folsom");

    cy.get("[data-test='locationField']").type("95742");
    cy.get("[data-test='searchButton']").click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('The zip code of 95742 is already in the list. ')      
      });
  });

})
