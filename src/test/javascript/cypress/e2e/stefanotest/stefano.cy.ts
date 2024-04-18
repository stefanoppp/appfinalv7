import {
  metricsPageHeadingSelector,
  healthPageHeadingSelector,
  logsPageHeadingSelector,
  configurationPageHeadingSelector,
  swaggerPageSelector,
  swaggerFrameSelector,
  usernameLoginSelector,
  passwordLoginSelector,
  submitLoginSelector,
  adminMenuSelector,
} from '../../support/commands';

describe('Prueba 1: Login manual con checkbox tildado', () => {
  before(() => {
    cy.visit('');
  });
  it('Agregamos credenciales', () => {
    cy.clickOnLoginItem();
    cy.get(usernameLoginSelector).type('admin');
    cy.get(passwordLoginSelector).type('admin');
    cy.get('#rememberMeLabel').click();
    cy.get(submitLoginSelector).click();
  });
});

describe('Prueba 2: Limpia almacenamiento de sesion y comprueba existencia de elemento', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });
  it('Verifica la existencia del titulo ppal', () => {
    cy.visit('');
    cy.get('h1');
  });
});

describe('Prueba 3: Logeo mediante API y revisión de métricas', () => {
  it('Debería enviar los datos de inicio de sesión', () => {
    const datosInicioSesion = {
      username: 'admin',
      password: 'admin',
      rememberMe: true,
    };

    cy.request({
      method: 'POST',
      url: '/api/authenticate',
      body: datosInicioSesion,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      expect(response.status).to.eq(200);
      cy.visit('/admin/metrics');
    });
  });
});
