export const buttonLoadingAnimation = (buttonRef) => {
  buttonRef.current.classList.add('clicked');
  setTimeout(() => {
    buttonRef.current.classList.remove('clicked');
    buttonRef.current.classList.add('validate');
    console.log('Added validate')
  }, 250);

};

export const removeLoadingAnimation = (buttonRef) => {
  setTimeout(() => {
    buttonRef.current.classList.remove('validate');
    console.log('removed')
  }, 1650);
};