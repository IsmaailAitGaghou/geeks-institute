const object1 = {
    FullName: "Ismail",
    Mass: 60,
    Height: 1.74,
    BodyMassIndex: function() {
        return this.Mass / (this.Height * 2);
    }
}

const object2 = {
    FullName: "John",
    Mass: 88,
    Height: 1.91,
    BodyMassIndex: function () {
        return this.Mass / (this.Height * 2);
    },
};

function compareBMI(obj1, obj2) {
    const bmi1 = obj1.BodyMassIndex();
    const bmi2 = obj2.BodyMassIndex();

    if (bmi1 > bmi2) {
        return `${obj1.FullName} has a higher BMI.`;
    } else if (bmi1 < bmi2) {
        return `${obj2.FullName} has a higher BMI.`;
    } else {
        return `${obj1.FullName} and ${obj2.FullName} have the same BMI.`;
    }
}

console.log(compareBMI(object1, object2));