// describe('Pruebas en la página EmpresaPage', () => {
//   beforeEach(() => {




//     // Interceptar la llamada a la API de login
//     cy.intercept('POST', '/api/loginuser').as('loginRequest');

//     // Interceptar la llamada a la API de datos
//     cy.intercept('POST', '/api/readFile').as('fetchData');

//     // Visitar la página
//     cy.visit('/companies/LlakaScript');


//     // Simula almacenamiento en localStorage
//     cy.window().then((win) => {
//       const data: any = {
//         _id: new Object('67adfab7df1c3e1f1a53af56'),
//         email: 'nico.contigliani@gmail.com',
//         fullname: 'Nicolas Contigliani',
//         birthday: '1988-03-06',
//         phone: '+5492612444106',
//         score_user: 0,
//         benefits: false,
//         status_user: true,
//         verigicationCodeMail: false,
//         verigicationCodePhone: false,
//         verigicationCodePattern: false,
//         createAt: "2025-02-13T13:59:19.986Z",
//         updateAt: "2025-02-13T13:59:19.986Z",
//         aud: 'isLogin',
//         verificationCodeMail: true
//       }
//       Object.entries(data).forEach(([key, value]) => {
//         win.localStorage.setItem(key, JSON.stringify(value));
//       });
//     });
//     cy.reload(true);
//   });

//   it('Debe renderizar la página correctamente', () => {
//     cy.get('[data-cy="empresa-page"]').should('exist'); // Verifica que la página cargó
//     cy.get('[data-cy="menu-container"]').should('exist'); // Verifica el menú
//   });

//   it('Debe mostrar el modal de autenticación si el usuario no está logueado', () => {
//     cy.window().then((win) => {
//       win.localStorage.clear(); // Limpia el almacenamiento local para simular que no hay sesión
//     });

//     cy.reload(); // Recarga la página para aplicar cambios

//     //   cy.get('[data-cy="login-modal"]').should('be.visible'); // El modal debe mostrarse
//   });

//   it('Debe cerrar el modal después del inicio de sesión exitoso', () => {
//     cy.window().then((win) => {
//       win.localStorage.clear(); // Asegura que no hay sesión
//     });

//     cy.reload(); // Recarga la página

//     //   cy.get('[data-cy="login-modal"]', { timeout: 7000 }).should('be.visible');

//     // Simula ingreso de usuario y contraseña
//     cy.get('[data-cy="login-container"]').within(() => {
//       cy.get('[data-cy="login-email-input"]').type('nico.contigliani@gmail.com');
//       cy.get('[data-cy="login-password-input"]').type('Jesus6388');
//       cy.get('button[type="submit"]').click(); // Simula clic en el botón de login
//     });



//     // Simula movimiento a la página de empresa
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 1000 });

//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });

//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });

//     });


//     // Simula movimiento a la página de empresa
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });

//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });

//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });

//     });

//     // Simula movimiento a la página de empresa
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .click()
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });
//         cy.reload();
//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .scrollIntoView({ duration: 10000 })
//         .click()
//       cy.wait(1000);

//       cy.get('[data-cy="Pizzas"] > .MenuNew-module__FU1gjq__sectionHeader > h2')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });
//       cy.scrollTo('top');
//       cy.reload();
//     });
//     cy.get('[data-cy="empresa-page-menu"]').within(() => {
//       cy.wait(1000);

//       cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);

//       cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
//         .click()
//         .scrollIntoView({ duration: 1000 });
//       cy.wait(1000);


//       cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
//         .scrollIntoView({ duration: 4000 });
//       cy.scrollTo('top');
//       cy.reload();
//     });

//   });
// });



describe('Prueba de la página EmpresaPage', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/loginuser', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', '/api/readFile', { fixture: 'file.json' }).as('getFile');

    cy.visit('/companies/LlakaScript');
    cy.wait('@getUser');
    cy.wait('@getFile');
  });

  it('Debe renderizar la página correctamente', () => {
    cy.get('[data-cy="empresa-page"]').should('exist');
  });

  it('Debe mostrar el modal de inicio de sesión si no hay sesión activa', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.get('[data-cy="modal-login"]').should('be.visible');
  });

  it('Debe cerrar el modal después del inicio de sesión exitoso', () => {
    cy.window().then((win) => {
      const data: any = {
        _id: '67adfab7df1c3e1f1a53af56',
        email: 'nico.contigliani@gmail.com',
        fullname: 'Nicolas Contigliani',
        birthday: '1988-03-06',
        phone: '+5492612444106',
        score_user: 0,
        benefits: false,
        status_user: true,
        verigicationCodeMail: false,
        verigicationCodePhone: false,
        verigicationCodePattern: false,
        createAt: "2025-02-13T13:59:19.986Z",
        updateAt: "2025-02-13T13:59:19.986Z",
        aud: 'isLogin',
        verificationCodeMail: true
      };

      Object.entries(data).forEach(([key, value]) => {
        win.localStorage.setItem(key, JSON.stringify(value));
      });

      cy.reload();
      cy.get('[data-cy="modal-login"]').should('not.exist');
    });
  });

  function scrollToMenuItems() {
    cy.get('[data-cy="empresa-page-menu"]').within(() => {
      cy.get('[data-cy="Aperitivos-2-Antipasto Misto-image"]')
        .scrollIntoView()
        .should('be.visible');

      cy.get('[data-cy="Pastas-2-Fettuccine Alfredo-image"]')
        .scrollIntoView()
        .should('be.visible');

      cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"] > .MenuNew-module__FU1gjq__itemDetails > h2')
        .scrollIntoView()
        .should('be.visible');
    });
  }

  it('Debe navegar por el menú correctamente', () => {
    scrollToMenuItems();
  });

  it('Debe interactuar con un elemento del menú', () => {
    cy.get('[data-cy="empresa-page-menu"]').within(() => {
      cy.get('[data-cy="Pizzas-3-Pizza Prosciutto e Rucola-menuItem"]').click();
    });
  });

  it('Debe recargar la página y mantener la sesión activa', () => {
    cy.window().then((win) => {
      const data: any = {
        _id: '67adfab7df1c3e1f1a53af56',
        email: 'nico.contigliani@gmail.com',
        fullname: 'Nicolas Contigliani',
        birthday: '1988-03-06',
        phone: '+5492612444106',
        score_user: 0,
        benefits: false,
        status_user: true,
        verigicationCodeMail: false,
        verigicationCodePhone: false,
        verigicationCodePattern: false,
        createAt: "2025-02-13T13:59:19.986Z",
        updateAt: "2025-02-13T13:59:19.986Z",
        aud: 'isLogin',
        verificationCodeMail: true
      };

      Object.entries(data).forEach(([key, value]) => {
        win.localStorage.setItem(key, JSON.stringify(value));
      });
    });
    cy.reload();
    cy.get('[data-cy="empresa-page"]').should('exist');
  });
});
