const replaceCharacters = (arr: string[]) =>
  arr.map((el, idx) => (
    <li key={idx}>
      {idx !== arr.length - 1
        ? el.replace(el[0], el[0].toUpperCase()) + ','
        : el.replace(el[0], el[0].toUpperCase())}
    </li>
  ));

export default replaceCharacters;
