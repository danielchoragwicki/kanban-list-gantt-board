const baseUrl = "http://localhost:8080/boards"
 
export const loadBoards = () => {
    return fetch(baseUrl) 
        .then(res => res.json())
}

export const createBoard = item => {
    return fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then(res => res.json()) 
  }

  export const saveBoard = item => {
    return fetch(`${baseUrl}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then(res => res.json()) 
  }

  export const destroyBoard = id => {
    return fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }