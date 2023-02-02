describe("Test the Ng-Certification Weather App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Shows the title on the home page.",()=>{
    cy.title().should("eq","ng-certification app is running!");
  });

  it("Have title in the first box of Add a location",()=>{
    cy.get("[data-test='addLocationBoxTitle']").should("include.text","Add a location");
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

    cy.get("[data-test='backToMainPageButton']").click();
    cy.get("[data-test='addLocationBoxTitle']").should("include.text","Add a location");
    cy.get("[data-test='searchResultTitle']").eq(0).should("include.text","Saint Paul");

  });



})
