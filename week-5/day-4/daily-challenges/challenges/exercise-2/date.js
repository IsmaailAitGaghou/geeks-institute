function calculateMinutesLived(birthdate) {
  const birthDate = new Date(birthdate);

  const now = new Date();

  const differenceMs = now - birthDate;

  const minutes = Math.floor(differenceMs / (1000 * 60));

  return minutes;
}

const hardcodedBirthdate = "2000-01-01";

module.exports = {
  calculateMinutesLived,
  hardcodedBirthdate,
};
