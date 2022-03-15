describe('burger constructor app', () => {
    before(() => {
        cy.visit('/')
    })

    it('should drag bun to the order', () => {
        cy.get('#card_60d3b41abdacab0026a733c7').trigger('dragstart');
        cy.get('#constructor').trigger('drop');
    })

    it('should drag ingredient to the order', () => {
        cy.get('#card_60d3b41abdacab0026a733c9').trigger('dragstart');
        cy.get('#constructor').trigger('drop')
    })

    it('opening a modal window with a description of the ingredient / displaying ingredient data in modal window / closing modal windows when the close button is clicked', () => {
            cy.get('#link_60d3b41abdacab0026a733cd').click();
            cy.contains('Детали ингредиента');
            cy.contains('Соус фирменный Space Sauce');
            cy.contains('Калории');
            cy.contains('Белки');
            cy.contains('Жиры');
            cy.contains('Углеводы');
            cy.get('#closeBtn').click();
    })

    it('opening a modal window with order data when clicking on the "Place an order" button', () => {
        cy.get('button').contains('Оформить заказ').click();
        
        cy.get("[type='email']").type('test.burger.project@mail.ru');
        cy.get("[type='password']").type('Qwerty123');
        cy.get("button").contains('Войти').click();
    })

    it('retry opening a modal window with order data when clicking on the "Place an order" button', () => {
        cy.get("[name='buttonOrder']").contains('Оформить заказ').click();
        
        cy.intercept({
            method: 'POST',
            url: 'https://norma.nomoreparties.space/api/orders',
        }).as('dataOrder');

        cy.wait('@dataOrder').then(() => {
                cy.contains('идентификатор заказа');
                cy.contains('Ваш заказ начали готовить');
                cy.get('#closeBtn').click();
            }
        );
            
    })
})           