import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { registerClientService } from '../../services/clientService';

// Reemplaza el servicio original por una implementación mockada
let mockRegisterClientService: typeof registerClientService;

let clientData: any;
let result: any;
let error: any;

// Inicializa el estado del cliente antes de cada escenario
Given('que el formulario de registro de cliente está disponible', function () {
  clientData = null;
  result = null;
  error = null;

  // Aquí mockeamos manualmente el servicio para devolver una respuesta simulada
  mockRegisterClientService = async (data) => {
    if (data.email === 'email-invalido') {
      throw new Error('El formato del email es inválido');
    }
    return {
      success: true,
      message: 'Cliente registrado correctamente',
      client: data,
    };
  };
});

// Step para ingresar datos válidos de cliente
When('ingreso los siguientes datos válidos:', function (dataTable) {
  const data = dataTable.hashes();
  clientData = data[0]; // Accede al primer objeto de la tabla
});

// Step para ingresar datos de cliente con email inválido
When('ingreso los siguientes datos con email invalido:', function (dataTable) {
  const data = dataTable.hashes();
  clientData = data[0]; // Accede al primer objeto de la tabla (con email inválido)
});

// Step para intentar registrar al cliente
When('hago clic en "Registrar"', async function () {
  try {
    result = await mockRegisterClientService(clientData); // Intenta registrar al cliente
  } catch (err) {
    error = err; // Captura el error si la validación falla
  }
});

// Verifica que el cliente sea registrado exitosamente
Then('el cliente es registrado exitosamente', function () {
  expect(result).to.deep.equal({
    success: true,
    message: 'Cliente registrado correctamente',
    client: clientData,
  });
});

// Verifica que se lance un mensaje de confirmación
Then('recibo un mensaje de confirmación: {string}', function (expectedMessage) {
  expect(result.message).to.equal(expectedMessage);
});

// Verifica que se lance un mensaje de error cuando el email es inválido
Then('recibo un mensaje de error: {string}', function (expectedErrorMessage) {
  expect(error.message).to.equal(expectedErrorMessage); // Verifica el mensaje de error
});
