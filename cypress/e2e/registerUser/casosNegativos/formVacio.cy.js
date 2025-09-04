describe('Registro de Usuario - Enviar el formulario Vacío', () => {

    beforeEach(() => {
        cy.intercept('GET', 'api/backend/auth/session', {
            statusCode: 200,
            body: {}
        }).as('getSession');

        cy.visit('https://ticketazo.com.ar/auth/registerUser');
        cy.wait('@getSession');
    });

    it('No debería enviar un formulario vacío y debe mostrar mensaje de error en todos los campos', 
        () => {
        // Haz clic en el botón de registro sin llenar los campos
        cy.get('[data-cy="btn-registrarse"]').click();

        // **Aserciones para validar los errores**
        cy.get('[data-slot="error-message"]')
            .should('be.visible')
            .and('have.length', 11) // Asegúrate de que haya 11 mensajes de error por los 11 campos obligatorios
            .and('contain', 'Completa este campo');
    });
});