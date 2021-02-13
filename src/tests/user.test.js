import { authenticateUser, getUserData,signOut, saveBusinessWithUser } from '../DB/users';

  test('login existing user respondes true', () => {

    const user={
      email:"ajorge89@hotmail.com",
      password:"12345678"
    }
    return authenticateUser(user.email, user.password).then(response=>{
      expect(response).toBe(true);

    });
  
  });

  test('login non existing user responds false', () => {

    const user={
      email:"ajorge89@hotmail.com",
      password:"1234567"
    }
    return authenticateUser(user.email, user.password).then(response=>{
      expect(response).toBe(false);

    });
  
  });

  test('singOut  user', () => {

    return signOut().then(response=>{
      expect(response).toBe(true);

    });
  
  });