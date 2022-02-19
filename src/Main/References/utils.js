const capitalizeEachWord = (component) => {
  if(component === null) return component;
  let returnComponent = component;

  returnComponent = returnComponent
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // returnComponent = returnComponent
  //   .split(" ")
  //   .map((word) => word[0].toUpperCase() + word.slice(1))
  //   .join(" ");

  return returnComponent;
};

// powerCoreIds => Power Cores
const readableIds = (currentId) => {
  return (
    currentId[0].toUpperCase() +
    currentId
      .slice(1)
      .replace("Id", "")
      .split(/(?=[A-Z])/)
      .join(" ")
  );
};

const sizeLetterToStringConverter = (letter) => {
  let sizeConverter = {
    T: "Tiny",
    S: "Small",
    M: "Medium",
    L: "Large",
    H: "Huge",
    G: "Gargantuan",
    C: "Colossal",
    Sc: "Supercolossal",
  };

  return sizeConverter[letter];
};

const treeTransform = (tree, transform) => {
  // recursively enter the lowest nested object to replace strings
  if(typeof tree !== 'object'){
    
    return transform(tree)
  } else{
    const allKeys = Object.keys(tree)

    for(let k of allKeys){
      if(tree[k] === null) return k
      tree[k] = treeTransform(tree[k], transform)
    }

    return tree
  }
}

export { capitalizeEachWord, readableIds, sizeLetterToStringConverter, treeTransform };
