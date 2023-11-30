const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyIsIkd1aWQiOiJzdHJpbmciLCJqdGkiOiIxMWExNzNkZC1lZDY0LTQxYTctODAwNS0xNmQ4NDAwODc1ZGEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVXNlciIsIlVzZXIiLCJVc2VyIl0sImV4cCI6MjA3OTk2MTg1OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA4MCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MyJ9.DMLQqI1lqGtmbweFzjunFCBWbxSIKajqqKZ7DHkbRAQ";
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.window().then((window) => {
      window.localStorage.setItem('JWT-Auth', jwtToken);
    });
    Cypress.on('uncaught:exception', (err, runnable) => { return false; })
    cy.intercept({method: 'POST',url: 'https://localhost:7080/game/join',},{ guid: "GUID" } ).as('joinGame')
    cy.get("#PlayGameButton").click();
    cy.intercept({method: 'GET',url: 'https://localhost:7080/game/GUID/get/2/color',},{ color: "white" } ).as('getColor')
    it('create new transaction', () => {
      // Extend test with Cypress Studio
    })
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[style="transform: translate(294.857px, 442.286px);"]').click();
    /* ==== End Cypress Studio ==== */
  })
})