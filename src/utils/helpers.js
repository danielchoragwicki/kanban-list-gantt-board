export const generateId = () => Math.random().toString(36).substr(2, 16)

export const findById = (id, list) => list.find(item => item.id === id)

export const addItem = (list, item) => [...list, item]

export const updateList = (list, updated) => {
  const updatedItem = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedItem),
    updated,
    ...list.slice(updatedItem+1)
  ]
}

export const removeItem = (list, id) => {
  const removedIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removedIndex),
    ...list.slice(removedIndex+1)
  ]
}

export const truncate = (elem, limit, after) => {
  if (!elem || !limit) return
  let content = elem.trim()
  if (content.length > limit) {
    content = content.split('').slice(0, limit)
    content = content.join('') + (after ? after : '')
  }
  return content
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
};