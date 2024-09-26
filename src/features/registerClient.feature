Feature: Registro de Cliente
  Como usuario
  Quiero registrar un nuevo cliente en el sistema
  Para poder gestionar sus ventas

  Scenario: Registrar un cliente con datos válidos
    Given que el formulario de registro de cliente está disponible
    When ingreso los siguientes datos válidos:
      | code | name       | ciNit     | documentType | email               |
      | 4    | Juan Pérez | 12345678  | CI           | juanperez@mail.com  |
    And hago clic en "Registrar"
    Then el cliente es registrado exitosamente
    And recibo un mensaje de confirmación: "Cliente registrado correctamente"

  Scenario: Intentar registrar un cliente con email inválido
    Given que el formulario de registro de cliente está disponible
    When ingreso los siguientes datos con email invalido:
      | code   | name        | ciNit      | documentType | email               |
      | 5      | Maria Lopez | 87654321   | CI           | email-invalido      |
    And hago clic en "Registrar"
    Then recibo un mensaje de error: "El formato del email es inválido"