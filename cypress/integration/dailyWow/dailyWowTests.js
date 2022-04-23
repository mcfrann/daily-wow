/// <reference types="cypress" />

describe('Your Daily Wow', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://owen-wilson-wow-api.herokuapp.com/wows/random',
      {
        response: 200,
        fixture: 'randomWow.json'
      }
    )
      .as('loadRandomLoad')
      .intercept(
        'GET',
        'https://owen-wilson-wow-api.herokuapp.com/wows/ordered/0-90',
        {
          response: 200,
          fixture: 'allWows.json'
        }
      )
      .as('loadAllWows')
  })

  it('displays Owen Wilson graphic', () => {
    cy.visit('http://localhost:3000/').get('.owen-graphic').should('be.visible')
  })

  it('triggers Owen Wilson graphic/wow audio on click', () => {
    cy.visit('http://localhost:3000/').get('.owen-graphic').click()
  })

  it('shows header for daily wow', () => {
    cy.get('.about-header').contains('Your Daily Wow')
  })

  it('shows random wow', () => {
    cy.get('.about-text')
      .contains('The Internship')
      .contains('Full line: "Wow!"')
      .contains('Click on Owen to hear it!')
  })

  it('has a search bar', () => {
    cy.get('.search')
      .should('be.visible')
      .get('.search-img')
      .should('be.visible')
  })

  it('can search for wows in Owen Wilson movies and play audio', () => {
    cy.get('.search')
      .type('shanghai noon')
      .get('.top')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/filtered')
      .get('.play-wow')
      .click()
  })

  it('can click back to todays wow button and go back home', () => {
    cy.get('.back-home')
      .should('be.visible')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/')
  })

  it('redirects to oops page if movie isnt found', () => {
    cy.get('.search')
      .type('asdf')
      .get('.top')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/oops')
      .get('.oops-text')
      .contains('Wow. This is embarassing.')
  })

  it('can click back to todays wow button and go back home', () => {
    cy.get('.back-home')
      .should('be.visible')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/')
  })
})
