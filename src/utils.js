const findComponentByFrameId = (frames, frameId, returnComponent) => {
  let newFrame = frames.find(frame => frame.type.toLowerCase() === frameId.toLowerCase())
  
  return newFrame[returnComponent]
}

const capitalizeEachWord = (component) => {
  return component.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
}

// powerCoreIds => Power Cores
const readableIds = (currentId) => {
  return currentId[0].toUpperCase() + currentId.slice(1).replace('Id', '').split(/(?=[A-Z])/).join(" ") 
}

export { findComponentByFrameId, capitalizeEachWord, readableIds }