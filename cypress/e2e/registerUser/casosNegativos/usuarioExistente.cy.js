class MensajeError {

    get errorMessage() {
        return cy.get('[data-cy="error-message"]')
    }

}

describe('Registro de Usuario - Intentar registrar un usuario ya existente', () => {
    const error = new MensajeError();
       beforeEach(() => {
        cy.intercept('GET', 'api/backend/auth/session', {
            statusCode: 200,
            body: {}
        }).as('getSession');

        cy.visit('https://ticketazo.com.ar/auth/registerUser');
        cy.wait('@getSession');
    });

    //Puse los datos de usuario que utilice en registroPositivo.cy.js
    //para verificar que el sistema no me permita registrarme nuevamente con los mismos datos
    //y me muestre el mensaje de error correspondiente.
     it('Error al ingresar datos de un usuario ya existente', 
        () => {
        cy.get('[data-cy="input-nombres"]').click().type('María Eugenia');
        cy.get('[data-cy="input-apellido"]').click().type('Muñoz');
        cy.get('[data-cy="input-telefono"]').click().type('2392565656');
        cy.get('[data-cy="input-dni"]').click().type('39000111');
        cy.get('[data-cy="select-provincia"]').click().type('Buenos Aires{enter}');
        cy.get('[data-cy="select-localidad"]').click().type('Trenque Lauquen{enter}');
        cy.get('[data-type="day"]').click().type('30{enter}');
        cy.get('[data-type="month"]').click().type('12{enter}');
        cy.get('[data-type="year"]').click().type('1996{enter}');
        cy.get('[data-cy="input-email"]').click().type('eugemunoz15@gmail.com');
        cy.get('[data-cy="input-confirmar-email"]').click().type('eugemunoz15@gmail.com');
        cy.get('[data-cy="input-password"]').click().type('Pass-1234');
        cy.get('[data-cy="input-repetir-password"]').click().type('Pass-1234');
        cy.get('[data-cy="btn-registrarse"]').click();
        error.errorMessage.should('be.visible');
        error.errorMessage.should('contain', 'Ya existe un usuario registrado con ese correo electrónico'); 
    })
});