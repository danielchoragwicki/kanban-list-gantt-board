import { generateId, findById, addItem, updateList, removeItem, truncate, reorder, move } from './helpers';

// test('addItem should add the passed item to the list', () => {
//     const startItems = [
//       {id:1, name: 'one', isComplete: false},
//       {id:2, name: 'two', isComplete: false}
//     ]
//     const newItem = {id:3, name: 'three', isComplete: false}
//     const expected = [
//       {id:1, name: 'one', isComplete: false},
//       {id:2, name: 'two', isComplete: false},
//       {id:3, name: 'three', isComplete: false}
//     ]
  
//     const result = addItem(startTodos, newTodo)
  
//     expect(result).toEqual(expected)
//   })