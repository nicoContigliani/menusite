// cypress/e2e/home.cy.ts
describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    // Prueba del Header
    describe('Header', () => {
      it('should render header with logo', () => {
        cy.get('header').should('exist')
        cy.get('header img[alt="Flama"]').should('be.visible')
      })
    })
  
    // Prueba del Hero
    describe('Hero Section', () => {
      it('should display hero content correctly', () => {
        cy.get('h1').contains('Nuevas experiencias digitales')
        cy.get('p').contains('Ovación constante, soluciones excepcionales')
      })
  
      it('should have working navigation buttons', () => {
        cy.get('button').contains('Get Started').should('exist')
        cy.get('button').contains('Learn More').should('exist')
      })
  
      it('should have correct redirections', () => {
        cy.get('a[href="/products"]').should('exist')
        cy.get('a[href="/moreinfo"]').should('exist')
      })
  
      it('should display hero media content', () => {
        cy.get('img[alt="Flama"]').should('be.visible')
        cy.get('video').should('exist')
      })
    })
  
    // Prueba de Features
    describe('Features Section', () => {
      it('should render features section', () => {
        cy.get('section').contains('Features').should('exist')
      })
    })
  
    // Prueba del formulario de contacto
    describe('Contact Section', () => {
      it('should render contact form', () => {
        cy.get('section').contains('Contact').should('exist')
      })
    })
  
    // Pruebas de autenticación
    describe('Authentication', () => {
      describe('Login Form', () => {
        it('should render login form', () => {
          cy.get('form').should('exist')
        })
  
        it('should handle login submission', () => {
          // Interceptar la llamada a la API
          cy.intercept('POST', '/api/loginuser').as('loginRequest')
  
          // Rellenar el formulario
          cy.get('input[type="email"]').type('nico.contigliani@gmail.com')
          cy.get('input[type="password"]').type('Jesus6388')
          
          // Enviar el formulario
          cy.get('button[type="submit"]').click()
  
          // Verificar que la llamada a la API se realizó correctamente
          cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            email: 'nico.contigliani@gmail.com',
            password: 'Jesus6388'
          })
        })
      })
  
      describe('Register Form', () => {
        it('should render register form', () => {
          cy.get('form').should('exist')
        })
  
        // Añade aquí las pruebas específicas para el registro
      })
    })
  
    // Prueba de conexión MongoDB
    describe('MongoDB Connection', () => {
      it('should verify database connection', () => {
        // Interceptar la verificación de conexión
        cy.intercept('**/api/verify-connection').as('verifyConnection')
        
        cy.get('button').contains('prueba de conexión').click()
        
        cy.wait('@verifyConnection').then((interception) => {
          expect(interception.response.statusCode).to.equal(200)
        })
      })
    })
  })