import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server.js"; // Импортируем app

// Мок данных
const mockCourse = {
  title: "Test Course",
  description: "This is a test course",
  price: 100,
  category: "Test Category",
};

let courseId;

describe("Course Controller", () => {
  beforeAll(async () => {
    // Подключение к тестовой базе данных
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Отключение базы данных
    await mongoose.connection.close();
  });

  describe("POST /api/course", () => {
    it("should create a new course", async () => {
      const res = await request(app)
        .post("/api/course")
        .field("title", mockCourse.title)
        .field("description", mockCourse.description)
        .field("price", mockCourse.price)
        .attach("file", Buffer.from("mockPicture"), "test.jpg");

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("title", mockCourse.title);
      courseId = res.body._id; // Сохраняем ID курса для следующих тестов
    });
  });

  describe("GET /api/course", () => {
    it("should return all courses", async () => {
      const res = await request(app).get("/api/course");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/course/:id", () => {
    it("should return a course by ID", async () => {
      const res = await request(app).get(`/api/course/${courseId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", mockCourse.title);
    });

    it("should return 500 if course not found", async () => {
      const res = await request(app).get(`/api/course/invalidId`);

      expect(res.status).toBe(500);
    });
  });

  describe("PUT /api/course/:id", () => {
    it("should update a course by ID", async () => {
      const updatedData = { title: "Updated Course" };
      const res = await request(app)
        .put(`/api/course/${courseId}`)
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", updatedData.title);
    });

    it("should return 500 if course not found", async () => {
      const res = await request(app).put(`/api/course/invalidId`).send();

      expect(res.status).toBe(500);
    });
  });

  describe("DELETE /api/course/:id", () => {
    it("should delete a course by ID", async () => {
      const res = await request(app).delete(`/api/course/${courseId}`);

      expect(res.status).toBe(200);
      expect(res.text).toBe("Course deleted !");
    });

    it("should return 500 if course not found", async () => {
      const res = await request(app).delete(`/api/course/invalidId`);

      expect(res.status).toBe(500);
    });
  });
});
