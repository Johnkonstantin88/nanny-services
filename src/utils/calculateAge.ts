const calculateAge = (date: string): number => {
  const now = new Date(),
    birthDate = new Date(date),
    diff = now.getTime() - birthDate.getTime(),
    age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

  return age;
};

export default calculateAge;
