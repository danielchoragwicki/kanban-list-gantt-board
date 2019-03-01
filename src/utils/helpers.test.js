import { generateId, findById, addItem, updateList, removeItem, truncate, reorder, move } from './helpers';

//generateId

test('generateIdFunctionIsString_ReturnTrue', () => {
    const id = generateId();
    const result = typeof id === 'string';

    expect(result).toBeTruthy();
})

test('generateIdFunctionIsNotString_ReturnFalse', () => {
    const id = generateId();
    const result = typeof id !== 'string';

    expect(result).toBeFalsy();
})

//findById

test('findByIdFunction_ReturnExpectedItemFromArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const expected = {id:2, name: 'two', lists: []}
    const result = findById(2, startBoards)

    expect(result).toEqual(expected)
})

//addItem

test('addItemAddThePasseItemToTheList_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []}
    ]
    const newItem = {id:3, name: 'three', lists: []}
    const expected = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const result = addItem(startBoards, newItem)

    expect(result).toEqual(expected)
})
   
test('addItemNotMutateTheExistingItemsList_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []}
    ]
    const newItem = {id:3, name: 'three', lists: []}
    const result = addItem(startBoards, newItem)
  
    expect(result).not.toBe(startBoards)
})

//updateList

test('updateTodoFunctionUpdateItemById_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const updatedBoards = {id:2, name: 'two', lists: ['test_list']}
    const expectedBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: ['test_list']},
        {id:3, name: 'three', lists: []}
    ]
    const result = updateList(startBoards, updatedBoards)

    expect(result).toEqual(expectedBoards)
})
  
test('updateTodoNotMutateTheOriginalArray_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const updatedBoards = {id:2, name: 'two', lists: ['test_list']}
    const result = updateList(startBoards, updatedBoards)

    expect(result).not.toBe(startBoards)
})
  

//removeItem

test('removeItemFunctionRemoveItemById_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const targetId = 2;
    const expected = [
        {id:1, name: 'one', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const result = removeItem(startBoards, targetId)

    expect(result).toEqual(expected)
})
  
test('removeItemNotMutateTheExistingItemsList_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const targetId = 2;
    const result = removeItem(startBoards, targetId)

    expect(result).not.toBe(startBoards)
})

//truncate

//reorder

//move