import math

class Circle:
    def __init__(self, radius = None, diameter= None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("Please provide either radius or diameter.")

        self.diameter = self.radius * 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle with radius: {self.radius}, diameter: {self.diameter}, area: {self.area:.2f}"

    def __repr__(self):
        return f"Circle(radius={self.radius}"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        raise TypeError("Can only add Circle to Circle")

    def __gt__(self, other):
        if isinstance(other, Circle):
            return self.radius > other.radius
        raise TypeError("Can only compare Circle with Circle")

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        raise TypeError("Can only compare Circle with Circle")

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        raise TypeError("Can only compare Circle with Circle")

if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=12)
    c3 = Circle(radius=3)

    print(c1)
    print(c2)
    print(c3)

    print(f"\nArea of c1: {c1.area:.2f}")

    c4 = c1 + c3
    print(f"\nAfter c1 + c3: {c4}")

    print(f"\nIs c1 > c2? {c1 > c2}") 
    print(f"Is c2 == Circle(radius=6)? {c2 == Circle(radius=6)}")

    circles = [c1, c2, c3, c4]
    print(f"\nUnsorted circles: {circles}")

    circles.sort()
    print("Sorted circles (smallest to largest):")
    for c in circles:
        print(c)
