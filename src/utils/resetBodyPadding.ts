export const resetBodyPadding = () => {
  setTimeout(() => {
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = '0px';
  }, 250);
};
