import math

class Circle:
    def __init__(self, radius = 1.0):
        if radius <= 0:
            print("Radius must be positive")
        self.radius = radius

    def primeter(self):
        return 2 * math.pi *self.radius

    def area(self):
        return math.pi * (self.radius ** 2)

    def geometrical_definition(self):
        print(
            "A circle is a shape consisting of all points in a plane that are at a given distance "
        )
        print("(the radius) from a given point (the center).")
        print(f"This circle has a radius of {self.radius} units.")


circle = Circle(5)

print("Primeter: ",circle.primeter())
print("Area: ", circle.area())
circle.geometrical_definition()
