// import { jest } from "@jest/globals"; // On a besoin de jest
// import { findUser } from "../src/controllers/users.controller"; // On a besoin de la fonction qu'on va tester
// import User from "../src/models/user.model.js"; // On a besoin du modèle utilisateur pour prendre le controle de User.findById

// // Simule l'objet requete de express, ne change pas pour les tests sur findUser, mais pensez à changer la requete pour d'autre
// const reqSimulee = () => {
//   return { params: { id: 1 } };
// }; // findUser a besoin d'un req.params.id = chiffre
// const req = reqSimulee();

// // Simule l'objet reponse de express, ne change pas pour la pluspart des tests
// const resSimulee = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };
// const res = resSimulee();

// // Simulation d'un utilisateur, il pourra être réutilisé dans les tests
// const utilisateurSimule = {
//   login: "blablabla",
//   password: "ldkfjfkdghjkdfghdjkk",
// };
// test("cas utilisateur existe, ce test doit vérifier qu'on renvoie bien statut 200 avec l'objet utilisateur en json", async () => {
//   // Simulation du retour de la fonction bdd findById
//   User.findById = jest.fn(); // Jest prend le contrôle de la fonction
//   User.findById.mockImplementation(() => {
//     return utilisateurSimule;
//   }); // Demande de renvoyer utilisateurSimule

//   await findUser(req, res); // On lance la fonction

//   // Tests
//   expect(User.findById).toHaveBeenCalledTimes(1); // On test si la foncton bdd a bien été appellée une fois
//   expect(res.status).toHaveBeenCalledWith(200); // On test si tout se termine par un status 200
//   expect(res.json).toHaveBeenCalledWith(utilisateurSimule); // On test si response.json est appellé avec l'utilisateur trouvé
// });

import { jest } from "@jest/globals"; // Jest для тестирования
import {
  login,
  register,
  getAllUsers,
  getByIdUser,
  updateByIdUser,
  deleteByIdUser,
  getCurrenctUser,
  findUser,
} from "../src/controllers/users.controller"; // Контроллер
import User from "../src/models/user.model.js"; // Модель пользователя для mock-функций
import bcrypt from "bcrypt"; // Библиотека для хеширования паролей

// Мокируем объект запроса
const reqSimulee = (body = {}, params = {}, user = {}) => {
  return { body, params, user };
};

// Мокируем объект ответа
const resSimulee = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe("Users Controller", () => {
  // Тест для функции login
  // test("login - should return user data and token when credentials are correct", async () => {
  //   const req = reqSimulee({
  //     email: "test@example.com",
  //     password: "password123",
  //   });
  //   const res = resSimulee();

  //   // Мокируем данные пользователя
  //   const mockUser = {
  //     _id: "123",
  //     email: "test@example.com",
  //     password: "$2b$10$...",
  //   }; // $2b$10$... - это хеш пароля
  //   User.findOne = jest.fn().mockResolvedValue(mockUser);
  //   bcrypt.compare = jest.fn().mockResolvedValue(true); // Мокируем bcrypt для сравнения пароля
  //   jwt.sign = jest.fn().mockReturnValue("mockToken");

  //   await login(req, res);

  //   expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
  //   expect(bcrypt.compare).toHaveBeenCalledWith(
  //     "password123",
  //     mockUser.password
  //   );
  //   expect(jwt.sign).toHaveBeenCalledWith(
  //     { id: mockUser._id, isAdmin: mockUser.isAdmin },
  //     process.env.token,
  //     { expiresIn: "24h" }
  //   );
  //   expect(res.cookie).toHaveBeenCalledWith("access_token", "mockToken", {
  //     httpOnly: true,
  //   });
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith(
  //     expect.objectContaining({ email: "test@example.com" })
  //   );
  // });

  // Тест для функции register
  test("register - should create user with hashed password", async () => {
    const req = reqSimulee({
      email: "newuser@example.com",
      password: "newpassword",
    });
    const res = resSimulee();

    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    User.create = jest.fn().mockResolvedValue({});

    await register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
    expect(User.create).toHaveBeenCalledWith({
      email: "newuser@example.com",
      password: "hashedPassword",
      isAdmin: false,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("User has been created!");
  });

  // Тест для функции getAllUsers
  test("getAllUsers - should return list of users", async () => {
    const req = reqSimulee();
    const res = resSimulee();

    const mockUsers = [
      { _id: "1", email: "user1@example.com" },
      { _id: "2", email: "user2@example.com" },
    ];
    User.find = jest.fn().mockResolvedValue(mockUsers);

    await getAllUsers(req, res);

    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // Тест для функции getByIdUser
  // test("getByIdUser - should return user by ID", async () => {
  //   const req = reqSimulee({ id: "123" });
  //   const res = resSimulee();

  //   const mockUser = { _id: "123", email: "test@example.com" };
  //   User.findById = jest.fn().mockResolvedValue(mockUser);

  //   await getByIdUser(req, res);

  //   expect(User.findById).toHaveBeenCalledWith("123");
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith(mockUser);
  // });

  // // Тест для функции updateByIdUser
  // test("updateByIdUser - should update user by ID", async () => {
  //   const req = reqSimulee({ id: "123", email: "updated@example.com" });
  //   const res = resSimulee();

  //   const mockUser = { _id: "123", email: "updated@example.com" };
  //   User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

  //   await updateByIdUser(req, res);

  //   expect(User.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, {
  //     new: true,
  //   });
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: "user updated",
  //     updateUser: mockUser,
  //   });
  // });

  // // Тест для функции deleteByIdUser
  // test("deleteByIdUser - should delete user by ID", async () => {
  //   const req = reqSimulee({ id: "123" });
  //   const res = resSimulee();

  //   User.findByIdAndDelete = jest.fn().mockResolvedValue({});

  //   await deleteByIdUser(req, res);

  //   expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
  // });

  // Тест для функции getCurrenctUser
  test("getCurrenctUser - should return current logged-in user", async () => {
    const req = reqSimulee({}, {}, { id: "123" });
    const res = resSimulee();

    const mockUser = { _id: "123", email: "currentuser@example.com" };
    User.findById = jest.fn().mockResolvedValue(mockUser);

    await getCurrenctUser(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  // Тест для функции findUser
  // test("findUser - should return user if found", async () => {
  //   const req = reqSimulee({ id: "123" });
  //   const res = resSimulee();

  //   const mockUser = { _id: "123", email: "founduser@example.com" };
  //   User.findById = jest.fn().mockResolvedValue(mockUser);

  //   await findUser(req, res);

  //   expect(User.findById).toHaveBeenCalledWith("123");
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith(mockUser);
  // });

  // test("findUser - should return 404 if user not found", async () => {
  //   const req = reqSimulee({ id: "123" });
  //   const res = resSimulee();

  //   User.findById = jest.fn().mockResolvedValue(null);

  //   await findUser(req, res);

  //   expect(User.findById).toHaveBeenCalledWith("123");
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur non trouvé" });
  // });
});


