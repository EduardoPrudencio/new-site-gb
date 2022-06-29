
// O link de signin deve conter todos os parâmetros de querystring da tela de signup

const JWT = require('jsonwebtoken')

const requestResponse = {
   id: '',
   nickname: '',
   customer_uuid: '',
   site_id: '',
   phone: '',
   ddd: '',

   subscription: {
      id: '',
      isFree: true,
      expired: false,
      has_access: true,
      status: 'active',
      label: 'Gratuito',
      checkout_type: ''
   },              
}
const resp = JWT.sign(requestResponse, 'hjukilouuyyttrfeeswss', {
   expiresIn: 604800
 })


describe('Sign up UI', () =>{
       
    it('With campaign in querystring, should create cookie with value and to redirect user', ()=> {
       
         cy.intercept("POST", "**v2/customers", (req) =>{
            req.reply({
               headers: {},
               statusCode: 200,
               body: resp                 
            })   
         });

        cy.visit('/signup?campaign=teste') 
        cy.get('[data-cy=nickname]').type('nickname')
        cy.get('[data-cy=email]').type('johndoe@test.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=chk-terms]').click()
        cy.get('[data-cy=cadastrar]').click()
         
        cy.getCookie('campaign').should('have.property', 'value', 'teste')
        //cy.url().should('match', /credit-card/)
     })

     it('All parameters must be passed to the signin screen', ()=> {
       
         cy.visit('/signup?campaign=bemo-1234')   
         cy.contains('Faça login').click()  
         cy.url().should('include', '/signin?campaign=bemo-1234') 
      })

     it('Without campaign value in querystring, should create cookie without value and to redirect user', ()=> {
       
         cy.intercept("POST", "**v2/customers", (req)=>{
            req.reply({
               headers: {},
               statusCode: 200,
               body: resp   
            })   
         });

        cy.visit('/signup?campaign=') 
        cy.get('[data-cy=nickname]').type('nickname')
        cy.get('[data-cy=email]').type('johndoe@test.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=chk-terms]').click()
        cy.get('[data-cy=cadastrar]').click() 
         
        cy.getCookie('campaign').should('have.property', 'value', '')
        //cy.url().should('match', /credit-card/)
     })

     it('Without campaign in querystring, should create cookie without  value and to redirect user', ()=> {
       
         cy.intercept("POST", "**v2/customers", (req)=>{
            req.reply({
               headers: {},
               statusCode: 200,
               body: resp    
            })   
         });

        cy.visit('/signup') 
        cy.get('[data-cy=nickname]').type('nickname')
        cy.get('[data-cy=email]').type('johndoe@test.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=chk-terms]').click()
        cy.get('[data-cy=cadastrar]').click() 
         
        cy.getCookie('campaign').should('have.property', 'value', '')
        //cy.url().should('match', /credit-card/)
     })

     it('Should open the term of use on another page', ()=> {
      cy.visit('/signup') 
      cy.contains("a", "Termos de Uso") 
      .scrollIntoView()
      .should($a => {
        const message = $a.parent().parent().text();
        expect($a, message).to.have.attr("href", "https://www.bebanca.app/termos-de-uso/");
      })
      .should($a => {
         const message = $a.parent().parent().text();
         expect($a, message).to.have.attr("target", "_blank");
       });
     })

     it('If is with voucher', ()=> { 

      cy.intercept("POST", "**v2/customers", (req)=>{
         req.reply({
            headers: {},
            statusCode: 200,
            body: resp    
         })   
      }).as('signup');

      cy.visit('/signup/voucher/?code=vouchertestvaue'); 

        cy.get('[data-cy=nickname]').type('nickname')
        cy.get('[data-cy=email]').type('johndoe@test.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('[data-cy=chk-terms]').click()
        cy.get('[data-cy=cadastrar]').click() 
        cy.get('[data-cy=voucher]').should('have.value', 'vouchertestvaue');

      //   cy.wait('@signup')
      //     .its('request.body.voucher')
      //     .should('include','vouchertestvaue')

     })
})