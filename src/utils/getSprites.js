export const getOrderImagesSprites = (sprites) => {
    const imageArray = [];
    for (const key in sprites) {
      if (sprites[key] !== null && key !== "other" && key !== "versions") {
        const id = key.split('_')[0];
        const image = sprites[key];
        imageArray.push({ id, image, name: key});
      }
    }
    return imageArray;
}

export const getOrderImagesSpritesOthers = (spritesOthers) => {
    const otherImageArray = [];    
    for (const other in spritesOthers) {
        for (const key in spritesOthers[other]) {
          if (spritesOthers[other][key] !== null) {
            const id = key.split('_')[0];
            const image = spritesOthers[other][key];
            otherImageArray.push({ id, image });
          }
        }
      }
    return otherImageArray;
}

export const handlePrevious = (setCountInitial, setCountFinish, countFinish, countInitial) => {
    setCountInitial(countInitial - 1);
    setCountFinish(countFinish - 1 )
  }

export const handleNext = (setCountInitial, setCountFinish, countFinish, countInitial) => {
    setCountInitial(countInitial + 1);
    setCountFinish(countFinish + 1 )
}