const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const operationsRouter = require("../routes/operations");

const app = express();
app.use(bodyParser.json());
app.use("/", operationsRouter);

describe("GET /mean", () => {
	it("should return the mean of the numbers", async () => {
		const res = await request(app).get("/mean?nums=1,2,3,4,5");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("value", 3);
	});

	it("should return 400 if nums is not provided", async () => {
		const res = await request(app).get("/mean");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "nums are required.");
	});

	it("should return 400 if nums contains non-numeric values", async () => {
		const res = await request(app).get("/mean?nums=1,foo,3");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "foo is not a number.");
	});
});

describe("GET /median", () => {
	it("should return the median of the numbers", async () => {
		const res = await request(app).get("/median?nums=1,2,3,4,5");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("value", 3);
	});

	it("should return 400 if nums is not provided", async () => {
		const res = await request(app).get("/median");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "nums are required.");
	});

	it("should return 400 if nums contains non-numeric values", async () => {
		const res = await request(app).get("/median?nums=1,foo,3");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "foo is not a number.");
	});
});

describe("GET /mode", () => {
	it("should return the mode of the numbers", async () => {
		const res = await request(app).get("/mode?nums=1,2,2,3,3,3,4,4,4,4,5");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("value", [4]);
	});

	it("should return 400 if nums is not provided", async () => {
		const res = await request(app).get("/mode");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "nums are required.");
	});

	it("should return 400 if nums contains non-numeric values", async () => {
		const res = await request(app).get("/mode?nums=1,foo,3");
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty("error", "foo is not a number.");
	});
});
