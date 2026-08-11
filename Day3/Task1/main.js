class Shape {
  static nextId = 1;

  constructor(name, colour) {
    this.id = Shape.nextId++;
    this.name = name;
    this.colour = colour;
  }

  area() {
    throw new Error("area() must be implemented.");
  }

  perimeter() {
    throw new Error("perimeter() must be implemented");
  }

  describe() {
    return `${this.name} (${this.colour})`;
  }

  static compare(a, b) {
    return a.area() >= b.area() ? a : b;
  }
}

class Circle extends Shape {
  constructor(radius, colour = "Black") {
    super("Circle", colour);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  describe() {
    return `${super.describe()}
        Radius: ${this.radius}
        Area: ${this.area().toFixed(2)}
        Perimeter: ${this.perimeter().toFixed(2)}`;
  }
}

class Rectangle extends Shape {
  constructor(width, height, colour = "Black") {
    super("Rectangle", colour);
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }

  describe() {
    return `${super.describe()}
        Width: ${this.width}
        Height: ${this.height}
        Area: ${this.area().toFixed(2)}
        Perimeter: ${this.perimeter().toFixed(2)}`;
  }
}

class Triangle extends Shape {
  constructor(base, height, colour = "Black") {
    super("Triangle", colour);
    this.base = base;
    this.height = height;
  }

  area() {
    return 0.5 * this.base * this.height;
  }

  perimeter() {
    const hypotenuse = Math.sqrt(this.base ** 2 + this.height ** 2);
    return this.base + this.height + hypotenuse;
  }

  describe() {
    return `${super.describe()}
    Base: ${this.base}
    Height: ${this.height}
    Area: ${this.area().toFixed(2)}
    Perimeter: ${this.perimeter().toFixed(2)}`;
  }
}

class ShapeCollection {
  constructor() {
    this.shapes = [];
  }

  add(shape) {
    this.shapes.push(shape);
  }

  removeById(id) {
    this.shapes = this.shapes.filter((shape) => shape.id !== id);
  }

  getByType(type) {
    return this.shapes.filter((shape) => shape instanceof type);
  }

  sortByArea(descending = false) {
    return [...this.shapes].sort((a, b) =>
      descending ? b.area() - a.area() : a.area() - b.area(),
    );
  }

  getTotalArea() {
    return this.shapes.reduce((sum, shape) => sum + shape.area(), 0);
  }
}

const circle = new Circle(5, "Red");
const rectangle = new Rectangle(8, 4, "Blue");
const triangle = new Triangle(6, 8, "Green");

console.log(circle.describe());
console.log();

console.log(rectangle.describe());
console.log();

console.log(triangle.describe());
console.log();

const larger = Shape.compare(circle, rectangle);

console.log("Larger Area:");
console.log(larger.describe());
console.log();

const collection = new ShapeCollection();

collection.add(circle);
collection.add(rectangle);
collection.add(triangle);

console.log("All Shapes: ");
console.table(
  collection.shapes.map((shape) => ({
    id: shape.id,
    type: shape.constructor.name,
    area: shape.area().toFixed(2),
  })),
);

console.log("Total Area:", collection.getTotalArea().toFixed(2));

console.log("\nOnly Circles:");
console.log(collection.getByType(Circle));

collection.removeById(rectangle.id);

console.log("\nAfter Removing Rectangle:");
console.table(
  collection.shapes.map((shape) => ({
    id: shape.id,
    type: shape.constructor.name,
  })),
);

console.log("\nSorted by Area:");

collection.sortByArea().forEach((shape) => {
  console.log(`${shape.constructor.name}: ${shape.area().toFixed(2)}`);
});

console.log("\ninstanceof Checks");
console.log(circle instanceof Circle);
console.log(circle instanceof Shape);
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Shape);

console.log("\nObject.getPrototypeOf()");
console.log(Object.getPrototypeOf(circle) === Circle.prototype);
console.log(Object.getPrototypeOf(rectangle) === Rectangle.prototype);
console.log(Object.getPrototypeOf(triangle) === Triangle.prototype);

console.log("\nconstructor.name");
console.log(circle.constructor.name);
console.log(rectangle.constructor.name);
console.log(triangle.constructor.name);
