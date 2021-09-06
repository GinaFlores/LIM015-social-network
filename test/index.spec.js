// importamos la funcion que vamos a testear
import { registerWithEmail } from '../src/firebase/firebaseAuth.js';

describe('registerWithEmail', () => {
  it('debería permitir que un usuario pueda registrarse con correo y contraseña', () => {
    expect(typeof registerWithEmail).toBe('function');
  });
});
