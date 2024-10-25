import {jest} from '@jest/globals'
import { getAllCourses } from '../controllers/courses.controller.js'
import Course from '../models/course.model.js'

jest.mock('../models/course.model.js');
// describe('getAllCourses', () => {
//   let req, res;

//   beforeEach(() => {
//     req = {};
//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//   });

//   const mockCours = [
//     {name: "Cours-A", content: "kkkkkkk", category: "aaaa", price: 100, picture: "www", review:[]},
//     {name: "Cours-B", content: "kkkkkkk", category: "aaaa", price: 100, picture: "www", review:[]}
//   ];


//   it("should return a list of courses", async () => {
//     jest.spyOn(Course,"find").mockResolvedValue(mockCours);
//     await getAllCourses(req, res);
//     expect(Course.find).toHaveBeenCalledTimes(1);
//     expect(res.json).toHaveBeenCalledWith(mockCours);
//   });
  
//

// describe("getAllCourses", () => {
//   it("should return all courses", async () => {
//     const res = await request(app).get("/api/course/");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("all courses");
//   });
// });

// describe("POST /api/products", () => {
//   it("should create a product", async () => {
//     const res = await request(app).post("/api/products").send({
//       name: "Product 2",
//       price: 1009,
//       description: "Description 2",
//     });
//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("Product 2");
//   });
// });

// describe("PUT /api/products/:id", () => {
//   it("should update a product", async () => {
//     const res = await request(app)
//       .patch("/api/products/6331abc9e9ececcc2d449e44")
//       .send({
//         name: "Product 4",
//         price: 104,
//         description: "Description 4",
//       });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.price).toBe(104);
//   });
// });

// describe("DELETE /api/products/:id", () => {
//   it("should delete a product", async () => {
//     const res = await request(app).delete(
//       "/api/products/6331abc9e9ececcc2d449e44"
//     );
//     expect(res.statusCode).toBe(200);
//   });
//
import request from 'supertest';
import mockingoose from 'mockingoose';
import { app, User } from './app';

describe("GET /users", () => {
  it("should return all users", async () => {
    const users = [
      {
        _id: "507f191e810c19729de860ea",
        name: "John Doe",
        email: "john@example.com",
      },
      {
        _id: "507f191e810c19729de860eb",
        name: "Jane Doe",
        email: "jane@example.com",
      },
    ];

    mockingoose(User).toReturn(users, "find");

    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });
});