import {jest} from '@jest/globals'
import { getAllCourses } from '../controllers/courses.controller.js'
import Course from '../models/course.model.js'

jest.mock('../models/course.model.js');
describe('getAllCourses', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  const mockCours = [
    {name: "Cours-A", content: "kkkkkkk", category: "aaaa", price: 100, picture: "www", review:[]},
    {name: "Cours-B", content: "kkkkkkk", category: "aaaa", price: 100, picture: "www", review:[]}    
  ];


  it("should return a list of courses", async () => {
    jest.spyOn(Course,"find").mockResolvedValue(mockCours);
    await getAllCourses(req, res);
    expect(Course.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockCours);
  });
  
});