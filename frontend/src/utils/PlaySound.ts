export const playSound = (path: string) => {
  const audio = new Audio(path);

  audio.play();
};
