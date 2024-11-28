import { jest } from "@jest/globals"; // On a besoin de jest
import { findUser } from "../src/controllers/users.controller"; // On a besoin de la fonction qu'on va tester
import User from "../src/models/user.model.js"; // On a besoin du modèle utilisateur pour prendre le controle de User.findById

// Simule l'objet requete de express, ne change pas pour les tests sur findUser, mais pensez à changer la requete pour d'autre
const reqSimulee = () => {
  return { params: { id: 1 } };
}; // findUser a besoin d'un req.params.id = chiffre
const req = reqSimulee();

// Simule l'objet reponse de express, ne change pas pour la pluspart des tests
const resSimulee = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const res = resSimulee();

// Simulation d'un utilisateur, il pourra être réutilisé dans les tests
const utilisateurSimule = {
  login: "blablabla",
  password: "ldkfjfkdghjkdfghdjkk",
};
test("cas utilisateur existe, ce test doit vérifier qu'on renvoie bien statut 200 avec l'objet utilisateur en json", async () => {
  // Simulation du retour de la fonction bdd findById
  User.findById = jest.fn(); // Jest prend le contrôle de la fonction
  User.findById.mockImplementation(() => {
    return utilisateurSimule;
  }); // Demande de renvoyer utilisateurSimule

  await findUser(req, res); // On lance la fonction

  // Tests
  expect(User.findById).toHaveBeenCalledTimes(1); // On test si la foncton bdd a bien été appellée une fois
  expect(res.status).toHaveBeenCalledWith(200); // On test si tout se termine par un status 200
  expect(res.json).toHaveBeenCalledWith(utilisateurSimule); // On test si response.json est appellé avec l'utilisateur trouvé
});