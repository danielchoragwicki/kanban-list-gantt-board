export const loadBoards = () => {
  if (localStorage.getItem('boards')) {
    const boards = localStorage.getItem('boards')
    return JSON.parse(boards)
  } else {
    const boards = []
    localStorage.setItem('boards', JSON.stringify(boards))
    return boards
  }
}

export const saveBoards = boards => {
    localStorage.setItem('boards', JSON.stringify(boards))
}

export const deleteBoards = () => {
  localStorage.clear()
}