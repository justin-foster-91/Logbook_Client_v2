const findComponentByFrameId = (frames, frameId, returnComponent) => {
  let newFrame = frames.find(frame => frame.type.toLowerCase() === frameId.toLowerCase())
  
  return newFrame[returnComponent]
}

const capitalizeEachWord = (shipFrame) => {
  return shipFrame.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
}

export { findComponentByFrameId, capitalizeEachWord }